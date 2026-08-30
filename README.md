# Nelson Produce — website

A one-page website for Nelson Produce, a roadside produce stand at 1800 West Meyer
Road, Wentzville, Missouri. Volunteer project. No framework — a small Node script
turns the content files into a plain, fast `dist/index.html`.

**Live:** https://c78c73.github.io/nelson-produce/ (until a custom domain is set up)

---

## Editing the content

Everything you'd want to change lives in `src/data/` as plain lists:

| File | What it controls |
|---|---|
| `src/data/site.mjs` | Name, address, hours note, payment, links, `SITE_URL`, `DRAFT` |
| `src/data/prices.mjs` | The "In the stand this week" list |
| `src/data/products.mjs` | The "What we grow & sell" list |
| `src/data/season.mjs` | The month-by-month "In season" chart |
| `src/data/reviews.mjs` | The customer quotes |
| `src/data/faq.mjs` | Questions & answers |
| `src/data/photos.mjs` | Which photos show, in what order, with captions |

Edit a file, save, rebuild (`npm run build`), and the site updates. Commit and push
to `main` and it deploys itself in ~1 minute.

## Preview locally

```bash
npm install        # first time only (for the photo tool)
npm run build      # writes dist/
npm run preview    # build + serve at http://localhost:8080
```

## Adding photos

1. Drop originals into `_source-photos/incoming/`
2. `npm run photos` — optimizes them into `src/photos/*.webp`
3. Add the filenames + captions to `src/data/photos.mjs`

The gallery shows the first `galleryPreviewCount` photos with a "View all" button.

## Going from draft to live

In `src/data/site.mjs`:

- `DRAFT = true` tells search engines not to index the site yet and shows a small
  "Draft" line in the footer. Set it to `false` once the ✎ items below are
  confirmed.
- `SITE_URL` is the site's public address. Change it to the real domain when one
  is set up (e.g. `https://nelsonproduce.com`), then add a `public/CNAME` file
  containing just that domain and configure DNS + "Enforce HTTPS" in the repo's
  Pages settings.

## Still to confirm with the Nelson family (the ✎ marks)

- Exact hours + the season's open / close dates
- Payment (the Google listing says cards + debit; confirm cash / anything else)
- Phone number (the one online is unverified, so it isn't published)
- The "In the stand this week" list and prices
- The full product list (trim to what they actually carry)
- The "In season by month" windows
- The Lil' Shack history and that they're OK mentioning it
- OK to feature the Google review quotes
- A few real photos — especially the barn-red exterior and the flag

## SEO / getting found on Google

Built in already: `<title>` + description, `LocalBusiness` structured data
(name, address, geo, link to Facebook), Open Graph tags for nice Facebook link
previews, `sitemap.xml`, `robots.txt`, semantic HTML, fast load, mobile layout.

The bigger levers are off the website:

- **Google Business Profile is #1.** Keep the name / address on this site
  character-for-character identical to the profile, set this site as the
  profile's "Website", and keep posting updates + gathering reviews.
- After a custom domain is live: add it to the Google Business Profile, verify
  the domain in **Google Search Console**, and submit `sitemap.xml` there.
- Get listed consistently (same name + address) on a few local directories.

### Optional: auto-refresh the Google reviews

Right now `src/data/reviews.mjs` holds a few hand-picked quotes. To keep them
current automatically, add a scheduled GitHub Action that calls the Google
Places API (key stored as a repo secret), writes the latest reviews to that
file, and commits. Note the API returns at most 5 reviews and Google chooses
which 5. A no-backend alternative is a free widget like Featurable.

## How deploy works

Push to `main` → `.github/workflows/deploy.yml` runs `node build.mjs` and
publishes `dist/` to GitHub Pages. Nothing else to run.
