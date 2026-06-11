/**
 * Updates public/docs.html with:
 * 1. Updated institutions section description
 * 2. Added ?initials= param row to GET /institutions table
 * 3. New GET /institutions/universities endpoint card
 * 4. Universities sidebar link
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'docs.html');
let html = fs.readFileSync(filePath, 'utf8');

// ── 1. Update section description ────────────────────────────────────────────
html = html.replace(
  '<p class="section-copy">Browse curated educational institution data for the first 10 Kenyan counties.</p>',
  '<p class="section-copy">Search and filter Kenya\'s educational institutions by county, type, category, or keyword. Includes all 41 public universities accredited by the Commission for University Education (CUE), TVETs, polytechnics, schools, and training colleges across all 47 counties.</p>'
);

// ── 2. Add ?initials= row to GET /institutions params table ───────────────────
html = html.replace(
  `                  <tr><td>type</td><td>string</td><td>query</td><td>no</td><td>Institution type (University, TVET, Secondary School, Primary School, College)</td></tr>
                  <tr><td>category</td><td>string</td><td>query</td><td>no</td><td>Institution category (Public, Private, Faith-Based, Technical)</td></tr>
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
                <button class="code-tab" data-lang="java" role="tab">Java</button>`,
  `                  <tr><td>type</td><td>string</td><td>query</td><td>no</td><td>Institution type (University, TVET, Secondary School, Primary School, College)</td></tr>
                  <tr><td>category</td><td>string</td><td>query</td><td>no</td><td>Institution category (Public, Private, Faith-Based, Technical)</td></tr>
                  <tr><td>initials</td><td>string</td><td>query</td><td>no</td><td>Filter by university initials e.g. UON, JKUAT, KU</td></tr>
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
                <button class="code-tab" data-lang="java" role="tab">Java</button>`
);

// ── 3. Build universities endpoint card HTML ──────────────────────────────────
const BASE = 'https://kenya-api.netlify.app/api/v1';
const universitiesCard = `
          <div class="endpoint-card">
            <div class="endpoint-head">
              <span class="method-badge">GET</span>
              <p class="endpoint-path">/institutions/universities</p>
            </div>
            <p class="endpoint-desc">Returns all public universities in Kenya, sorted alphabetically. Accredited by the Commission for University Education (CUE). Supports filtering by <code>?category=</code> and <code>?county_id=</code>.</p>
            <div class="params-panel table-wrapper" style="margin-bottom: 18px;">
              <table class="params-table">
                <thead><tr><th>Name</th><th>Type</th><th>In</th><th>Required</th><th>Description</th></tr></thead>
                <tbody>
                  <tr><td>category</td><td>string</td><td>query</td><td>no</td><td>Public or Private</td></tr>
                  <tr><td>county_id</td><td>integer</td><td>query</td><td>no</td><td>Filter by county ID e.g. 47 for Nairobi</td></tr>
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
                <pre class="code-block lang-curl active"><code>curl -X GET "${BASE}/institutions/universities" \\
  -H "Accept: application/json"</code></pre>
                <pre class="code-block lang-js"><code>const response = await fetch("${BASE}/institutions/universities", {
  method: "GET",
  headers: { "Accept": "application/json" }
});
const data = await response.json();
console.log(data);</code></pre>
                <pre class="code-block lang-python"><code>import requests

url = "${BASE}/institutions/universities"
headers = {"Accept": "application/json"}

response = requests.get(url, headers=headers)
print(response.json())</code></pre>
                <pre class="code-block lang-php"><code>&lt;?php
$url = "${BASE}/institutions/universities";
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
  url := "${BASE}/institutions/universities"
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

url = URI("${BASE}/institutions/universities")
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
      .uri(URI.create("${BASE}/institutions/universities"))
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
  <span class="token-string">"count"</span><span class="token-punct">:</span> <span class="token-number">41</span><span class="token-punct">,</span>
  <span class="token-string">"accreditor"</span><span class="token-punct">:</span> <span class="token-string">"Commission for University Education (CUE)"</span><span class="token-punct">,</span>
  <span class="token-string">"data"</span><span class="token-punct">:</span> <span class="token-brace">[</span>
    <span class="token-brace">{</span>
      <span class="token-string">"id"</span><span class="token-punct">:</span> <span class="token-number">35</span><span class="token-punct">,</span>
      <span class="token-string">"name"</span><span class="token-punct">:</span> <span class="token-string">"Alupe University"</span><span class="token-punct">,</span>
      <span class="token-string">"initials"</span><span class="token-punct">:</span> <span class="token-string">"AU"</span><span class="token-punct">,</span>
      <span class="token-string">"type"</span><span class="token-punct">:</span> <span class="token-string">"University"</span><span class="token-punct">,</span>
      <span class="token-string">"category"</span><span class="token-punct">:</span> <span class="token-string">"Public"</span><span class="token-punct">,</span>
      <span class="token-string">"county_id"</span><span class="token-punct">:</span> <span class="token-number">40</span><span class="token-punct">,</span>
      <span class="token-string">"county_name"</span><span class="token-punct">:</span> <span class="token-string">"Busia"</span><span class="token-punct">,</span>
      <span class="token-string">"website"</span><span class="token-punct">:</span> <span class="token-string">"https://www.alupe.ac.ke"</span><span class="token-punct">,</span>
      <span class="token-string">"accredited_by"</span><span class="token-punct">:</span> <span class="token-string">"Commission for University Education (CUE)"</span>
    <span class="token-brace">}</span><span class="token-punct">,</span>
    <span class="token-string">"..."</span>
  <span class="token-brace">]</span>
<span class="token-brace">}</span></pre>
              </div>
            </div>
            <button class="try-button" type="button">Try It</button>
            <div class="try-panel">
              <div class="try-panel-content"><pre class="code-block"><span class="token-comment">// Click "Try It" to fetch live data from the API</span></pre></div>
            </div>
          </div>

`;

// Insert universities card between GET /institutions card and GET /institutions/:id card
html = html.replace(
  `          <div class="endpoint-card">
            <div class="endpoint-head">
              <span class="method-badge">GET</span>
              <p class="endpoint-path">/institutions/:id</p>
            </div>`,
  universitiesCard + `          <div class="endpoint-card">
            <div class="endpoint-head">
              <span class="method-badge">GET</span>
              <p class="endpoint-path">/institutions/:id</p>
            </div>`
);

// ── 4. Add Universities to sidebar under Educational Institutions ──────────────
html = html.replace(
  `            <li class="group-item"><a class="sidebar-link" href="#institutions">Educational Institutions</a></li>`,
  `            <li class="group-item"><a class="sidebar-link" href="#institutions">Educational Institutions</a></li>
            <li class="group-item"><a class="sidebar-link" href="#institutions-universities">Universities</a></li>`
);

// Add anchor id to the universities card for sidebar linking
html = html.replace(
  `              <p class="endpoint-path">/institutions/universities</p>`,
  `              <p class="endpoint-path" id="institutions-universities">/institutions/universities</p>`
);

// ── Write ─────────────────────────────────────────────────────────────────────
fs.writeFileSync(filePath, html, 'utf8');
console.log('docs.html updated with universities endpoint card.');
console.log('Line count:', html.split('\n').length);
