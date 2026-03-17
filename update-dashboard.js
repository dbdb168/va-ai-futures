#!/usr/bin/env node

/**
 * Virginia AI Futures — Automated Dashboard Update Pipeline
 *
 * Pulls data from BLS and processes Anthropic Economic Index data,
 * then uses Claude to assess indicator status changes within strict parameters.
 * Outputs updated chart-data.json and indicators.json.
 *
 * Run quarterly (or on-demand):
 *   node update-dashboard.js
 *
 * Requirements:
 *   - Node.js 18+
 *   - ANTHROPIC_API_KEY environment variable (for Claude assessment step)
 *
 * Data sources:
 *   1. BLS LAUS API (county-level unemployment, no key needed)
 *   2. Anthropic Economic Index (Hugging Face, CC-BY)
 *   3. Claude analysis of new data against indicator framework
 */

const fs = require('fs');
const path = require('path');

// ===== Configuration =====
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';
const BASE_DIR = __dirname;
const CHART_DATA_PATH = path.join(BASE_DIR, 'chart-data.json');
const INDICATORS_PATH = path.join(BASE_DIR, 'indicators.json');

// BLS LAUS series IDs for Virginia counties, grouped by Weldon Cooper region
const REGIONS = {
  'Northern Virginia': [
    'LAUCN510590000000003', // Fairfax
    'LAUCN510130000000003', // Arlington
    'LAUCN511070000000003', // Loudoun
  ],
  'Richmond Metro': [
    'LAUCN510870000000003', // Henrico
    'LAUCN510410000000003', // Chesterfield
  ],
  'Hampton Roads': [
    'LAUCN518100000000003', // Virginia Beach
    'LAUCN517100000000003', // Norfolk
  ],
  'Shenandoah Valley': [
    'LAUCN511650000000003', // Rockingham
    'LAUCN510150000000003', // Augusta
  ],
  'Roanoke / NRV': [
    'LAUCN517700000000003', // Roanoke City
    'LAUCN511210000000003', // Montgomery
  ],
  'Southside': [
    'LAUCN515900000000003', // Danville
    'LAUCN510830000000003', // Halifax
    'LAUCN511430000000003', // Pittsylvania
  ],
  'Southwest': [
    'LAUCN511950000000003', // Wise
    'LAUCN511050000000003', // Lee
  ],
};

const REGION_COLORS = {
  'Northern Virginia': '#2D6B3F',
  'Richmond Metro': '#4A8B5E',
  'Hampton Roads': '#6B7B6B',
  'Shenandoah Valley': '#808A80',
  'Roanoke / NRV': '#C8C0AD',
  'Southside': '#E85D45',
  'Southwest': '#D4A020',
};

// ===== Utility =====
function log(msg) { console.log('[' + new Date().toISOString().slice(0, 19) + '] ' + msg); }

async function fetchJSON(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(url + ' returned ' + res.status);
  return res.json();
}

// ===== Step 1: Pull BLS Data =====
async function pullBLSData() {
  log('Pulling BLS LAUS data...');

  const allSeriesIds = Object.values(REGIONS).flat();
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 2;

  const data = await fetchJSON('https://api.bls.gov/publicAPI/v1/timeseries/data/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      seriesid: allSeriesIds,
      startyear: String(startYear),
      endyear: String(currentYear),
    }),
  });

  if (data.status !== 'REQUEST_SUCCEEDED') {
    throw new Error('BLS API error: ' + JSON.stringify(data));
  }

  // Index by series ID
  const seriesMap = {};
  data.Results.series.forEach(function(s) {
    seriesMap[s.seriesID] = {};
    (s.data || []).forEach(function(pt) {
      if (pt.value !== '-') {
        const key = pt.year + '-' + pt.period.slice(1).padStart(2, '0');
        seriesMap[s.seriesID][key] = parseFloat(pt.value);
      }
    });
  });

  // Aggregate to regions
  const regionData = {};
  Object.entries(REGIONS).forEach(function([region, seriesIds]) {
    regionData[region] = {};
    // Collect all months across all counties in this region
    const allMonths = new Set();
    seriesIds.forEach(function(sid) {
      Object.keys(seriesMap[sid] || {}).forEach(function(m) { allMonths.add(m); });
    });

    Array.from(allMonths).sort().forEach(function(month) {
      const vals = seriesIds
        .map(function(sid) { return (seriesMap[sid] || {})[month]; })
        .filter(function(v) { return v !== undefined; });
      if (vals.length > 0) {
        regionData[region][month] = Math.round((vals.reduce(function(a, b) { return a + b; }, 0) / vals.length) * 10) / 10;
      }
    });
  });

  log('BLS data pulled. ' + Object.keys(regionData).length + ' regions, ' + Object.keys(Object.values(regionData)[0] || {}).length + ' months each.');
  return regionData;
}

