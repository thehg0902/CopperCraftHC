#!/usr/bin/env python3
"""Cache-bust local CSS/JS links in site/**/*.html with a content hash.

WHY THIS EXISTS
Static hosts serve stylesheets and scripts with a long `cache-control`
max-age (Hostinger sends 7 days). HTML is usually revalidated, assets are
not — so after a redeploy a returning visitor gets the NEW markup paired
with their CACHED stylesheet. That combination renders as a broken layout,
and it is invisible to anyone testing in a fresh browser.

Appending `?v=<hash of the file's bytes>` gives each version of an asset its
own URL: change the file and the URL changes, so the browser must refetch.
Leave it unchanged and the URL is stable, so the long cache still applies
and costs nothing.

Idempotent: an existing ?v= is replaced, so re-running never stacks params.
Run before /stage and /deploy (or any time site/ CSS/JS changes).
"""
import hashlib
import pathlib
import re
import sys

SITE = pathlib.Path(__file__).resolve().parent.parent / "site"
# Images and video are stamped too, not just CSS/JS: swapping a logo or a
# poster changes the FILE but not the URL, so a returning visitor keeps the
# cached copy for the full max-age. Scrub frames are excluded on purpose —
# they are requested from JS via data-scrub-base + a pattern, never from a
# markup attribute, so there is nothing here to rewrite.
ASSET_RE = re.compile(
    r'(?P<attr>href|src|poster)="'
    r'(?P<url>[^"]+\.(?:css|js|png|webp|jpe?g|svg|mp4))(?:\?[^"]*)?"')
SKIP = ("http://", "https://", "//", "data:")


def short_hash(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()[:8]


def main():
    if not SITE.is_dir():
        print(f"no {SITE}", file=sys.stderr)
        return 1

    cache, changed, stamped = {}, 0, 0
    for page in sorted(SITE.rglob("*.html")):
        html = page.read_text(encoding="utf-8")

        def sub(m):
            nonlocal stamped
            url = m.group("url")
            if url.startswith(SKIP):
                return m.group(0)
            target = (page.parent / url).resolve()
            if not target.is_file():
                print(f"  WARN {page.relative_to(SITE)} -> {url} (missing)")
                return m.group(0)
            if target not in cache:
                cache[target] = short_hash(target)
            stamped += 1
            return f'{m.group("attr")}="{url}?v={cache[target]}"'

        new = ASSET_RE.sub(sub, html)
        if new != html:
            page.write_text(new, encoding="utf-8")
            changed += 1

    print(f"stamped {stamped} asset link(s) across "
          f"{len(list(SITE.rglob('*.html')))} page(s); {changed} file(s) rewritten")
    for path, h in sorted(cache.items()):
        print(f"  {path.relative_to(SITE)}  v={h}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
