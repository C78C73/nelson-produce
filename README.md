# Nelson Produce

A website for **Nelson Produce**, the family-run roadside produce stand at
1800 West Meyer Road in Wentzville, Missouri. Mike and Laura Nelson took over the
stand — known around town for years as the Lil' Shack — in 2025 and kept it going
under their own name.

They sell what's in season off the garden behind the stand and from Amish growers
they've bought from for years: tomatoes and Amish tomatoes, sweet corn, peppers,
greens, melons, local honey, home-baked bread, and in the fall mums, pumpkins,
and Christmas trees come November.

## About this project

The stand had no website, just a Facebook group. This is a small, volunteer-built
one: a single page covering who they are, where to find them, what's on the
table, a month-by-month guide to what's in season, photos, customer reviews, and
the usual questions. No ads, no tracking that follows people around, nothing to
log into.

**Live at:** https://c78c73.github.io/nelson-produce/

It's still a **draft**. Some details were gathered from public listings and need
checking with the Nelsons before it's finished, so for now the page asks search
engines not to list it yet.

## Still to check with Mike & Laura

- Hours, and when the stand opens and closes for the season
- The current "in the stand this week" list and prices
- The full list of what they carry — trim it to what's real
- Roughly which months each thing is in season
- Whether they're happy mentioning the Lil' Shack history
- Whether it's OK to feature the Google review quotes
- A phone number (the one online isn't confirmed, so it's left off)
- A few real photos — especially the barn-red stand with the flag out front

## Changing what the site says

The wording lives in plain lists in `src/data/`. Open the relevant file, edit the
text, save:

- `prices.mjs` — the "in the stand this week" list
- `season.mjs` — the month-by-month chart
- `products.mjs` — what they grow and sell
- `faq.mjs` — the questions and answers
- `reviews.mjs` — the customer quotes
- `site.mjs` — address, hours note, links, and the draft switch

Then rebuild and publish, or hand it back to whoever set this up.

## Adding photos

Put the originals in `_source-photos/incoming/`, run `npm run photos`, and add the
new filenames to `src/data/photos.mjs`. They're resized and cleaned up for you.

## When it's ready to go public

In `src/data/site.mjs`: set `DRAFT` to `false`. Once there's a real domain, put it
in `SITE_URL` and add a `public/CNAME` file containing just that domain. That
removes the "don't list me yet" note so the site can show up in searches.

---

### Technical notes

No framework. `node build.mjs` turns the files in `src/data/` into `dist/`.
`npm run preview` builds it and serves it locally.

Published from the **`gh-pages` branch**: `npm run build`, then copy `dist/` onto
that branch and push. `ci/deploy.yml.pending` is a GitHub Actions workflow that
does this on every push — move it to `.github/workflows/` once the GitHub token
has `workflow` permission (`gh auth refresh -s workflow`).

Analytics (Cloudflare Web Analytics, Umami, or GoatCounter) stay off until a
token is added to the `analytics` block in `src/data/site.mjs`. All three are
cookieless and need no consent banner.
