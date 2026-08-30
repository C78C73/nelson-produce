// Assembles the finished site into dist/. No dependencies — plain Node.
//   node build.mjs

import { mkdirSync, rmSync, cpSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { site, analytics, SITE_URL, DRAFT } from './src/data/site.mjs';
import { renderBody } from './src/page.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');
const today = new Date().toISOString().slice(0, 10);

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

const a = site.address;

// --- structured data: helps this show up in local Google results ---
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'GroceryStore',
  name: site.name,
  description: site.description,
  url: SITE_URL + '/',
  image: `${SITE_URL}/photos/stand-interior.webp`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: a.street,
    addressLocality: a.city,
    addressRegion: a.region,
    postalCode: a.postalCode,
    addressCountry: a.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
  sameAs: [site.links.facebookGroup],
  priceRange: '$',
};
if (site.phone) jsonLd.telephone = site.phone;
if (site.hoursConfirmed && site.hours) {
  jsonLd.openingHoursSpecification = [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: site.hours.days,
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
  ];
}

const robotsMeta = DRAFT
  ? '<meta name="robots" content="noindex, nofollow">'
  : '<meta name="robots" content="index, follow">';

const draftNote = DRAFT
  ? '<p class="draft-flag">Draft — details still being confirmed with the Nelson family.</p>'
  : '';

// --- optional privacy-friendly analytics (only what's configured) ---
const a11y = [];
if (analytics.cloudflareToken) {
  a11y.push(
    `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${analytics.cloudflareToken}"}'></script>`
  );
}
if (analytics.umamiWebsiteId) {
  a11y.push(
    `<script defer src="${analytics.umamiSrc}" data-website-id="${analytics.umamiWebsiteId}"></script>`
  );
}
if (analytics.goatcounterCode) {
  a11y.push(
    `<script data-goatcounter="https://${analytics.goatcounterCode}.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>`
  );
}
const analyticsTags = a11y.join('\n');

const inlineScript = `
(function(){
  var grid=document.querySelector('.plates');
  var btn=document.querySelector('.viewmore');
  if(!grid||!btn) return;
  var total=+grid.dataset.count, preview=+grid.dataset.preview;
  var figs=grid.querySelectorAll('figure');
  if(total>preview) btn.hidden=false;
  btn.addEventListener('click',function(){
    var expanded=btn.getAttribute('aria-expanded')==='true';
    for(var i=preview;i<figs.length;i++) figs[i].hidden=expanded;
    btn.setAttribute('aria-expanded', expanded?'false':'true');
    btn.textContent = expanded ? ('View all '+total+' photos') : 'Show fewer photos';
  });
})();`;

const head = `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${site.title}</title>
<meta name="description" content="${site.description}">
<link rel="canonical" href="${SITE_URL}/">
${robotsMeta}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${site.title}">
<meta property="og:description" content="${site.description}">
<meta property="og:url" content="${SITE_URL}/">
<meta property="og:image" content="${SITE_URL}/photos/spread-wide.webp">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#EFE4CB">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&family=Libre+Franklin:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;

const body = renderBody({ draftNote });

const doc = `<!doctype html>
<html lang="en">
<head>
${head}
</head>
<body>
${body}
<script>${inlineScript}</script>
${analyticsTags}
</body>
</html>
`;

writeFileSync(join(dist, 'index.html'), doc);

// --- 404 ---
writeFileSync(
  join(dist, '404.html'),
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Page not found — ${site.name}</title><meta name="robots" content="noindex"><link rel="icon" href="favicon.svg" type="image/svg+xml"><style>body{margin:0;min-height:100vh;display:grid;place-content:center;text-align:center;background:#EFE4CB;color:#2A2013;font-family:Georgia,serif;padding:24px}a{color:#9C2B24}</style></head><body><div><p style="font-size:20px">That page isn’t here.</p><p><a href="${SITE_URL}/">Go to ${site.name} →</a></p></div></body></html>\n`
);

// --- robots + sitemap ---
writeFileSync(
  join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
);
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITE_URL}/</loc><lastmod>${today}</lastmod></url>\n</urlset>\n`
);

// GitHub Pages: don't run Jekyll over the output.
writeFileSync(join(dist, '.nojekyll'), '');

// --- static assets ---
cpSync(join(root, 'src', 'styles.css'), join(dist, 'styles.css'));
cpSync(join(root, 'src', 'photos'), join(dist, 'photos'), { recursive: true });
if (existsSync(join(root, 'public'))) {
  cpSync(join(root, 'public'), dist, { recursive: true });
}

const size = (readFileSync(join(dist, 'index.html')).length / 1024).toFixed(1);
console.log(`Built dist/  (index.html ${size} KB, draft=${DRAFT}, site=${SITE_URL})`);
