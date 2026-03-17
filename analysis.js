/**
 * Virginia AI Futures - Personalized Analysis
 * Calls Anthropic API directly for business-specific scenario analysis
 */

(function() {
  'use strict';

  // Set your API key before loading this script:
  // <script>window.ANTHROPIC_API_KEY = 'your-key-here';</script>
  var API_KEY = window.ANTHROPIC_API_KEY || '';

  var REGIONS = [
    'Northern Virginia',
    'Richmond Metro',
    'Hampton Roads',
    'Charlottesville / Central Virginia',
    'Shenandoah Valley',
    'Roanoke / New River Valley',
    'Southside',
    'Southwest Virginia'
  ];

  var INDUSTRIES = [
    'Accounting / CPA',
    'Agriculture',
    'Auto Dealership',
    'Construction / Trades',
    'Dental Practice',
    'Financial Services / Insurance',
    'Food Service / Restaurant',
    'Healthcare / Home Health',
    'Hospitality / Hotels',
    'HVAC / Mechanical',
    'Legal Services',
    'Manufacturing',
    'Marketing / Creative',
    'Property Management',
    'Real Estate',
    'Retail',
    'Staffing / Recruiting',
    'Technology / IT Services',
    'Veterinary',
    'Winery / Brewery',
    'Other'
  ];

  var PROMPT_TEMPLATE = [
    'You are generating a personalized scenario analysis for a Virginia small or mid-size business, as part of "The Fluency Question," a BuildFirst research project on AI futures for Virginia SMBs.',
    '',
    'CONTEXT: This analysis uses Shell scenario planning methodology. Two critical uncertainties were crossed to produce four plausible futures:',
    '- Fluency depth (shallow to deep): how far beyond surface-level AI adoption will businesses progress?',
    '- Geographic reach (concentrated to distributed): will the knowledge networks that enable fluency extend beyond metro areas?',
    '',
    'THE FOUR SCENARIOS:',
    '',
    '1. "Build It Yourself" (Deep & Distributed): Broad AI fluency spreads through peer networks. Business owners build bespoke tools encoding proprietary knowledge. Peer networks become solution-sharing networks. The long tail of business-specific innovation materializes.',
    '',
    '2. "Software Does It For You" (Shallow & Distributed): Platform-delivered AI (Toast, QuickBooks, ServiceTitan, Dentrix) creates broad but shallow adoption. The "inoculation effect": a mediocre first AI encounter satisfies curiosity without revealing capability. The floor rises but becomes a ceiling. SaaS lock-in deepens.',
    '',
    '3. "Pockets of Excellence" (Deep & Concentrated): Deep fluency forms in metro clusters (Richmond, NoVA, Charlottesville) while rural Virginia remains at platform level. The messenger problem: outsider-led AI programs fail because trust is local. Invisible differential growth compounds silently. MOST PROBABLE scenario.',
    '',
    '4. "The Widening Gap" (Shallow & Concentrated): A trust-eroding event (vivid local AI failure) or recession during the critical 2027-2028 window freezes adoption. Fluent firms benefit from recession (low marginal AI cost); non-fluent firms cut the investments that would close the gap. Structural divide hardens.',
    '',
    'FRAMEWORKS:',
    '',
    'Modes of AI engagement (not sequential, not hierarchical):',
    '- Asking: Using AI for information, questions, drafting',
    '- Automating: Connecting AI to workflows for routine tasks',
    '- Augmenting: AI enhances professional judgment with analysis and recommendations',
    '- Agency: AI operates autonomously within defined boundaries with human oversight',
    '',
    'The Four Ds (Anthropic AI Fluency Framework, measuring how well someone engages):',
    '- Delegation: Knowing what to hand off vs. keep',
    '- Description: Communicating needs with clarity (not "prompting" but clarity of thought)',
    '- Discernment: Evaluating AI output quality',
    '- Diligence: Verifying, governing, building the trust layer',
    '',
    'VIRGINIA REGIONAL CONTEXT (Weldon Cooper Center taxonomy):',
    '- Northern Virginia: High density, federal/tech workforce, already at Automating/Augmenting. Strong peer networks.',
    '- Richmond Metro: Growing density, VCU nearby, active chamber AI programming. Transition from Asking to Augmenting underway.',
    '- Hampton Roads: Mixed. Military/defense concentration. Pockets forming in Norfolk-VA Beach corridor but uneven.',
    '- Charlottesville / Central Virginia: UVA influence, small but engaged business community. High potential, limited scale.',
    '- Shenandoah Valley: Agricultural base plus light manufacturing. Peer networks thinner. 12-18 months behind metro.',
    '- Roanoke / New River Valley: Virginia Tech influence. Some pockets but limited broader diffusion.',
    '- Southside: Lowest density. Messenger problem most acute. Trust is hyperlocal.',
    '- Southwest Virginia: Similar to Southside. Coal transition economy. Institutional support thin.',
    '',
    'BUSINESS TO ANALYZE:',
    '{{business_info}}',
    '',
    'Generate a personalized analysis. Be specific to THIS business, THIS industry, THIS region. Reference the scenarios by name. Use the modes of engagement and Four Ds where relevant. Write in a pragmatic, direct tone. No hype, no generic advice.',
    '',
    'Return ONLY valid JSON in this exact structure:',
    '{',
    '  "business_summary": "One sentence. What this business is and its most likely AI relationship.",',
    '  "industry_context": "2-3 sentences. What AI fluency looks like specifically in this industry. Builder window estimate. Which SaaS platforms dominate. Where bespoke solutions create advantage vs. where platforms are sufficient.",',
    '  "region_context": "2-3 sentences. Peer network density, institutional support, knowledge infrastructure for this region. How the region shapes this business\'s fluency trajectory.",',
    '  "current_mode": "Which mode of engagement (Asking/Automating/Augmenting/Agency) this business most likely operates in today, with a one-sentence explanation.",',
    '  "fluency_profile": "One sentence on which of the Four Ds is likely strongest and which needs most development for this business type.",',
    '  "scenarios": [',
    '    {',
    '      "name": "Build It Yourself",',
    '      "relevance": "high|medium|low",',
    '      "implication": "2-3 sentences. What this scenario means specifically for this business. Be concrete: name tools, workflows, competitive dynamics."',
    '    },',
    '    {',
    '      "name": "Software Does It For You",',
    '      "relevance": "high|medium|low",',
    '      "implication": "2-3 sentences."',
    '    },',
    '    {',
    '      "name": "Pockets of Excellence",',
    '      "relevance": "high|medium|low",',
    '      "implication": "2-3 sentences."',
    '    },',
    '    {',
    '      "name": "The Widening Gap",',
    '      "relevance": "high|medium|low",',
    '      "implication": "2-3 sentences."',
    '    }',
    '  ],',
    '  "trajectory": "2-3 sentences. Which scenario trajectory is most relevant for this business and why.",',
    '  "actions": [',
    '    "Specific, actionable first step for this business. Not generic.",',
    '    "Second action. Reference specific tools, frameworks, or peer networks.",',
    '    "Third action. Concrete, tied to their industry and region."',
    '  ]',
    '}'
  ].join('\n');

  function init() {
    var container = document.getElementById('analysis-container');
    if (!container) return;
    renderForm(container);
  }

  function renderForm(container) {
    var regionOpts = REGIONS.map(function(r) {
      return '<option value="' + r + '">' + r + '</option>';
    }).join('');

    var industryOpts = INDUSTRIES.map(function(i) {
      return '<option value="' + i + '">' + i + '</option>';
    }).join('');

    container.innerHTML = [
      '<div class="analysis-live">',
      '  <h4>Your Business, These Scenarios</h4>',
      '  <p>Select your region and industry for a personalized analysis. Which scenarios matter most for your competitive position? Optionally add your website or a brief description for deeper specificity.</p>',
      '  <form class="analysis-form" id="analysis-form">',
      '    <select id="analysis-region" required>',
      '      <option value="">Virginia region</option>',
      '      ' + regionOpts,
      '    </select>',
      '    <select id="analysis-industry" required>',
      '      <option value="">Industry</option>',
      '      ' + industryOpts,
      '    </select>',
      '    <input type="text" id="analysis-desc" placeholder="Business name or brief description (optional)" style="flex:3; min-width:240px;" />',
      '    <input type="url" id="analysis-url" placeholder="Website URL (optional)" />',
      '    <button type="submit" class="cta-button">Analyze My Business</button>',
      '  </form>',
      '  <p style="font-size:13px; color:var(--grey-green); margin-top:8px;">Powered by Claude. Analysis generated in real time. Your information is not stored.</p>',
      '  <div id="analysis-output"></div>',
      '</div>'
    ].join('\n');

    document.getElementById('analysis-form').addEventListener('submit', function(e) {
      e.preventDefault();
      runAnalysis();
    });
  }

  function runAnalysis() {
    var region = document.getElementById('analysis-region').value;
    var industry = document.getElementById('analysis-industry').value;
    var desc = document.getElementById('analysis-desc').value.trim();
    var url = document.getElementById('analysis-url').value.trim();
    var output = document.getElementById('analysis-output');
    var button = document.querySelector('#analysis-form .cta-button');

    if (!region || !industry) {
      output.innerHTML = '<p style="color:var(--red);">Please select a region and industry.</p>';
      return;
    }

    button.disabled = true;
    button.textContent = 'Analyzing...';
    output.innerHTML = [
      '<div class="analysis-loading">',
      '  <span class="spinner"></span>',
      '  Generating personalized scenario analysis...',
      '</div>'
    ].join('');

    var info = 'Region: ' + region + '\nIndustry: ' + industry;
    if (desc) info += '\nBusiness description: ' + desc;
    if (url) info += '\nWebsite: ' + url;

    var prompt = PROMPT_TEMPLATE.replace('{{business_info}}', info);

    callClaude(prompt)
      .then(function(result) {
        renderResult(output, result, region, industry);
      })
      .catch(function(err) {
        output.innerHTML = [
          '<div class="callout-card" style="margin-top:16px;">',
          '  <h4>Analysis Unavailable</h4>',
          '  <p>' + escapeHtml(err.message) + '</p>',
          '  <p>Try again, or read through the scenarios to assess your position manually.</p>',
          '</div>'
        ].join('');
      })
      .finally(function() {
        button.disabled = false;
        button.textContent = 'Analyze My Business';
      });
  }

  function callClaude(prompt) {
    return fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 2500,
        messages: [
          { role: 'user', content: prompt }
        ]
      })
    })
    .then(function(res) {
      if (!res.ok) {
        return res.json().then(function(err) {
          throw new Error(err.error && err.error.message || 'API error ' + res.status);
        });
      }
      return res.json();
    })
    .then(function(data) {
      var text = data.content && data.content[0] && data.content[0].text;
      if (!text) throw new Error('No response from Claude');

      // Extract JSON from response (handles possible markdown wrapping)
      var jsonStr = text;
      var codeBlock = text.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (codeBlock) {
        jsonStr = codeBlock[1];
      } else {
        var braceMatch = text.match(/\{[\s\S]*\}/);
        if (braceMatch) jsonStr = braceMatch[0];
      }

      try {
        return JSON.parse(jsonStr.trim());
      } catch (e) {
        throw new Error('Could not parse analysis response');
      }
    });
  }

  function renderResult(container, data, region, industry) {
    var scenarioCards = (data.scenarios || []).map(function(s) {
      var rel = (s.relevance || 'medium').toLowerCase();
      return [
        '<div class="analysis-scenario-card">',
        '  <div class="relevance-label ' + rel + '">' + rel.toUpperCase() + ' RELEVANCE</div>',
        '  <h6>' + escapeHtml(s.name) + '</h6>',
        '  <p>' + escapeHtml(s.implication || s.implications) + '</p>',
        '</div>'
      ].join('');
    }).join('');

    var actions = (data.actions || []).map(function(a) {
      return '<li>' + escapeHtml(a) + '</li>';
    }).join('');

    container.innerHTML = [
      '<div class="analysis-result">',
      '  <h5>' + escapeHtml(data.business_summary) + '</h5>',
      '',
      '  <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:20px 0;">',
      '    <div>',
      '      <p style="font-size:13px; font-weight:600; letter-spacing:0.5px; text-transform:uppercase; color:var(--grey-green); margin-bottom:4px;">Industry Context</p>',
      '      <p style="font-size:15px; line-height:1.65;">' + escapeHtml(data.industry_context) + '</p>',
      '    </div>',
      '    <div>',
      '      <p style="font-size:13px; font-weight:600; letter-spacing:0.5px; text-transform:uppercase; color:var(--grey-green); margin-bottom:4px;">Regional Context</p>',
      '      <p style="font-size:15px; line-height:1.65;">' + escapeHtml(data.region_context) + '</p>',
      '    </div>',
      '  </div>',
      '',
      '  <div style="display:flex; gap:24px; margin:16px 0; padding:16px 0; border-top:1px solid var(--border); border-bottom:1px solid var(--border);">',
      '    <div style="flex:1;">',
      '      <p style="font-size:12px; font-weight:600; letter-spacing:0.5px; text-transform:uppercase; color:var(--grey-green); margin-bottom:4px;">Current Mode</p>',
      '      <p style="font-size:15px;">' + escapeHtml(data.current_mode) + '</p>',
      '    </div>',
      '    <div style="flex:1;">',
      '      <p style="font-size:12px; font-weight:600; letter-spacing:0.5px; text-transform:uppercase; color:var(--grey-green); margin-bottom:4px;">Fluency Profile</p>',
      '      <p style="font-size:15px;">' + escapeHtml(data.fluency_profile) + '</p>',
      '    </div>',
      '  </div>',
      '',
      '  <h5 style="margin-top:24px;">Scenario Relevance</h5>',
      '  <div class="analysis-scenario-relevance">',
      '    ' + scenarioCards,
      '  </div>',
      '',
      '  <h5 style="margin-top:24px;">Most Likely Trajectory</h5>',
      '  <p>' + escapeHtml(data.trajectory || data.most_likely_trajectory) + '</p>',
      '',
      '  <h5 style="margin-top:24px;">Three Actions for Your Business</h5>',
      '  <div class="callout-card" style="margin-top:12px;">',
      '    <ul>' + actions + '</ul>',
      '  </div>',
      '',
      '  <p style="font-size:13px; color:var(--grey-green); margin-top:24px; text-align:center;">This analysis was generated by Claude based on the Virginia AI Futures scenario framework. It is a starting point for strategic thinking, not a definitive assessment. <a href="https://buildfirst.io" style="color:var(--mid-green);">BuildFirst</a> offers deeper, hands-on fluency assessment.</p>',
      '</div>'
    ].join('\n');
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
