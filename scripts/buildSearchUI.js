/**
 * Adds the Global Search section, endpoint card, sidebar nav, CSS, and JS
 * to public/docs.html.
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'docs.html');
let html = fs.readFileSync(filePath, 'utf8');

// ── 1. Add CSS before closing </style> ───────────────────────────────────────
const newCSS = `
    /* ── Global Search playground ───────────────────────────────────────── */
    .search-playground { background: #161B22; border: 1px solid #30363D; border-radius: 12px; padding: 24px; margin: 20px 0 32px; }
    .search-input-row { display: flex; gap: 10px; margin-bottom: 16px; }
    .search-input { flex: 1; background: #0D1117; border: 1px solid #30363D; border-radius: 8px; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 14px; padding: 10px 16px; outline: none; transition: border-color 0.2s; }
    .search-input:focus { border-color: #00A550; }
    .search-input::placeholder { color: #8B949E; }
    .search-btn { background: #00A550; border: none; border-radius: 8px; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; padding: 10px 24px; cursor: pointer; white-space: nowrap; transition: background 0.2s; }
    .search-btn:hover { background: #00C060; }
    .search-btn:disabled { background: #30363D; cursor: not-allowed; }
    .search-filters { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 20px; }
    .filter-label { font-size: 12px; color: #8B949E; margin-right: 4px; }
    .filter-pill { background: #0D1117; border: 1px solid #30363D; border-radius: 20px; color: #8B949E; font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600; padding: 4px 12px; cursor: pointer; transition: all 0.15s; text-transform: capitalize; }
    .filter-pill:hover { border-color: #8B949E; color: #ffffff; }
    .filter-pill.active { background: #0D2A1A; border-color: #00A550; color: #00A550; }
    .search-results-area { min-height: 120px; }
    .search-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 32px; color: #8B949E; gap: 8px; text-align: center; }
    .search-placeholder span { font-size: 32px; opacity: 0.4; }
    .search-placeholder p { margin: 0; font-size: 14px; }
    .result-group { margin-bottom: 20px; }
    .result-group-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid #30363D; }
    .result-group-name { font-size: 12px; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 0.06em; }
    .result-group-count { font-size: 11px; color: #00A550; font-family: 'JetBrains Mono', monospace; background: #0D2A1A; padding: 2px 8px; border-radius: 10px; }
    .result-item { background: #0D1117; border: 1px solid #30363D; border-radius: 6px; padding: 10px 14px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
    .result-item-name { font-size: 13px; font-weight: 600; color: #ffffff; }
    .result-item-meta { font-size: 11px; color: #8B949E; margin-top: 2px; }
    .result-item-badge { font-size: 10px; color: #8B949E; border: 1px solid #30363D; padding: 2px 6px; border-radius: 4px; white-space: nowrap; font-family: 'JetBrains Mono', monospace; flex-shrink: 0; }
    .search-total { font-size: 13px; color: #8B949E; margin-bottom: 16px; padding: 10px 14px; background: #0D1117; border-radius: 6px; border-left: 3px solid #00A550; }
    .search-total strong { color: #00A550; }
    .no-results { text-align: center; padding: 32px; color: #8B949E; font-size: 14px; }
    .search-loading { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 32px; color: #8B949E; font-size: 14px; }
    .search-spinner { width: 18px; height: 18px; border: 2px solid #30363D; border-top-color: #00A550; border-radius: 50%; animation: spin 0.7s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }`;

html = html.replace('  </style>', newCSS + '\n  </style>');

// ── 2. Add SEARCH sidebar group before GETTING STARTED ────────────────────────
const searchSidebarGroup = `        <div class="group nav-animate" style="animation-delay: 0ms;">
          <button class="group-header" type="button">
            <span>SEARCH</span>
            <span>▾</span>
          </button>
          <ul class="group-list">
            <li class="group-item"><a class="sidebar-link" href="#global-search">Global Search</a></li>
          </ul>
        </div>

        `;

html = html.replace(
  `        <div class="group nav-animate" style="animation-delay: 0ms;">
          <button class="group-header" type="button">
            <span>GETTING STARTED</span>`,
  searchSidebarGroup + `        <div class="group nav-animate" style="animation-delay: 0ms;">
          <button class="group-header" type="button">
            <span>GETTING STARTED</span>`
);

// ── 3. Add Global Search as first ENDPOINTS sidebar item ─────────────────────
html = html.replace(
  `            <li class="group-item"><a class="sidebar-link" href="#counties">Counties</a></li>`,
  `            <li class="group-item"><a class="sidebar-link" href="#search">Global Search</a></li>
            <li class="group-item"><a class="sidebar-link" href="#counties">Counties</a></li>`
);

// ── 4. Add global-search playground section before #introduction ──────────────
const globalSearchSection = `      <section id="global-search" class="panel">
        <h2 class="section-title">Global Search</h2>
        <p class="section-copy">Search across all KenyaAPI resources in a single request. Returns grouped results from counties, constituencies, holidays, institutions, ministries, and exchange rates.</p>

        <div class="search-playground">
          <div class="search-input-row">
            <input type="text" id="global-search-input" class="search-input" placeholder="Search anything — e.g. nairobi, health, USD..." maxlength="100" autocomplete="off" />
            <button id="global-search-btn" class="search-btn">Search</button>
          </div>
          <div class="search-filters">
            <span class="filter-label">Filter by type:</span>
            <button class="filter-pill active" data-type="all">All</button>
            <button class="filter-pill" data-type="counties">Counties</button>
            <button class="filter-pill" data-type="constituencies">Constituencies</button>
            <button class="filter-pill" data-type="holidays">Holidays</button>
            <button class="filter-pill" data-type="institutions">Institutions</button>
            <button class="filter-pill" data-type="ministries">Ministries</button>
            <button class="filter-pill" data-type="exchange_rates">Exchange Rates</button>
          </div>
          <div id="search-results-area" class="search-results-area">
            <div class="search-placeholder">
              <span>⌕</span>
              <p>Type at least 2 characters to search</p>
            </div>
          </div>
        </div>
      </section>

      `;

html = html.replace(
  `      <section id="introduction" class="panel">`,
  globalSearchSection + `      <section id="introduction" class="panel">`
);

// ── 5. Add #search endpoint card section before #counties ────────────────────
const searchSection = `      <section id="search" class="panel">
        <h2 class="section-title">Search</h2>
        <p class="section-copy">Global search endpoint. Query across all six resources simultaneously or narrow by type.</p>
        <div class="endpoint-grid">
          <div class="endpoint-card">
            <div class="endpoint-head">
              <span class="method-badge">GET</span>
              <p class="endpoint-path">/search</p>
            </div>
            <p class="endpoint-desc">Search across all KenyaAPI resources in a single request — counties, constituencies, holidays, institutions, ministries, and exchange rates. Use <code>?type=</code> to narrow to a single resource.</p>
            <div class="params-panel table-wrapper" style="margin-bottom: 18px;">
              <table class="params-table">
                <thead><tr><th>Name</th><th>Type</th><th>In</th><th>Required</th><th>Description</th></tr></thead>
                <tbody>
                  <tr><td>q</td><td>string</td><td>query</td><td>yes</td><td>Search term (min 2 chars)</td></tr>
                  <tr><td>type</td><td>string</td><td>query</td><td>no</td><td>Narrow to one resource: counties, constituencies, holidays, institutions, ministries, exchange_rates</td></tr>
                </tbody>
              </table>
            </div>
            <div class="code-panel tabbed" style="margin-bottom: 18px;">
              <div class="code-tabs" role="tablist">
                <button class="code-tab active" data-lang="curl" role="tab">cURL</button>
                <button class="code-tab" data-lang="js" role="tab">JavaScript</button>
                <button class="code-tab" data-lang="python" role="tab">Python</button>
                <button class="code-tab" data-lang="php" role="tab">PHP</button>
                <button class="code-tab" data-lang="go" role="tab">Go</button>
                <button class="code-tab" data-lang="ruby" role="tab">Ruby</button>
                <button class="code-tab" data-lang="java" role="tab">Java</button>
              </div>
              <div class="code-block-wrapper">
                <button class="copy-btn" title="Copy to clipboard">Copy</button>
                <pre class="code-block lang-curl active"><code>curl -X GET "https://kenya-api.netlify.app/api/v1/search?q=nairobi" \\
  -H "Accept: application/json"</code></pre>
                <pre class="code-block lang-js"><code>const response = await fetch("https://kenya-api.netlify.app/api/v1/search?q=nairobi", {
  method: "GET",
  headers: { "Accept": "application/json" }
});
const data = await response.json();
console.log(data);</code></pre>
                <pre class="code-block lang-python"><code>import requests

url = "https://kenya-api.netlify.app/api/v1/search?q=nairobi"
headers = {"Accept": "application/json"}

response = requests.get(url, headers=headers)
print(response.json())</code></pre>
                <pre class="code-block lang-php"><code>&lt;?php
$url = "https://kenya-api.netlify.app/api/v1/search?q=nairobi";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Accept: application/json"]);
$response = curl_exec($ch);
curl_close($ch);
print_r(json_decode($response, true));
?&gt;</code></pre>
                <pre class="code-block lang-go"><code>package main

import (
  "fmt"
  "io"
  "net/http"
)

func main() {
  url := "https://kenya-api.netlify.app/api/v1/search?q=nairobi"
  req, _ := http.NewRequest("GET", url, nil)
  req.Header.Set("Accept", "application/json")
  client := &amp;http.Client{}
  resp, _ := client.Do(req)
  defer resp.Body.Close()
  body, _ := io.ReadAll(resp.Body)
  fmt.Println(string(body))
}</code></pre>
                <pre class="code-block lang-ruby"><code>require "net/http"
require "json"

url = URI("https://kenya-api.netlify.app/api/v1/search?q=nairobi")
http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
request = Net::HTTP::Get.new(url)
request["Accept"] = "application/json"
response = http.request(request)
puts JSON.parse(response.body)</code></pre>
                <pre class="code-block lang-java"><code>import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
  public static void main(String[] args) throws Exception {
    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest.newBuilder()
      .uri(URI.create("https://kenya-api.netlify.app/api/v1/search?q=nairobi"))
      .header("Accept", "application/json")
      .GET()
      .build();
    HttpResponse&lt;String&gt; response = client.send(
      request, HttpResponse.BodyHandlers.ofString()
    );
    System.out.println(response.body());
  }
}</code></pre>
              </div>
            </div>
            <p class="response-label">Example response</p>
            <div class="code-panel">
              <div class="code-wrapper">
                <button class="copy-button" type="button">Copy</button>
                <pre class="code-block"><span class="token-brace">{</span>
  <span class="token-string">"success"</span><span class="token-punct">:</span> <span class="token-boolean">true</span><span class="token-punct">,</span>
  <span class="token-string">"query"</span><span class="token-punct">:</span> <span class="token-string">"nairobi"</span><span class="token-punct">,</span>
  <span class="token-string">"type"</span><span class="token-punct">:</span> <span class="token-string">"all"</span><span class="token-punct">,</span>
  <span class="token-string">"total_results"</span><span class="token-punct">:</span> <span class="token-number">24</span><span class="token-punct">,</span>
  <span class="token-string">"results"</span><span class="token-punct">:</span> <span class="token-brace">{</span>
    <span class="token-string">"counties"</span><span class="token-punct">:</span> <span class="token-brace">{</span>
      <span class="token-string">"count"</span><span class="token-punct">:</span> <span class="token-number">1</span><span class="token-punct">,</span>
      <span class="token-string">"endpoint"</span><span class="token-punct">:</span> <span class="token-string">"/api/v1/counties"</span><span class="token-punct">,</span>
      <span class="token-string">"data"</span><span class="token-punct">:</span> <span class="token-brace">[</span> <span class="token-brace">{</span> <span class="token-string">"id"</span><span class="token-punct">:</span> <span class="token-number">47</span><span class="token-punct">,</span> <span class="token-string">"name"</span><span class="token-punct">:</span> <span class="token-string">"Nairobi"</span> <span class="token-brace">}</span> <span class="token-brace">]</span>
    <span class="token-brace">}</span><span class="token-punct">,</span>
    <span class="token-string">"constituencies"</span><span class="token-punct">:</span> <span class="token-brace">{</span>
      <span class="token-string">"count"</span><span class="token-punct">:</span> <span class="token-number">17</span><span class="token-punct">,</span>
      <span class="token-string">"endpoint"</span><span class="token-punct">:</span> <span class="token-string">"/api/v1/constituencies"</span><span class="token-punct">,</span>
      <span class="token-string">"data"</span><span class="token-punct">:</span> <span class="token-brace">[</span> <span class="token-string">"..."</span> <span class="token-brace">]</span>
    <span class="token-brace">}</span>
  <span class="token-brace">}</span>
<span class="token-brace">}</span></pre>
              </div>
            </div>
            <button class="try-button" type="button">Try It</button>
            <div class="try-panel">
              <div class="try-panel-content"><pre class="code-block"><span class="token-brace">{</span>
  <span class="token-string">"success"</span><span class="token-punct">:</span> <span class="token-boolean">true</span><span class="token-punct">,</span>
  <span class="token-string">"query"</span><span class="token-punct">:</span> <span class="token-string">"nairobi"</span><span class="token-punct">,</span>
  <span class="token-string">"type"</span><span class="token-punct">:</span> <span class="token-string">"all"</span><span class="token-punct">,</span>
  <span class="token-string">"total_results"</span><span class="token-punct">:</span> <span class="token-number">24</span><span class="token-punct">,</span>
  <span class="token-string">"results"</span><span class="token-punct">:</span> <span class="token-brace">{ ... }</span>
<span class="token-brace">}</span></pre></div>
            </div>
          </div>
        </div>
      </section>

      `;

html = html.replace(
  `      <section id="counties" class="panel">`,
  searchSection + `      <section id="counties" class="panel">`
);

// ── 6. Add global search JS before </body> ───────────────────────────────────
const searchJS = `
  <script>
  (function initGlobalSearch() {
    const input  = document.getElementById('global-search-input');
    const btn    = document.getElementById('global-search-btn');
    const area   = document.getElementById('search-results-area');
    const pills  = document.querySelectorAll('.filter-pill');
    if (!input) return;

    let activeType = 'all';
    let debounceTimer;

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeType = pill.dataset.type;
        if (input.value.trim().length >= 2) runSearch();
      });
    });

    input.addEventListener('keyup', e => {
      if (e.key === 'Enter') { clearTimeout(debounceTimer); runSearch(); return; }
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (input.value.trim().length >= 2) runSearch(); else showPlaceholder();
      }, 400);
    });

    btn.addEventListener('click', runSearch);

    async function runSearch() {
      const q = input.value.trim();
      if (q.length < 2) { showPlaceholder(); return; }
      showLoading();
      btn.disabled = true;
      const typeParam = activeType !== 'all' ? '&type=' + activeType : '';
      const url = API_BASE + '/search?q=' + encodeURIComponent(q) + typeParam;
      try {
        const res  = await fetch(url);
        const data = await res.json();
        renderResults(data, q);
      } catch (err) {
        area.innerHTML = '<div class="no-results">⚠️ Could not reach the API.</div>';
      } finally {
        btn.disabled = false;
      }
    }

    function renderResults(data, q) {
      if (!data.success) { area.innerHTML = '<div class="no-results">' + escH(data.error) + '</div>'; return; }
      if (data.total_results === 0) { area.innerHTML = '<div class="no-results">No results found for "<strong>' + escH(q) + '</strong>"</div>'; return; }

      let h = '<div class="search-total"><strong>' + data.total_results + '</strong> result' + (data.total_results !== 1 ? 's' : '') + ' for "<strong>' + escH(q) + '</strong>"</div>';

      Object.entries(data.results).forEach(([key, group]) => {
        if (group.count === 0) return;
        const label = key.replace(/_/g, ' ');
        h += '<div class="result-group"><div class="result-group-header"><span class="result-group-name">' + label + '</span><span class="result-group-count">' + group.count + ' result' + (group.count !== 1 ? 's' : '') + '</span></div>';
        group.data.slice(0, 5).forEach(item => {
          const d = getDisplay(key, item);
          h += '<div class="result-item"><div><div class="result-item-name">' + escH(d.name) + '</div><div class="result-item-meta">' + escH(d.meta) + '</div></div><span class="result-item-badge">ID ' + (item.id || '—') + '</span></div>';
        });
        if (group.count > 5) h += '<div style="font-size:12px;color:#8B949E;text-align:right;margin-top:6px">+' + (group.count - 5) + ' more — <a href="' + group.endpoint + '" target="_blank" style="color:#00A550">view all ↗</a></div>';
        h += '</div>';
      });

      area.innerHTML = h;
    }

    function getDisplay(type, item) {
      switch (type) {
        case 'counties':        return { name: item.name, meta: (item.region || '') + ' · ' + (item.headquarters || '') + ' · Gov: ' + (item.governor || '—') };
        case 'constituencies':  return { name: item.name, meta: (item.county_name || '') + ' County' };
        case 'holidays':        return { name: item.name, meta: (item.date || '') + ' · ' + (item.type || '') };
        case 'institutions':    return { name: item.name, meta: (item.type || '') + ' · ' + (item.county_name || '') };
        case 'ministries':      return { name: item.ministry, meta: 'CS: ' + (item.cabinet_secretary || '') };
        case 'exchange_rates':  return { name: (item.currency || '') + ' — ' + (item.currency_name || ''), meta: 'Buy: ' + (item.buy || '') + ' · Sell: ' + (item.sell || '') + ' KES' };
        default:                return { name: JSON.stringify(item), meta: '' };
      }
    }

    function showPlaceholder() {
      area.innerHTML = '<div class="search-placeholder"><span>⌕</span><p>Type at least 2 characters to search</p></div>';
    }

    function showLoading() {
      area.innerHTML = '<div class="search-loading"><div class="search-spinner"></div>Searching...</div>';
    }

    function escH(str) {
      return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }
  })();
  </script>`;

html = html.replace('</body>', searchJS + '\n</body>');

// ── Write ─────────────────────────────────────────────────────────────────────
fs.writeFileSync(filePath, html, 'utf8');
console.log('docs.html updated with global search UI.');
console.log('Line count:', html.split('\n').length);
