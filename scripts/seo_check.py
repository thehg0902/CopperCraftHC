#!/usr/bin/env python3
"""SEO checks for the static site folder. Usage: python scripts/seo_check.py site

Ported from SEO_BUILD_PROTOCOL.md section 9, with two project-specific
exemptions recorded in the approved plan:

  - noindex pages are exempt from the word-count floor and the near-duplicate
    shingle check. /privacy-policy/ and /terms-of-use/ legitimately share legal
    boilerplate and /thank-you/ is a 20-word confirmation page. Padding them to
    satisfy a check aimed at cloned service/location pages would be gaming it.
  - checks the qa-review script already owns (stylesheet order, broken local
    refs, img alt, header/footer drift) are NOT duplicated here.

Exit code 1 on any FAIL.
"""
import html as _html
import re
import sys
import pathlib

BASE = "https://coppercraft.ca"

SITE = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "site")
fails, warns = [], []
html_files = sorted(SITE.rglob("*.html"))
if not html_files:
    fails.append(f"no HTML files under {SITE}")


def is_noindex(doc):
    m = re.search(r'<meta[^>]+name="robots"[^>]+content="([^"]*)"', doc, re.I)
    return bool(m and "noindex" in m.group(1).lower())


def canonical_for(f):
    """Clean folder URL this file should self-canonical to."""
    rel = f.relative_to(SITE).as_posix()
    if rel == "index.html":
        return f"{BASE}/"
    if rel.endswith("/index.html"):
        return f"{BASE}/{rel[:-len('index.html')]}"
    return None  # 404.html and friends - no canonical form to enforce


def main_text(doc):
    m = re.search(r"<main\b[^>]*>(.*?)</main>", doc, re.S)
    body = m.group(1) if m else doc
    body = re.sub(r"<(script|style)\b.*?</\1>", " ", body, flags=re.S | re.I)
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", body)).strip().lower()


def shingles(text, n=5):
    w = text.split()
    return {tuple(w[i:i + n]) for i in range(len(w) - n + 1)}


docs, titles, descs = {}, {}, {}
for f in html_files:
    text = f.read_text(encoding="utf-8", errors="replace")
    docs[f] = text

    if "[PLACEHOLDER" in text:
        fails.append(f"{f}: unresolved [PLACEHOLDER] - unverified fact would ship")

    n_h1 = len(re.findall(r"<h1\b", text, re.I))
    if n_h1 != 1:
        fails.append(f"{f}: {n_h1} <h1> tags (need exactly 1)")
    if "viewport" not in text:
        fails.append(f"{f}: missing viewport meta")
    if "application/ld+json" not in text:
        fails.append(f"{f}: missing JSON-LD block")
    if not re.search(r'property="og:title"', text, re.I):
        warns.append(f"{f}: missing og:title")
    if not re.search(r'property="og:image"', text, re.I):
        warns.append(f"{f}: missing og:image")

    # canonical: present, absolute, clean folder form, unstamped
    cm = re.search(r'<link[^>]+rel="canonical"[^>]+href="([^"]*)"', text, re.I)
    if not cm:
        fails.append(f"{f}: missing canonical link")
    else:
        href, want = cm.group(1), canonical_for(f)
        if "?v=" in href:
            fails.append(f"{f}: canonical carries a cache-buster - {href}")
        elif "index.html" in href:
            fails.append(f"{f}: canonical is not the clean folder URL - {href}")
        elif want and href != want:
            fails.append(f"{f}: canonical {href} != expected {want}")

    tm = re.search(r"<title\b[^>]*>(.*?)</title>", text, re.S | re.I)
    if not tm or not tm.group(1).strip():
        fails.append(f"{f}: missing <title>")
    else:
        # unescape first: "&amp;" is ONE rendered char; counting the entity
        # adds 4 phantom chars to any name containing "&"
        t = _html.unescape(re.sub(r"\s+", " ", tm.group(1))).strip()
        titles.setdefault(t, []).append(f)
        if len(t) > 60:
            warns.append(f"{f}: <title> {len(t)} chars (>60) - apply the "
                         f"overflow ladder (4.2): {t[:50]}...")

    dm = re.search(r'<meta[^>]+name="description"[^>]+content="([^"]*)"', text, re.I)
    if not dm:
        fails.append(f"{f}: missing meta description")
    else:
        d = _html.unescape(dm.group(1)).strip()
        descs.setdefault(d, []).append(f)
        if len(d) > 155:
            warns.append(f"{f}: meta description {len(d)} chars (>155)")

for t, fs in titles.items():
    if len(fs) > 1:
        fails.append(f"duplicate <title> on {len(fs)} pages: {t[:60]}")
for d, fs in descs.items():
    if len(fs) > 1:
        fails.append(f"duplicate meta description on {len(fs)} pages")

# Near-duplicate main content: 5-word shingle Jaccard. Word shingles, not
# character similarity - local pages legitimately share vocabulary
# ("serving", "licensed") without being clones; only repeated SEQUENCES
# indicate a copy-paste page with the city swapped.
indexable = [f for f in html_files if not is_noindex(docs[f])]
if len(indexable) > 2:
    shingled = [(f, shingles(main_text(docs[f]))) for f in indexable
                if len(main_text(docs[f]).split()) >= 80]
    for i in range(len(shingled)):
        f1, s1 = shingled[i]
        for f2, s2 in shingled[i + 1:]:
            if not s1 or not s2:
                continue
            j = len(s1 & s2) / len(s1 | s2)
            if j > 0.5:
                fails.append(f"{f1} and {f2}: main content {j:.0%} overlapping "
                             f"5-word sequences - cloned, not unique per "
                             f"service/location")

# Word-count floor. Indexable pages only - a noindex confirmation page has no
# ranking job to do.
for f in indexable:
    wc = len(main_text(docs[f]).split())
    if 0 < wc < 300:
        warns.append(f"{f}: thin main content, {wc} words "
                     f"(service/location pages need 500-700)")

for s in (SITE / "sitemap.xml", SITE / "robots.txt"):
    if not s.exists():
        fails.append(f"missing {s.name}")

# Sitemap must list every indexable page and no noindex page.
sm = SITE / "sitemap.xml"
if sm.exists():
    smtext = sm.read_text(encoding="utf-8", errors="replace")
    locs = set(re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", smtext))
    for f in html_files:
        want = canonical_for(f)
        if not want:
            continue
        if is_noindex(docs[f]):
            if want in locs:
                fails.append(f"sitemap lists noindex page {want}")
        elif want not in locs:
            fails.append(f"sitemap missing indexable page {want}")

print("=== SEO CHECK ===")
for w in warns:
    print(f"WARN  {w}")
for x in fails:
    print(f"FAIL  {x}")
print(f"{len(fails)} fail, {len(warns)} warn")
sys.exit(1 if fails else 0)
