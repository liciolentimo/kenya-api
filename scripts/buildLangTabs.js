/**
 * Transforms docs.html: replaces every single-curl request code panel
 * with a 7-language tabbed panel (cURL / JS / Python / PHP / Go / Ruby / Java).
 * Also injects the required CSS and JS.
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'docs.html');
let html = fs.readFileSync(filePath, 'utf8');

// ── HTML escape helper ────────────────────────────────────────────────────────
function esc(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ── Map: old curl text (as-is in HTML) → canonical URL for new blocks ────────
const urlMap = {
  'curl https://kenya-api.netlify.app/api/v1/counties?region=Coast&sort=population_desc':
    'https://kenya-api.netlify.app/api/v1/counties',
  'curl https://kenya-api.netlify.app/api/v1/counties/47':
    'https://kenya-api.netlify.app/api/v1/counties/47',
  'curl https://kenya-api.netlify.app/api/v1/counties/governors':
    'https://kenya-api.netlify.app/api/v1/counties/governors',
  'curl https://kenya-api.netlify.app/api/v1/counties/1/constituencies':
    'https://kenya-api.netlify.app/api/v1/counties/47/constituencies',
  'curl https://kenya-api.netlify.app/api/v1/constituencies':
    'https://kenya-api.netlify.app/api/v1/constituencies',
  'curl https://kenya-api.netlify.app/api/v1/constituencies/1':
    'https://kenya-api.netlify.app/api/v1/constituencies/1',
  'curl https://kenya-api.netlify.app/api/v1/holidays?year=2025':
    'https://kenya-api.netlify.app/api/v1/holidays?year=2025',
  'curl https://kenya-api.netlify.app/api/v1/holidays/1':
    'https://kenya-api.netlify.app/api/v1/holidays/1',
  'curl https://kenya-api.netlify.app/api/v1/population':
    'https://kenya-api.netlify.app/api/v1/population',
  'curl https://kenya-api.netlify.app/api/v1/population/counties':
    'https://kenya-api.netlify.app/api/v1/population/counties',
  'curl https://kenya-api.netlify.app/api/v1/exchange-rates':
    'https://kenya-api.netlify.app/api/v1/exchange-rates',
  'curl https://kenya-api.netlify.app/api/v1/exchange-rates/USD':
    'https://kenya-api.netlify.app/api/v1/exchange-rates/USD',
  'curl https://kenya-api.netlify.app/api/v1/institutions':
    'https://kenya-api.netlify.app/api/v1/institutions',
  'curl https://kenya-api.netlify.app/api/v1/institutions/1':
    'https://kenya-api.netlify.app/api/v1/institutions/1',
  'curl https://kenya-api.netlify.app/api/v1/institutions/county/1':
    'https://kenya-api.netlify.app/api/v1/institutions/county/47',
  'curl https://kenya-api.netlify.app/api/v1/institutions/type/University':
    'https://kenya-api.netlify.app/api/v1/institutions/type/University',
  'curl https://kenya-api.netlify.app/api/v1/institutions/search?q=Mombasa':
    'https://kenya-api.netlify.app/api/v1/institutions/search?q=nairobi',
  'curl https://kenya-api.netlify.app/api/v1/ministries':
    'https://kenya-api.netlify.app/api/v1/ministries',
  'curl https://kenya-api.netlify.app/api/v1/ministries/1':
    'https://kenya-api.netlify.app/api/v1/ministries/1',
  'curl "https://kenya-api.netlify.app/api/v1/ministries/search?q=health"':
    'https://kenya-api.netlify.app/api/v1/ministries/search?q=health',
};

// ── Build a tabbed code panel for a given URL ─────────────────────────────────
function buildPanel(url) {
  const curl = `curl -X GET "${url}" \\
  -H "Accept: application/json"`;

  const js = `const response = await fetch("${url}", {
  method: "GET",
  headers: {
    "Accept": "application/json"
  }
});

const data = await response.json();
console.log(data);`;

  const python = `import requests

url = "${url}"
headers = {"Accept": "application/json"}

response = requests.get(url, headers=headers)
data = response.json()
print(data)`;

  const php = `<?php
$url = "${url}";
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  "Accept: application/json"
]);

$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);
print_r($data);
?>`;

  const go = `package main

import (
  "fmt"
  "io"
  "net/http"
)

func main() {
  url := "${url}"
  req, _ := http.NewRequest("GET", url, nil)
  req.Header.Set("Accept", "application/json")

  client := &http.Client{}
  resp, _ := client.Do(req)
  defer resp.Body.Close()

  body, _ := io.ReadAll(resp.Body)
  fmt.Println(string(body))
}`;

  const ruby = `require "net/http"
require "json"

url = URI("${url}")
http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Accept"] = "application/json"

response = http.request(request)
data = JSON.parse(response.body)
puts data`;

  const java = `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
  public static void main(String[] args) throws Exception {
    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest.newBuilder()
      .uri(URI.create("${url}"))
      .header("Accept", "application/json")
      .GET()
      .build();

    HttpResponse<String> response = client.send(
      request, HttpResponse.BodyHandlers.ofString()
    );
    System.out.println(response.body());
  }
}`;

  // Indentation matches the deepest nesting level in docs.html endpoint cards
  const i = '            ';
  const ii = i + '  ';
  const iii = ii + '  ';

  return `${i}<div class="code-panel tabbed" style="margin-bottom: 18px;">
${ii}<div class="code-tabs" role="tablist">
${iii}<button class="code-tab active" data-lang="curl" role="tab">cURL</button>
${iii}<button class="code-tab" data-lang="js" role="tab">JavaScript</button>
${iii}<button class="code-tab" data-lang="python" role="tab">Python</button>
${iii}<button class="code-tab" data-lang="php" role="tab">PHP</button>
${iii}<button class="code-tab" data-lang="go" role="tab">Go</button>
${iii}<button class="code-tab" data-lang="ruby" role="tab">Ruby</button>
${iii}<button class="code-tab" data-lang="java" role="tab">Java</button>
${ii}</div>
${ii}<div class="code-block-wrapper">
${iii}<button class="copy-btn" title="Copy to clipboard">Copy</button>
${iii}<pre class="code-block lang-curl active"><code>${esc(curl)}</code></pre>
${iii}<pre class="code-block lang-js"><code>${esc(js)}</code></pre>
${iii}<pre class="code-block lang-python"><code>${esc(python)}</code></pre>
${iii}<pre class="code-block lang-php"><code>${esc(php)}</code></pre>
${iii}<pre class="code-block lang-go"><code>${esc(go)}</code></pre>
${iii}<pre class="code-block lang-ruby"><code>${esc(ruby)}</code></pre>
${iii}<pre class="code-block lang-java"><code>${esc(java)}</code></pre>
${ii}</div>
${i}</div>`;
}

// ── Replace each request code panel ──────────────────────────────────────────
// Pattern: the surrounding div + code-wrapper + pre with a curl command
const PANEL_RE = /<div class="code-panel" style="margin-bottom: 18px;">\s*<div class="code-wrapper">\s*<button class="copy-button" type="button">Copy<\/button>\s*<pre class="code-block">(curl[^<]*)<\/pre>\s*<\/div>\s*<\/div>/gs;

let replacements = 0;
html = html.replace(PANEL_RE, (_match, curlText) => {
  const key = curlText.trim();
  const url = urlMap[key];
  if (!url) {
    console.warn('WARNING: No URL mapping found for:', JSON.stringify(key));
    return _match;
  }
  replacements++;
  return buildPanel(url);
});

console.log(`Replaced ${replacements} code panels (expected 20).`);

// ── Inject CSS (before closing </style>) ─────────────────────────────────────
const newCSS = `
    /* ── Multi-language tabbed code panels ──────────────────────────────── */
    .code-panel.tabbed { padding: 0; background: transparent; border-radius: 8px; }
    .code-tabs { display: flex; background: #161B22; border-bottom: 1px solid #30363D; overflow-x: auto; scrollbar-width: none; }
    .code-tabs::-webkit-scrollbar { display: none; }
    .code-tab { background: none; border: none; border-bottom: 2px solid transparent; color: #8B949E; font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; padding: 10px 16px; cursor: pointer; white-space: nowrap; transition: color 0.15s, border-color 0.15s; flex-shrink: 0; }
    .code-tab:hover { color: #ffffff; }
    .code-tab.active { color: #00A550; border-bottom-color: #00A550; }
    .code-block-wrapper { position: relative; background: #0D1117; border-radius: 0 0 8px 8px; }
    .code-block-wrapper .code-block { display: none; margin: 0; padding: 20px; background: #0D1117; font-family: 'JetBrains Mono', monospace; font-size: 13px; line-height: 1.6; color: #e6edf3; overflow-x: auto; max-height: 320px; overflow-y: auto; tab-size: 2; white-space: pre; word-break: normal; border-radius: 0 0 8px 8px; }
    .code-block-wrapper .code-block.active { display: block; }
    .tok-keyword, .tok-method { color: #FF7B72; }
    .tok-string { color: #A5D6FF; }
    .tok-variable { color: #79C0FF; }
    .tok-comment { color: #8B949E; font-style: italic; }
    .tok-number { color: #FFA657; }
    .tok-function { color: #D2A8FF; }
    .tok-type { color: #FFA657; }
    .copy-btn { position: absolute; top: 10px; right: 10px; background: #161B22; border: 1px solid #30363D; color: #8B949E; font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 4px; cursor: pointer; z-index: 10; transition: color 0.15s, border-color 0.15s; }
    .copy-btn:hover { color: #ffffff; border-color: #8B949E; }
    .copy-btn.copied { color: #00A550; border-color: #00A550; }
    @media (max-width: 768px) { .code-tab { font-size: 10px; padding: 8px 10px; } .code-block-wrapper .code-block { font-size: 12px; } }`;

html = html.replace('  </style>', newCSS + '\n  </style>');

// ── Inject JavaScript (before closing </body>) ────────────────────────────────
const newJS = `
  <script>
  (function initCodePanels() {
    function activateLang(panel, lang) {
      panel.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
      panel.querySelectorAll('.code-block').forEach(b => b.classList.remove('active'));
      const tab = panel.querySelector(\`.code-tab[data-lang="\${lang}"]\`);
      const block = panel.querySelector(\`.code-block.lang-\${lang}\`);
      if (tab) tab.classList.add('active');
      if (block) block.classList.add('active');
    }

    document.querySelectorAll('.code-panel.tabbed').forEach(panel => {
      panel.querySelectorAll('.code-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          const lang = tab.dataset.lang;
          // Sync all panels to this language
          document.querySelectorAll('.code-panel.tabbed').forEach(p => activateLang(p, lang));
          localStorage.setItem('kenyaapi-codelang', lang);
        });
      });
    });

    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const wrapper = btn.closest('.code-block-wrapper');
        const active = wrapper && wrapper.querySelector('.code-block.active');
        if (!active) return;
        const text = (active.innerText || active.textContent).trim();
        const apply = () => {
          btn.textContent = 'Copied ✓';
          btn.classList.add('copied');
          setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
        };
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(apply).catch(() => fallback(text, apply));
        } else {
          fallback(text, apply);
        }
      });
    });

    function fallback(text, cb) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      cb();
    }

    const saved = localStorage.getItem('kenyaapi-codelang');
    if (saved) {
      document.querySelectorAll('.code-panel.tabbed').forEach(p => activateLang(p, saved));
    }
  })();
  </script>`;

html = html.replace('</body>', newJS + '\n</body>');

// ── Write the file ────────────────────────────────────────────────────────────
fs.writeFileSync(filePath, html, 'utf8');
console.log('docs.html updated successfully.');
