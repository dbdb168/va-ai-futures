/**
 * Virginia AI Futures - Leading Indicators Dashboard
 * Renders data visualizations + text indicators
 */

(function() {
  'use strict';

  var chartCounter = 0;

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
      container.innerHTML = '<p class="muted">Dashboard data unavailable. ' + esc(err.message) + '</p>';
    });
  }

  function render(container, chartData, indicatorData) {
    container.innerHTML = '';

    // 1. Scenario strength bars
    appendStrength(container, chartData.scenario_strength);

    // 2. Regional unemployment line chart
    appendLineChart(container, chartData.regional_unemployment);

    // 3. Augmentation vs automation
    appendLineChart(container, chartData.anthropic_augmentation);

    // 4. Geographic Gini
    appendGini(container, chartData.anthropic_geographic_gini);

    // 5. Task coverage horizontal bars
    appendBarChart(container, chartData.anthropic_task_coverage);

    // 6. Text indicators
    appendTextIndicators(container, indicatorData);
  }

  // ---- Scenario strength summary ----
  function appendStrength(container, data) {
    var div = document.createElement('div');
    div.style.marginBottom = '48px';

    var h = '<h4 class="dashboard-chart-title">' + esc(data.title) + '</h4>';
    h += '<p class="dashboard-chart-subtitle">' + esc(data.subtitle) + '</p>';
    h += '<div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:24px 0;">';

    data.scenarios.forEach(function(s) {
      var pct = Math.round(((s.active * 2 + s.emerging) / (s.total * 2)) * 100);
      h += '<div style="border:1px solid #F4F5F5; border-radius:8px; padding:20px;">';
      h += '<div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:8px;">';
      h += '<span style="font-family:Newsreader,serif; font-size:18px; font-weight:500; color:#1E3322;">' + esc(s.name) + '</span>';
      h += '<span style="font-size:13px; color:#808A80;">' + s.active + ' active, ' + s.emerging + ' emerging</span>';
      h += '</div>';
      h += '<div style="background:#F4F5F5; border-radius:4px; height:8px; overflow:hidden;">';
      h += '<div style="background:' + s.color + '; height:100%; width:' + pct + '%; border-radius:4px;"></div>';
      h += '</div></div>';
    });

    h += '</div>';
    h += '<p class="dashboard-reading">' + esc(data.reading) + '</p>';

    div.innerHTML = h;
    container.appendChild(div);
  }

  // ---- Line chart ----
  function appendLineChart(container, data) {
    var id = 'dashboard-canvas-' + (++chartCounter);

    var wrapper = document.createElement('div');
    wrapper.style.marginBottom = '48px';

    var header = document.createElement('div');
    header.innerHTML = '<h4 class="dashboard-chart-title">' + esc(data.title) + '</h4>'
      + '<p class="dashboard-chart-subtitle">' + esc(data.subtitle) + '</p>';
    wrapper.appendChild(header);

    var chartBox = document.createElement('div');
    chartBox.style.position = 'relative';
    chartBox.style.height = '320px';
    chartBox.style.margin = '16px 0';

    var canvas = document.createElement('canvas');
    canvas.id = id;
    chartBox.appendChild(canvas);
    wrapper.appendChild(chartBox);

    var footer = document.createElement('div');
    footer.innerHTML = '<p class="dashboard-source">Source: ' + esc(data.source) + '</p>'
      + '<p class="dashboard-reading">' + esc(data.scenario_reading) + '</p>';
    wrapper.appendChild(footer);

    container.appendChild(wrapper);

    // Now canvas is in the DOM, safe to render
    new Chart(canvas.getContext('2d'), {
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
            labels: { font: { family: 'Inter', size: 12 }, color: '#6B7B6B', usePointStyle: true, padding: 16 }
          },
          tooltip: {
            backgroundColor: '#1E3322',
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function(ctx) { return ctx.dataset.label + ': ' + ctx.parsed.y + (data.unit || ''); }
            }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 11 }, color: '#808A80' } },
          y: {
            grid: { color: '#F4F5F5' },
            ticks: {
              font: { family: 'Inter', size: 11 }, color: '#808A80',
              callback: function(v) { return v + (data.unit || ''); }
            }
          }
        }
      }
    });
  }

  // ---- Gini metric ----
  function appendGini(container, data) {
    var vals = data.datasets[0].data;
    var change = vals[1] - vals[0];
    var falling = change < 0;

    var div = document.createElement('div');
    div.style.marginBottom = '48px';

    div.innerHTML = '<h4 class="dashboard-chart-title">' + esc(data.title) + '</h4>'
      + '<p class="dashboard-chart-subtitle">' + esc(data.subtitle) + '</p>'
      + '<div style="display:flex; align-items:center; gap:32px; margin:24px 0; padding:24px; background:#F5F0EB; border-radius:12px;">'
      + '<div style="text-align:center;">'
      + '<div style="font-family:Newsreader,serif; font-size:48px; font-weight:500; color:#2D6B3F;">' + vals[0] + '</div>'
      + '<div style="font-size:13px; color:#808A80;">' + data.labels[0] + '</div>'
      + '</div>'
      + '<div style="font-size:32px; color:' + (falling ? '#2D6B3F' : '#E85D45') + ';">' + (falling ? '\u2193' : '\u2191') + '</div>'
      + '<div style="text-align:center;">'
      + '<div style="font-family:Newsreader,serif; font-size:48px; font-weight:500; color:#2D6B3F;">' + vals[1] + '</div>'
      + '<div style="font-size:13px; color:#808A80;">' + data.labels[1] + '</div>'
      + '</div>'
      + '<div style="flex:1; font-size:15px; line-height:1.6; color:#6B7B6B;">'
      + 'Gini ' + (falling ? 'falling' : 'rising') + ' by ' + Math.abs(change).toFixed(2) + ' in three months. '
      + (falling ? 'AI usage is spreading geographically. At this rate, state-level parity in 2\u20135 years.' : 'AI usage is concentrating further.')
      + '</div></div>'
      + '<p class="dashboard-source">Source: ' + esc(data.source) + '</p>'
      + '<p class="dashboard-reading">' + esc(data.scenario_reading) + '</p>';

    container.appendChild(div);
  }

  // ---- Horizontal bar chart (task coverage) ----
  function appendBarChart(container, data) {
    var id = 'dashboard-canvas-' + (++chartCounter);

    var wrapper = document.createElement('div');
    wrapper.style.marginBottom = '48px';

    var header = document.createElement('div');
    header.innerHTML = '<h4 class="dashboard-chart-title">' + esc(data.title) + '</h4>'
      + '<p class="dashboard-chart-subtitle">' + esc(data.subtitle) + '</p>';
    wrapper.appendChild(header);

    var chartBox = document.createElement('div');
    chartBox.style.position = 'relative';
    chartBox.style.height = '360px';
    chartBox.style.margin = '16px 0';

    var canvas = document.createElement('canvas');
    canvas.id = id;
    chartBox.appendChild(canvas);
    wrapper.appendChild(chartBox);

    var footer = document.createElement('div');
    footer.innerHTML = '<p class="dashboard-source">Source: ' + esc(data.source) + '</p>'
      + '<p class="dashboard-reading">' + esc(data.scenario_reading) + '</p>';
    wrapper.appendChild(footer);

    container.appendChild(wrapper);

    new Chart(canvas.getContext('2d'), {
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
            labels: { font: { family: 'Inter', size: 12 }, color: '#6B7B6B', usePointStyle: true, padding: 16 }
          },
          tooltip: {
            backgroundColor: '#1E3322',
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function(ctx) { return ctx.dataset.label + ': ' + ctx.parsed.x + '%'; }
            }
          }
        },
        scales: {
          x: {
            grid: { color: '#F4F5F5' },
            ticks: { font: { family: 'Inter', size: 11 }, color: '#808A80', callback: function(v) { return v + '%'; } },
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

  // ---- Text indicators ----
  function appendTextIndicators(container, data) {
    var div = document.createElement('div');
    div.style.marginTop = '48px';

    var h = '<h3 style="font-family:Newsreader,serif; font-size:28px; font-weight:400; color:#1E3322; margin-bottom:24px;">Detailed Indicator Assessment</h3>';

    h += '<div class="indicator-legend">';
    h += '<span class="indicator-legend-item"><span class="indicator-status not-yet"></span> Not yet</span>';
    h += '<span class="indicator-legend-item"><span class="indicator-status emerging"></span> Emerging</span>';
    h += '<span class="indicator-legend-item"><span class="indicator-status active"></span> Active</span>';
    h += '<span class="indicator-legend-item"><span class="indicator-status strong"></span> Strong</span>';
    h += '</div>';

    data.scenarios.forEach(function(scenario) {
      h += '<div class="indicators-scenario">';
      h += '<h4>' + esc(scenario.name) + ' <span style="font-family:Inter,sans-serif; font-size:13px; font-weight:400; color:#808A80;">' + esc(scenario.subtitle) + '</span></h4>';

      scenario.indicators.forEach(function(ind) {
        var src = ind.source ? '<span style="display:inline-block; font-size:11px; font-weight:500; letter-spacing:0.5px; text-transform:uppercase; color:#C8C0AD; margin-right:8px;">' + esc(ind.source) + '</span>' : '';
        h += '<div class="indicator-row">';
        h += '<span class="indicator-status ' + ind.status + '"></span>';
        h += '<div class="indicator-signal">' + esc(ind.signal);
        h += '<div class="indicator-evidence">' + src + esc(ind.evidence) + '</div>';
        h += '</div></div>';
      });

      h += '</div>';
    });

    div.innerHTML = h;
    container.appendChild(div);
  }

  function esc(str) {
    if (!str) return '';
    var d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
