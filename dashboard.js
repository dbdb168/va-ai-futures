/**
 * Virginia AI Futures - Leading Indicators Dashboard
 * Renders data visualizations from chart-data.json and text indicators from indicators.json
 */

(function() {
  'use strict';

  function init() {
    var container = document.getElementById('indicators-dashboard');
    if (!container) return;

    Promise.all([
      fetch('chart-data.json').then(function(r) { return r.json(); }),
      fetch('indicators.json').then(function(r) { return r.json(); })
    ])
    .then(function(results) {
      render(container, results[0], results[1]);
    })
    .catch(function(err) {
      container.innerHTML = '<p class="muted">Dashboard data unavailable. ' + escapeHtml(err.message) + '</p>';
    });
  }

  function render(container, chartData, indicatorData) {
    container.innerHTML = '';

    // Scenario strength summary (horizontal bars)
    renderScenarioStrength(container, chartData.scenario_strength);

    // Regional unemployment chart
    renderLineChart(container, chartData.regional_unemployment, 'chart-unemployment');

    // Augmentation vs Automation
    renderLineChart(container, chartData.anthropic_augmentation, 'chart-augmentation');

    // Geographic Gini
    renderGiniChart(container, chartData.anthropic_geographic_gini);

    // Task coverage (horizontal bar)
    renderTaskCoverage(container, chartData.anthropic_task_coverage);

    // Text indicators below charts
    renderTextIndicators(container, indicatorData);
  }

  function renderScenarioStrength(container, data) {
    var section = document.createElement('div');
    section.className = 'dashboard-section fade-in';
    section.style.marginBottom = '48px';

    var html = '<h4 class="dashboard-chart-title">' + escapeHtml(data.title) + '</h4>';
    html += '<p class="dashboard-chart-subtitle">' + escapeHtml(data.subtitle) + '</p>';

    html += '<div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:24px 0;">';
    data.scenarios.forEach(function(s) {
      var pct = Math.round(((s.active * 2 + s.emerging) / (s.total * 2)) * 100);
      html += '<div style="border:1px solid var(--border); border-radius:8px; padding:20px;">';
      html += '<div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:8px;">';
      html += '<span style="font-family:Newsreader,serif; font-size:18px; font-weight:500; color:var(--dark-green);">' + escapeHtml(s.name) + '</span>';
      html += '<span style="font-size:13px; color:var(--grey-green);">' + s.active + ' active, ' + s.emerging + ' emerging</span>';
      html += '</div>';
      html += '<div style="background:var(--border); border-radius:4px; height:8px; overflow:hidden;">';
      html += '<div style="background:' + s.color + '; height:100%; width:' + pct + '%; border-radius:4px; transition:width 0.5s;"></div>';
      html += '</div>';
      html += '</div>';
    });
    html += '</div>';

    html += '<p class="dashboard-reading">' + escapeHtml(data.reading) + '</p>';

    section.innerHTML = html;
    container.appendChild(section);
  }

  function renderLineChart(container, data, canvasId) {
    var section = document.createElement('div');
    section.className = 'dashboard-section fade-in';
    section.style.marginBottom = '48px';

    var html = '<h4 class="dashboard-chart-title">' + escapeHtml(data.title) + '</h4>';
    html += '<p class="dashboard-chart-subtitle">' + escapeHtml(data.subtitle) + '</p>';
    html += '<div style="position:relative; height:320px; margin:16px 0;"><canvas id="' + canvasId + '"></canvas></div>';
    html += '<p class="dashboard-source">Source: ' + escapeHtml(data.source) + '</p>';
    html += '<p class="dashboard-reading">' + escapeHtml(data.scenario_reading) + '</p>';

    section.innerHTML = html;
    container.appendChild(section);

    var ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: data.datasets.map(function(ds) {
          return {
            label: ds.label,
            data: ds.data,
            borderColor: ds.color,
            backgroundColor: ds.color + '18',
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: ds.color,
            tension: 0.3,
            fill: false
          };
        })
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: { family: 'Inter', size: 12 },
              color: '#6B7B6B',
              usePointStyle: true,
              padding: 16
            }
          },
          tooltip: {
            backgroundColor: '#1E3322',
            titleFont: { family: 'Inter', size: 12 },
            bodyFont: { family: 'Inter', size: 12 },
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.parsed.y + data.unit;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Inter', size: 11 }, color: '#808A80' }
          },
          y: {
            grid: { color: '#F4F5F5' },
            ticks: {
              font: { family: 'Inter', size: 11 },
              color: '#808A80',
              callback: function(v) { return v + data.unit; }
            }
          }
        }
      }
    });
  }

  function renderGiniChart(container, data) {
    var section = document.createElement('div');
    section.className = 'dashboard-section fade-in';
    section.style.marginBottom = '48px';

    var change = data.datasets[0].data[1] - data.datasets[0].data[0];
    var direction = change < 0 ? 'falling' : 'rising';
    var arrow = change < 0 ? '\u2193' : '\u2191';

    var html = '<h4 class="dashboard-chart-title">' + escapeHtml(data.title) + '</h4>';
    html += '<p class="dashboard-chart-subtitle">' + escapeHtml(data.subtitle) + '</p>';

    html += '<div style="display:flex; align-items:center; gap:32px; margin:24px 0; padding:24px; background:var(--warm-bg); border-radius:12px;">';
    html += '<div style="text-align:center;">';
    html += '<div style="font-family:Newsreader,serif; font-size:48px; font-weight:500; color:var(--mid-green);">' + data.datasets[0].data[0] + '</div>';
    html += '<div style="font-size:13px; color:var(--grey-green);">' + data.labels[0] + '</div>';
    html += '</div>';
    html += '<div style="font-size:32px; color:' + (change < 0 ? 'var(--mid-green)' : 'var(--red)') + ';">' + arrow + '</div>';
    html += '<div style="text-align:center;">';
    html += '<div style="font-family:Newsreader,serif; font-size:48px; font-weight:500; color:var(--mid-green);">' + data.datasets[0].data[1] + '</div>';
    html += '<div style="font-size:13px; color:var(--grey-green);">' + data.labels[1] + '</div>';
    html += '</div>';
    html += '<div style="flex:1; font-size:15px; line-height:1.6; color:var(--muted-green);">';
    html += 'Gini ' + direction + ' by ' + Math.abs(change).toFixed(2) + ' in three months. ';
    html += change < 0 ? 'AI usage is spreading geographically. At this rate, state-level parity in 2-5 years.' : 'AI usage is concentrating further.';
    html += '</div>';
    html += '</div>';

    html += '<p class="dashboard-source">Source: ' + escapeHtml(data.source) + '</p>';
    html += '<p class="dashboard-reading">' + escapeHtml(data.scenario_reading) + '</p>';

    section.innerHTML = html;
    container.appendChild(section);
  }

  function renderTaskCoverage(container, data) {
    var section = document.createElement('div');
    section.className = 'dashboard-section fade-in';
    section.style.marginBottom = '48px';

    var html = '<h4 class="dashboard-chart-title">' + escapeHtml(data.title) + '</h4>';
    html += '<p class="dashboard-chart-subtitle">' + escapeHtml(data.subtitle) + '</p>';
    html += '<div style="position:relative; height:360px; margin:16px 0;"><canvas id="chart-task-coverage"></canvas></div>';
    html += '<p class="dashboard-source">Source: ' + escapeHtml(data.source) + '</p>';
    html += '<p class="dashboard-reading">' + escapeHtml(data.scenario_reading) + '</p>';

    section.innerHTML = html;
    container.appendChild(section);

    var ctx = document.getElementById('chart-task-coverage').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.categories.map(function(c) { return c.label; }),
        datasets: [
          {
            label: 'Observed usage',
            data: data.categories.map(function(c) { return c.observed; }),
            backgroundColor: '#2D6B3F',
            borderRadius: 4
          },
          {
            label: 'Theoretical capability',
            data: data.categories.map(function(c) { return c.theoretical; }),
            backgroundColor: '#C8C0AD',
            borderRadius: 4
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: { family: 'Inter', size: 12 },
              color: '#6B7B6B',
              usePointStyle: true,
              padding: 16
            }
          },
          tooltip: {
            backgroundColor: '#1E3322',
            titleFont: { family: 'Inter', size: 12 },
            bodyFont: { family: 'Inter', size: 12 },
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.parsed.x + '%';
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: '#F4F5F5' },
            ticks: {
              font: { family: 'Inter', size: 11 },
              color: '#808A80',
              callback: function(v) { return v + '%'; }
            },
            max: 100
          },
          y: {
            grid: { display: false },
            ticks: { font: { family: 'Inter', size: 12 }, color: '#1E3322' }
          }
        }
      }
    });
  }

  function renderTextIndicators(container, data) {
    var section = document.createElement('div');
    section.className = 'dashboard-section fade-in';
    section.style.marginTop = '48px';

    var legend = [
      '<div class="indicator-legend">',
      '  <span class="indicator-legend-item"><span class="indicator-status not-yet"></span> Not yet</span>',
      '  <span class="indicator-legend-item"><span class="indicator-status emerging"></span> Emerging</span>',
      '  <span class="indicator-legend-item"><span class="indicator-status active"></span> Active</span>',
      '  <span class="indicator-legend-item"><span class="indicator-status strong"></span> Strong</span>',
      '</div>'
    ].join('\n');

    var scenarios = data.scenarios.map(function(scenario) {
      var rows = scenario.indicators.map(function(ind) {
        var sourceTag = ind.source ? '<span style="display:inline-block; font-size:11px; font-weight:500; letter-spacing:0.5px; text-transform:uppercase; color:var(--tan); margin-right:8px;">' + escapeHtml(ind.source) + '</span>' : '';
        return [
          '<div class="indicator-row">',
          '  <span class="indicator-status ' + ind.status + '"></span>',
          '  <div class="indicator-signal">',
          '    ' + escapeHtml(ind.signal),
          '    <div class="indicator-evidence">' + sourceTag + escapeHtml(ind.evidence) + '</div>',
          '  </div>',
          '</div>'
        ].join('\n');
      }).join('\n');

      return [
        '<div class="indicators-scenario">',
        '  <h4>' + escapeHtml(scenario.name) + ' <span style="font-family:Inter,sans-serif; font-size:13px; font-weight:400; color:var(--grey-green);">' + escapeHtml(scenario.subtitle) + '</span></h4>',
        '  ' + rows,
        '</div>'
      ].join('\n');
    }).join('\n');

    section.innerHTML = '<h3 style="font-family:Newsreader,serif; font-size:28px; font-weight:400; color:var(--dark-green); margin-bottom:24px;">Detailed Indicator Assessment</h3>' + legend + scenarios;
    container.appendChild(section);
  }

  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