// ===== Step 2: Build Chart Data =====
function buildChartData(regionData, existingChartData) {
  log('Building chart data...');

  // Select quarterly labels from the data (every 3rd month)
  const allMonths = Object.keys(Object.values(regionData)[0] || {}).sort();
  // Pick Jan, Mar, Jun, Sep, Dec of each year for readability
  const keyMonths = allMonths.filter(function(m) {
    const mo = parseInt(m.split('-')[1]);
    return [1, 3, 6, 9, 12].includes(mo);
  });
  // Take last 9 data points for chart
  const chartMonths = keyMonths.slice(-9);
  const labels = chartMonths.map(function(m) {
    const parts = m.split('-');
    const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[parseInt(parts[1])] + ' ' + parts[0].slice(2);
  });

  const datasets = Object.entries(REGION_COLORS).map(function([region, color]) {
    return {
      label: region,
      data: chartMonths.map(function(m) { return (regionData[region] || {})[m] || null; }),
      color: color,
    };
  });

  // Preserve Anthropic data (can't auto-pull yet — update manually from Hugging Face)
  const updated = Object.assign({}, existingChartData, {
    last_updated: new Date().toISOString().slice(0, 10),
    regional_unemployment: Object.assign({}, existingChartData.regional_unemployment, {
      labels: labels,
      datasets: datasets,
    }),
  });

  log('Chart data built with ' + labels.length + ' time points.');
  return updated;
}

