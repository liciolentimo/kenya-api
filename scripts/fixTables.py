#!/usr/bin/env python3
"""
1. Replace card/stacked mobile table CSS with simple horizontal-scroll CSS.
2. Strip all data-label attributes from <td> elements.
"""
import re

PATH = '/Users/liciolentimo/kenya-api/public/docs.html'

OLD_CSS = '''    /* ── Tables (desktop/tablet) ──────────────────────────── */
    .table-wrapper { overflow-x: auto; -webkit-overflow-scrolling: touch; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; table-layout: fixed; }
    thead tr { background: #161B22; }
    th { text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--border); color: #8B949E; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; white-space: nowrap; }
    td { text-align: left; padding: 11px 12px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #e6edf3; font-size: 13px; line-height: 1.5; word-wrap: break-word; overflow-wrap: break-word; white-space: normal; vertical-align: top; }
    /* Column widths for 5-column params tables */
    .params-table th:nth-child(1), .params-table td:nth-child(1) { width: 20%; font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #79C0FF; }
    .params-table th:nth-child(2), .params-table td:nth-child(2) { width: 13%; }
    .params-table th:nth-child(3), .params-table td:nth-child(3) { width: 12%; }
    .params-table th:nth-child(4), .params-table td:nth-child(4) { width: 13%; }
    .params-table th:nth-child(5), .params-table td:nth-child(5) { width: auto; }

    .endpoint-grid'''

NEW_CSS = '''    /* ── Tables ──────────────────────────────── */
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th, td { padding: 10px 12px; text-align: left; border-bottom: 1px solid #30363D; vertical-align: top; white-space: nowrap; }
    th { background: #161B22; color: #8B949E; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
    td { color: #e6edf3; }
    td:first-child { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #79C0FF; }
    .table-wrapper { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; border: 1px solid #30363D; border-radius: 8px; margin: 16px 0; }
    .table-wrapper table { margin: 0; border: none; border-radius: 0; min-width: 500px; }

    .endpoint-grid'''

MOBILE_OLD = '''    /* ── Mobile table card layout ─────────────────────────── */
    @media (max-width: 768px) {
      .table-wrapper { overflow-x: unset; }
      table, thead, tbody, th, td, tr { display: block; }
      thead { display: none; }
      tr { background: #0D1117; border: 1px solid var(--border); border-radius: 8px; margin-bottom: 8px; padding: 4px 0; }
      td {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 7px 12px;
        border-bottom: 1px solid rgba(48,54,61,0.5);
        font-size: 12px;
        width: 100%;
        box-sizing: border-box;
        white-space: normal;
        word-break: break-word;
      }
      td:last-child { border-bottom: none; }
      td::before {
        content: attr(data-label);
        font-size: 10px;
        font-weight: 700;
        color: #8B949E;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        min-width: 68px;
        flex-shrink: 0;
        padding-top: 2px;
      }
      /* reset params-table column widths — not applicable in block layout */
      .params-table th:nth-child(n), .params-table td:nth-child(n) { width: 100%; font-size: 12px; }
      .params-table td:nth-child(1) { color: #79C0FF; }
    }
    .try-button'''

MOBILE_NEW = '''    .try-button'''

with open(PATH, encoding='utf-8') as f:
    html = f.read()

# Step 1: Replace desktop table CSS block
if OLD_CSS in html:
    html = html.replace(OLD_CSS, NEW_CSS, 1)
    print('CSS desktop block replaced.')
else:
    print('ERROR: desktop CSS block not found — check OLD_CSS string.')

# Step 2: Remove mobile card layout block
if MOBILE_OLD in html:
    html = html.replace(MOBILE_OLD, MOBILE_NEW, 1)
    print('Mobile card layout CSS removed.')
else:
    print('ERROR: mobile CSS block not found — check MOBILE_OLD string.')

# Step 3: Strip data-label attributes from all <td> tags
before_count = len(re.findall(r'<td data-label=', html))
html = re.sub(r'<td data-label="[^"]*"', '<td', html)
after_count = len(re.findall(r'<td data-label=', html))
print(f'data-label stripped: {before_count} → {after_count} remaining.')

with open(PATH, 'w', encoding='utf-8') as f:
    f.write(html)

print('Done.')
