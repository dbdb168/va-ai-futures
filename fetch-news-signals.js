#!/usr/bin/env node

/**
 * Virginia AI Futures — News Signals Pipeline
 *
 * Fetches local Virginia news from RSS feeds and Google News,
 * filters for AI/technology/workforce relevance, then uses Claude
 * to assess which scenario each article signals toward.
 *
 * Outputs the top 5 most scenario-relevant articles to news-signals.json.
 *
 * Run twice daily via GitHub Actions, or on-demand:
 *   node fetch-news-signals.js
 *
 * Requirements:
 *   - Node.js 18+
 *   - ANTHROPIC_API_KEY environment variable
 *
 * Data sources:
 *   1. Virginia Business (virginiabusiness.com/feed)
 *   2. Cardinal News (cardinalnews.org/feed) — Southwest & Southside VA
 *   3. Virginia Mercury (virginiamercury.com/feed) — state policy
 *   4. WTOP Virginia (wtop.com/local/virginia/feed)
 *   5. Google News RSS (Virginia + AI/technology search)
 */

const fs = require('fs');
const path = require('path');

// ===== Configuration =====
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';
const BASE_DIR = __dirname;
const SIGNALS_PATH = path.join(BASE_DIR, 'news-signals.json');
const INDICATORS_PATH = path.join(BASE_DIR, 'indicators.json');

// RSS feeds — curated Virginia sources
const RSS_FEEDS = [
  {
    name: 'Virginia Business',
    url: 'https://www.virginiabusiness.com/feed/',
    region: 'Statewide',
  },
  {
    name: 'Cardinal News',
    url: 'https://cardinalnews.org/feed/',
    region: 'Southwest & Southside',
  },
  {
    name: 'Virginia Mercury',
    url: 'https://virginiamercury.com/feed/',
    region: 'Statewide (policy)',
  },
  {
    name: 'WTOP Virginia',
    url: 'https://wtop.com/local/virginia/feed/',
    region: 'Northern Virginia / DMV',
  },
];

// Google News RSS searches — regional Virginia AI queries
const GOOGLE_NEWS_SEARCHES = [
  { query: 'Virginia artificial intelligence', region: 'Statewide' },
  { query: '"Northern Virginia" AI OR technology OR funding', region: 'Northern Virginia' },
  { query: '"Richmond" Virginia AI OR technology OR workforce', region: 'Richmond Metro' },
  { query: '"Hampton Roads" OR Norfolk AI OR technology', region: 'Hampton Roads' },
  { query: '"Roanoke" OR "Southwest Virginia" AI OR technology OR workforce', region: 'Southwest / Roanoke' },
];

// Keywords for filtering article relevance
const RELEVANCE_KEYWORDS = [
  'artificial intelligence', 'ai ', ' ai,', ' ai.', 'machine learning',
  'automation', 'workforce', 'technology', 'data center', 'tech hub',
  'startup', 'funding', 'venture capital', 'talent', 'training',
  'digital', 'innovation', 'stem', 'broadband', 'remote work',
  'economic development', 'job growth', 'manufacturing',
];

// ===== Utility =====
function log(msg) {
  console.log('[' + new Date().toISOString().slice(0, 19) + '] ' + msg);
}

// Simple XML tag extractor (avoids needing an XML parser dependency)
function extractTags(xml, tagName) {
  const results = [];
  const regex = new RegExp('<' + tagName + '[^>]*>([\\s\\S]*?)</' + tagName + '>', 'gi');
  let match;
  while ((match = regex.exec(xml)) !== null) {
    results.push(match[1].trim());
  }
  return results;
}

function stripCDATA(text) {
  return text.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
}

function stripHTML(text) {
  return text.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&nbsp;/g, ' ').trim();
}