// ===== Step 3: Claude Assessment =====
async function assessIndicators(regionData, existingIndicators) {
  log('Running Claude indicator assessment...');

  if (!ANTHROPIC_API_KEY) {
    log('WARNING: No ANTHROPIC_API_KEY set. Skipping Claude assessment. Indicators unchanged.');
    return existingIndicators;
  }

  // Compute summary stats for Claude
  const allMonths = Object.keys(Object.values(regionData)[0] || {}).sort();
  const latestMonth = allMonths[allMonths.length - 1] || 'unknown';
  const threeMonthsAgo = allMonths[allMonths.length - 4] || allMonths[0];

  const summaryLines = Object.entries(regionData).map(function([region, data]) {
    const latest = data[latestMonth];
    const prior = data[threeMonthsAgo];
    const change = latest && prior ? (latest - prior).toFixed(1) : 'N/A';
    return region + ': ' + (latest || 'N/A') + '% (change from ' + threeMonthsAgo + ': ' + (change > 0 ? '+' : '') + change + 'pp)';
  });

  const prompt = [
    'You are updating the Virginia AI Futures leading indicators dashboard.',
    '',
    'STRICT RULES:',
    '1. Each indicator can move AT MOST one step per update: not-yet → emerging → active → strong (or reverse).',
    '2. Movement requires AT LEAST two data points trending in the same direction.',
    '3. A single data release cannot swing any indicator more than one step.',
    '4. If the evidence is ambiguous, do not change the status.',
    '5. Be conservative. It is better to leave an indicator unchanged than to move it without strong evidence.',
    '',
    'NEW DATA (BLS LAUS, ' + latestMonth + '):',
    'Regional unemployment rates (county-level, aggregated to Weldon Cooper regions):',
    summaryLines.join('\n'),
    '',
    'CURRENT INDICATOR STATUS:',
    JSON.stringify(existingIndicators.scenarios.map(function(s) {
      return {
        name: s.name,
        indicators: s.indicators.map(function(i) {
          return { signal: i.signal, status: i.status, source: i.source };
        }),
      };
    }), null, 2),
    '',
    'Based ONLY on the new BLS data above and the rules above, output a JSON array of changes.',
    'Each change: {"scenario": "scenario name", "signal": "signal text (exact match)", "new_status": "not-yet|emerging|active|strong", "reason": "one sentence explaining the evidence"}',
    'If no changes are warranted, return an empty array: []',
    'Return ONLY the JSON array, nothing else.',
  ].join('\n');

  const response = await fetchJSON('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  const text = response.content && response.content[0] && response.content[0].text;
  if (!text) {
    log('WARNING: No response from Claude. Indicators unchanged.');
    return existingIndicators;
  }

  let changes;
  try {
    const jsonStr = text.match(/\[[\s\S]*\]/);
    changes = JSON.parse(jsonStr ? jsonStr[0] : text.trim());
  } catch (e) {
    log('WARNING: Could not parse Claude response. Indicators unchanged.');
    log('Response was: ' + text.slice(0, 200));
    return existingIndicators;
  }

  if (!Array.isArray(changes) || changes.length === 0) {
    log('No indicator changes warranted.');
    return existingIndicators;
  }

  // Apply changes
  const validSteps = { 'not-yet': 0, 'emerging': 1, 'active': 2, 'strong': 3 };
  let applied = 0;

  const updated = JSON.parse(JSON.stringify(existingIndicators));
  changes.forEach(function(change) {
    const scenario = updated.scenarios.find(function(s) { return s.name === change.scenario; });
    if (!scenario) { log('  SKIP: scenario "' + change.scenario + '" not found.'); return; }

    const indicator = scenario.indicators.find(function(i) { return i.signal === change.signal; });
    if (!indicator) { log('  SKIP: signal "' + change.signal + '" not found in ' + change.scenario + '.'); return; }

    const currentStep = validSteps[indicator.status];
    const newStep = validSteps[change.new_status];
    if (currentStep === undefined || newStep === undefined) { log('  SKIP: invalid status.'); return; }

    // Enforce one-step rule
    if (Math.abs(newStep - currentStep) > 1) {
      log('  BLOCKED: "' + change.signal.slice(0, 40) + '..." tried to move ' + Math.abs(newStep - currentStep) + ' steps. Max is 1.');
      return;
    }

    if (newStep === currentStep) { return; } // No actual change

    log('  CHANGE: [' + change.scenario + '] "' + change.signal.slice(0, 50) + '..." ' + indicator.status + ' → ' + change.new_status);
    log('    Reason: ' + change.reason);
    indicator.status = change.new_status;
    indicator.evidence = change.reason + ' (Previous: ' + indicator.evidence + ')';
    indicator.last_updated = new Date().toISOString().slice(0, 10);
    applied++;
  });

  updated.last_updated = new Date().toISOString().slice(0, 10);
  log(applied + ' indicator(s) updated.');
  return updated;
}

// ===== Main =====
async function main() {
  log('=== Virginia AI Futures Dashboard Update ===');
  log('');

  // Load existing data
  const existingChartData = JSON.parse(fs.readFileSync(CHART_DATA_PATH, 'utf-8'));
  const existingIndicators = JSON.parse(fs.readFileSync(INDICATORS_PATH, 'utf-8'));

  // Step 1: Pull BLS data
  const regionData = await pullBLSData();

  // Step 2: Update chart data
  const newChartData = buildChartData(regionData, existingChartData);
  fs.writeFileSync(CHART_DATA_PATH, JSON.stringify(newChartData, null, 2));
  log('chart-data.json updated.');

  // Step 3: Run Claude assessment
  const newIndicators = await assessIndicators(regionData, existingIndicators);
  fs.writeFileSync(INDICATORS_PATH, JSON.stringify(newIndicators, null, 2));
  log('indicators.json updated.');

  log('');
  log('=== Update complete ===');
  log('Review changes, then commit and push:');
  log('  git add chart-data.json indicators.json');
  log('  git commit -m "Quarterly dashboard update: ' + new Date().toISOString().slice(0, 10) + '"');
  log('  git push');
}

main().catch(function(err) {
  console.error('FATAL:', err);
  process.exit(1);
});
