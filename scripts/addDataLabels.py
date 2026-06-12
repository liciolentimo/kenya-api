#!/usr/bin/env python3
"""
Adds data-label="<HeaderName>" to every <td> in docs.html tables,
using each table's own <th> elements as label source.
"""
import re, sys

path = '/Users/liciolentimo/kenya-api/public/docs.html'

with open(path, encoding='utf-8') as f:
    html = f.read()

table_re = re.compile(r'(<table[^>]*>)(.*?)(</table>)', re.DOTALL)
td_re    = re.compile(r'<td([^>]*)>(.*?)</td>',          re.DOTALL)
th_re    = re.compile(r'<th[^>]*>(.*?)</th>',            re.DOTALL)
tr_re    = re.compile(r'(<tr[^>]*>)(.*?)(</tr>)',        re.DOTALL)
tbody_re = re.compile(r'(<tbody>)(.*?)(</tbody>)',        re.DOTALL)

def strip_tags(s):
    return re.sub(r'<[^>]+>', '', s).strip()

def label_row(row_html, labels):
    tds = list(td_re.finditer(row_html))
    out = row_html
    offset = 0
    for i, m in enumerate(tds):
        if i >= len(labels):
            break
        label = labels[i]
        attrs = m.group(1)
        if 'data-label' in attrs:
            continue
        new_attrs = f' data-label="{label}"' + (attrs if attrs.strip() else '')
        old = m.group(0)
        new = f'<td{new_attrs}>{m.group(2)}</td>'
        start = out.find(old, offset)
        if start == -1:
            continue
        out = out[:start] + new + out[start + len(old):]
        offset = start + len(new)
    return out

def process_table(m):
    open_tag, body, close_tag = m.group(1), m.group(2), m.group(3)
    # extract th labels from thead
    ths = th_re.findall(body)
    labels = [strip_tags(h) for h in ths]
    if not labels:
        return m.group(0)

    def process_tbody(tm):
        tb_open, tb_body, tb_close = tm.group(1), tm.group(2), tm.group(3)
        new_body = tr_re.sub(
            lambda rm: rm.group(1) + label_row(rm.group(2), labels) + rm.group(3),
            tb_body
        )
        return tb_open + new_body + tb_close

    new_inner = tbody_re.sub(process_tbody, body)
    return open_tag + new_inner + close_tag

result = table_re.sub(process_table, html)

with open(path, 'w', encoding='utf-8') as f:
    f.write(result)

with_label    = len(re.findall(r'<td data-label=', result))
without_label = len(re.findall(r'<td(?! data-label)[> ]', result))
print(f'TDs with data-label : {with_label}')
print(f'TDs without label   : {without_label}')
print('Done.')