function decodeGoogleNewsUrl(url) {
  // Google News wraps URLs in redirects — extract the actual URL if possible
  if (url.includes('news.google.com/rss/articles/')) {
    // These encoded URLs can't be reliably decoded without a library,
    // so we keep the Google News URL as-is — it still redirects to the article
    return url;
  }
  return url;
}

// ===== Step 1: Fetch RSS Feeds =====
async function fetchRSSFeed(feedConfig) {
  log('Fetching ' + feedConfig.name + '...');

  try {
    const res = await fetch(feedConfig.url, {
      headers: { 'User-Agent': 'VA-AI-Futures-Dashboard/1.0 (research)' },
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      log('  WARNING: ' + feedConfig.name + ' returned ' + res.status);
      return [];
    }

    const xml = await res.text();

    // Parse RSS items
    const items = [];
    const itemBlocks = xml.split(/<item[\s>]/i).slice(1); // Skip preamble

    for (const block of itemBlocks.slice(0, 20)) { // Max 20 items per feed
      const title = stripCDATA(stripHTML(extractTags(block, 'title')[0] || ''));
      const link = stripCDATA(extractTags(block, 'link')[0] || '');
      const description = stripCDATA(stripHTML(extractTags(block, 'description')[0] || ''));
      const pubDate = extractTags(block, 'pubDate')[0] || '';

      if (title && link) {
        items.push({
          title: title,
          link: decodeGoogleNewsUrl(link),
          description: description.slice(0, 500),
          pubDate: pubDate,
          source: feedConfig.name,
          region: feedConfig.region,
        });
      }
    }

    log('  Found ' + items.length + ' items from ' + feedConfig.name);
    return items;
  } catch (err) {
    log('  ERROR fetching ' + feedConfig.name + ': ' + err.message);
    return [];
  }
}

async function fetchGoogleNewsRSS(searchConfig) {
  const query = encodeURIComponent(searchConfig.query);
  const url = 'https://news.google.com/rss/search?q=' + query + '&hl=en-US&gl=US&ceid=US:en';

  log('Fetching Google News: "' + searchConfig.query + '"...');

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'VA-AI-Futures-Dashboard/1.0 (research)' },
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      log('  WARNING: Google News returned ' + res.status + ' for "' + searchConfig.query + '"');
      return [];
    }

    const xml = await res.text();
    const items = [];
    const itemBlocks = xml.split(/<item[\s>]/i).slice(1);

    for (const block of itemBlocks.slice(0, 10)) { // Max 10 per Google search
      const title = stripCDATA(stripHTML(extractTags(block, 'title')[0] || ''));
      const link = stripCDATA(extractTags(block, 'link')[0] || '');
      const description = stripCDATA(stripHTML(extractTags(block, 'description')[0] || ''));
      const pubDate = extractTags(block, 'pubDate')[0] || '';
      const source = extractTags(block, 'source')[0] || 'Google News';

      if (title && link) {
        items.push({
          title: title,
          link: decodeGoogleNewsUrl(link),
          description: description.slice(0, 500),
          pubDate: pubDate,
          source: stripHTML(source),
          region: searchConfig.region,
        });
      }
    }

    log('  Found ' + items.length + ' items for "' + searchConfig.query + '"');
    return items;
  } catch (err) {
    log('  ERROR fetching Google News for "' + searchConfig.query + '": ' + err.message);
    return [];
  }
}

// ===== Step 2: Filter for Relevance =====
function filterForRelevance(articles) {
  log('Filtering ' + articles.length + ' articles for relevance...');

  const seen = new Set();
  const relevant = [];

  for (const article of articles) {
    // Deduplicate by title similarity
    const titleKey = article.title.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 60);
    if (seen.has(titleKey)) continue;
    seen.add(titleKey);

    // Check keyword relevance
    const text = (article.title + ' ' + article.description).toLowerCase();
    const matchCount = RELEVANCE_KEYWORDS.filter(function(kw) {
      return text.includes(kw.toLowerCase());
    }).length;

    if (matchCount >= 1) {
      article.relevance_score = matchCount;
      relevant.push(article);
    }
  }

  // Sort by relevance score, then by date (most recent first)
  relevant.sort(function(a, b) {
    if (b.relevance_score !== a.relevance_score) return b.relevance_score - a.relevance_score;
    return new Date(b.pubDate || 0).getTime() - new Date(a.pubDate || 0).getTime();
  });

  log('Found ' + relevant.length + ' relevant articles.');
  return relevant.slice(0, 25); // Send top 25 to Claude for assessment
}

