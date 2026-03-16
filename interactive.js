/**
 * Virginia AI Futures - Interactive Elements
 * Handles inline term popovers, expandable sections, hamburger nav
 */

(function() {
  'use strict';

  // === Inline Term Popovers ===
  function initPopovers() {
    document.querySelectorAll('.inline-term').forEach(function(term) {
      term.addEventListener('click', function(e) {
        e.stopPropagation();
        var popover = this.querySelector('.inline-term-popover');
        if (!popover) return;

        // Close all other popovers
        document.querySelectorAll('.inline-term-popover.visible').forEach(function(p) {
          if (p !== popover) p.classList.remove('visible');
        });

        popover.classList.toggle('visible');
      });
    });

    // Close popovers on outside click
    document.addEventListener('click', function() {
      document.querySelectorAll('.inline-term-popover.visible').forEach(function(p) {
        p.classList.remove('visible');
      });
    });
  }

  // === Inline Expandable Sections ===
  function initExpandables() {
    document.querySelectorAll('.inline-expandable').forEach(function(trigger) {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        var targetId = this.getAttribute('data-expand');
        var content = document.getElementById(targetId);
        if (!content) return;

        this.classList.toggle('expanded');
        content.classList.toggle('visible');
      });
    });
  }

  // === Hamburger Navigation (Scenario Pages) ===
  function initHamburger() {
    var btn = document.querySelector('.hamburger-btn');
    var nav = document.querySelector('.scenario-slide-nav');
    var overlay = document.querySelector('.scenario-slide-nav-overlay');

    if (!btn || !nav) return;

    function toggle() {
      btn.classList.toggle('active');
      nav.classList.toggle('open');
      if (overlay) overlay.classList.toggle('visible');
    }

    btn.addEventListener('click', toggle);
    if (overlay) overlay.addEventListener('click', toggle);

    // Close on escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        toggle();
      }
    });
  }

  // === Initialize ===
  function init() {
    initPopovers();
    initExpandables();
    initHamburger();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
