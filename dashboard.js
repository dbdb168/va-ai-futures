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
      '  <span style="margin-left:auto; font-size:12px; color:var(--grey-green);">Last updated ' + data.last_updated + '</span>',
      '</div>'
    ].join('\n');

    // Count active/strong signals per scenario for a summary
    var scenarios = data.scenarios.map(function(scenario) {
      var activeCount = scenario.indicators.filter(function(i) {
        return i.status === 'active' || i.status === 'strong';
      }).length;
      var emergingCount = scenario.indicators.filter(function(i) {
        return i.status === 'emerging';
      }).length;

      var strengthLabel = '';
      if (activeCount >= 3) strengthLabel = 'Strong signals';
      else if (activeCount >= 1) strengthLabel = activeCount + ' active, ' + emergingCount + ' emerging';
      else if (emergingCount >= 2) strengthLabel = emergingCount + ' emerging signals';
      else strengthLabel = 'Few signals';

      var rows = scenario.indicators.map(function(ind) {
        var sourceTag = ind.source ? '<span style="display:inline-block; font-size:11px; font-weight:500; letter-spacing:0.5px; text-transform:uppercase; color:var(--tan); margin-right:8px;">' + escapeHtml(ind.source) + '</span>' : '';

        return [
          '<div class="indicator-row">',
          '  <span class="indicator-status ' + ind.status + '" title="' + ind.status + '"></span>',
          '  <div class="indicator-signal">',
          '    ' + escapeHtml(ind.signal),
          '    <div class="indicator-evidence">' + sourceTag + escapeHtml(ind.evidence) + '</div>',
          '  </div>',
          '</div>'
        ].join('\n');
      }).join('\n');

      return [
        '<div class="indicators-scenario">',
        '  <h4>' + escapeHtml(scenario.name),
        '    <span style="font-family:Inter,sans-serif; font-size:13px; font-weight:400; color:var(--grey-green);">' + escapeHtml(scenario.subtitle) + '</span>',
        '    <span style="float:right; font-family:Inter,sans-serif; font-size:12px; font-weight:500; color:var(--muted-green);">' + strengthLabel + '</span>',
        '  </h4>',
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