// ===== Step 3: Claude Scenario Assessment =====
async function assessWithClaude(articles, existingIndicators) {
  log('Running Claude scenario assessment on ' + articles.length + ' articles...');

  if (!ANTHROPIC_API_KEY) {
    log('WARNING: No ANTHROPIC_API_KEY set. Skipping Claude assessment.');
    return [];
  }

  if (articles.length === 0) {
    log('No articles to assess.');
    return [];
  }

  const articleSummaries = articles.map(function(a, i) {
    return (i + 1) + '. [' + a.source + ', ' + a.region + '] "' + a.title + '"\n   ' + a.description.slice(0, 300);
  }).join('\n\n');

  const prompt = [
    'You are analyzing Virginia local news for the Virginia AI Futures scenario dashboard.',
    '',
    'THE FOUR SCENARIOS (2x2 matrix):',
    '1. Build It Yourself (Deep & Distributed) — Broad AI fluency spreads through peer networks across all Virginia regions.',
    '2. Software Does It For You (Shallow & Distributed) — Platform-delivered AI creates broad but shallow adoption.',
    '3. Pockets of Excellence (Deep & Concentrated) — Deep AI capability concentrates in metro hubs like NoVA and Richmond.',
    '4. The Widening Gap (Shallow & Concentrated) — Neither depth nor distribution materializes.',
    '',
    'KEY QUESTION: Does each article signal toward distributed or concentrated AI capability? Deep or shallow?',
    '',
    'VIRGINIA REGIONS (for tagging):',
    '- Northern Virginia (NoVA): Fairfax, Arlington, Loudoun — tech hub, DC-adjacent',
    '- Richmond Metro: Henrico, Chesterfield — state capital, growing tech',
    '- Hampton Roads: Virginia Beach, Norfolk — military/maritime, defense tech',
    '- Shenandoah Valley: Rockingham, Augusta — agriculture, manufacturing',
    '- Roanoke / New River Valley: Virginia Tech, healthcare, emerging tech',
    '- Southside: Danville, Halifax — historically underserved, transitioning economy',
    '- Southwest: Wise, Lee — Appalachian, coal transition, broadband challenges',
    '',
    'ARTICLES TO ASSESS:',
    articleSummaries,
    '',
    'For each article, determine:',
    '1. Is it relevant to Virginia\'s AI/technology/workforce future? (yes/no)',
    '2. Which scenario does it most signal toward?',
    '3. Which Virginia region does it most affect?',
    '4. Write a 1-2 sentence "signal reading" explaining what this article means for Virginia\'s AI future — connect it to the scenario framework. Be specific and analytical, not just summarizing.',
    '',
    'Select the TOP 5 most scenario-relevant articles. Output as a JSON array:',
    '[{',
    '  "article_index": 1,',
    '  "scenario": "Pockets of Excellence",',
    '  "region": "Northern Virginia",',
    '  "signal_reading": "A $300M funding round concentrated in NoVA reinforces the talent and capital gravity well, deepening the metro-rural capability divide unless knowledge transfer mechanisms activate."',
    '}]',
    '',
    'RULES:',
    '- Select exactly 5 articles (or fewer if fewer than 5 are genuinely relevant).',
    '- Prioritize geographic diversity — don\'t pick 5 NoVA articles if others exist.',
    '- The signal_reading must connect the article to the scenario framework, not just describe the article.',
    '- Be honest about what signals concentration vs. distribution.',
    '- Return ONLY the JSON array, nothing else.',
  ].join('\n');

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await res.json();
    const text = data.content && data.content[0] && data.content[0].text;

    if (!text) {
      log('WARNING: No response from Claude.');
      return [];
    }

    const jsonStr = text.match(/\[[\s\S]*\]/);
    const assessments = JSON.parse(jsonStr ? jsonStr[0] : text.trim());

    if (!Array.isArray(assessments)) {
      log('WARNING: Claude response was not an array.');
      return [];
    }

    // Merge article data with Claude's assessment
    const signals = assessments.map(function(assessment) {
      const idx = assessment.article_index - 1;
      const article = articles[idx];
      if (!article) return null;

      return {
        title: article.title,
        url: article.link,
        source: article.source,
        published: article.pubDate ? new Date(article.pubDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
        region: assessment.region || article.region,
        scenario: assessment.scenario,
        signal_reading: assessment.signal_reading,
        fetched: new Date().toISOString().slice(0, 10),
      };
    }).filter(Boolean);

    log('Claude selected ' + signals.length + ' signal articles.');
    return signals;
  } catch (err) {
    log('ERROR in Claude assessment: ' + err.message);
    return [];
  }
}

