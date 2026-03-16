/**
 * Virginia AI Futures - Leading Indicators Dashboard
 * Renders scenario indicators from indicators.json
 */

(function() {
  'use strict';

  function init() {
    var container = document.getElementById('indicators-dashboard');
    if (!container) return;

    fetch('indicators.json')
      .then(function(res) { return res.json(); })
      .then(function(data) { render(container, data); })
      .catch(function() {
        container.innerHTML = '<p class="muted">Indicators data unavailable.</p>';
      });
  }

  function render(container, data) {
    var legend = [
      '<div class="indicator-legend">',
      '  <span class="indicator-legend-item"><span class="indicator-status not-yet"></span> Not yet</span>',
      '  <span class="indicator-legend-item"><span class="indicator-status emerging"></span> Emerging</span>',
      '  <span class="indicator-legend-item"><span class="indicator-status active"></span> Active</span>',
      '  <span class="indicator-legend-item"><span class="indicator-status strong"></span> Strong</span>',
      '  <span style="margin-left:auto; font-size:12px; color:var(--grey-green);">Updated ' + data.last_updated + '</span>',
      '</div>'
    ].join('\n');

    var scenarios = data.scenarios.map(function(scenario) {
      var rows = scenario.indicators.map(function(ind) {
        return [
          '<div class="indicator-row">',
          '  <span class="indicator-status ' + ind.status + '"></span>',
          '  <div class="indicator-signal">',
          '    ' + escapeHtml(ind.signal),
          '    <div class="indicator-evidence">' + escapeHtml(ind.evidence) + '</div>',
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

    container.innerHTML = legend + scenarios;
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