// ===== Main =====
async function main() {
  log('=== Virginia AI Futures — News Signals Update ===');
  log('');

  // Load existing data
  let existingSignals = { signals: [] };
  try {
    existingSignals = JSON.parse(fs.readFileSync(SIGNALS_PATH, 'utf-8'));
  } catch (e) {
    log('No existing news-signals.json found. Starting fresh.');
  }

  let existingIndicators = { scenarios: [] };
  try {
    existingIndicators = JSON.parse(fs.readFileSync(INDICATORS_PATH, 'utf-8'));
  } catch (e) {
    log('No existing indicators.json found.');
  }

  // Step 1: Fetch all RSS feeds
  const allArticles = [];

  // Fetch Virginia-specific feeds
  for (const feed of RSS_FEEDS) {
    const items = await fetchRSSFeed(feed);
    allArticles.push(...items);
  }

  // Fetch Google News searches
  for (const search of GOOGLE_NEWS_SEARCHES) {
    const items = await fetchGoogleNewsRSS(search);
    allArticles.push(...items);
  }

  log('');
  log('Total articles fetched: ' + allArticles.length);

  // Step 2: Filter for relevance
  const relevant = filterForRelevance(allArticles);

  // Step 3: Claude assessment
  const newSignals = await assessWithClaude(relevant, existingIndicators);

  // Build output — keep new signals, preserving most recent 5
  const output = {
    last_updated: new Date().toISOString().slice(0, 10),
    next_check: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString().slice(0, 10),
    methodology: existingSignals.methodology || 'Articles sourced from Virginia-specific RSS feeds and Google News RSS, filtered for AI/technology/workforce relevance, then assessed by Claude against the scenario framework.',
    sources: [
      'Virginia Business (virginiabusiness.com)',
      'Cardinal News (cardinalnews.org)',
      'Virginia Mercury (virginiamercury.com)',
      'WTOP Virginia (wtop.com)',
      'Google News RSS (Virginia + AI)',
    ],
    signals: newSignals.length > 0 ? newSignals : existingSignals.signals,
  };

  fs.writeFileSync(SIGNALS_PATH, JSON.stringify(output, null, 2));
  log('news-signals.json updated with ' + output.signals.length + ' signals.');

  // Also copy to public directory for the frontend
  const publicPath = path.join(BASE_DIR, 'va-futures-code', 'public', 'news-signals.json');
  fs.writeFileSync(publicPath, JSON.stringify(output, null, 2));
  log('Copied to ' + publicPath);

  log('');
  log('=== News signals update complete ===');
}

main().catch(function(err) {
  console.error('FATAL:', err);
  process.exit(1);
});
