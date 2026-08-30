// Renders the page body (everything inside <body>) from the data files.

import { site } from './data/site.mjs';
import { prices, pricesNote } from './data/prices.mjs';
import { products, productsNote } from './data/products.mjs';
import { season, months, seasonNote } from './data/season.mjs';
import { reviews } from './data/reviews.mjs';
import { faq } from './data/faq.mjs';
import { photos, hero, galleryNote, galleryPreviewCount } from './data/photos.mjs';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const todoMark = (what) =>
  what
    ? ` <span class="todo" title="${esc(what)} — to confirm with the Nelson family" aria-label="to confirm">✎</span>`
    : '';

const NAV = [
  ['story', 'The Stand'], ['season', 'This Week'], ['grow', 'What We Grow'],
  ['calendar', 'In Season'], ['pictures', 'Pictures'], ['reviews', 'Customers'],
  ['questions', 'Q&A'], ['find', 'Find Us'],
];

export function renderBody({ draftNote = '' } = {}) {
  const a = site.address;

  const nav = NAV.map(([id, label]) => `<a href="#${id}">${label}</a>`).join('');

  const priceRows = prices
    .map(([n, p]) => `<div class="pc"><span class="pn">${esc(n)}</span><span class="pl"></span><span class="pp">${esc(p)}</span></div>`)
    .join('');

  const seasonRows = season
    .map(([crop, from, to]) => {
      const cells = months
        .map((_, i) => `<td class="${i >= from && i <= to ? 'on' : ''}"></td>`)
        .join('');
      return `<tr><th scope="row">${esc(crop)}</th>${cells}</tr>`;
    })
    .join('');

  const plates = photos
    .map(
      ([file, caption], i) =>
        `<figure${i >= galleryPreviewCount ? ' hidden' : ''}><img loading="lazy" width="380" height="150" src="photos/${file}" alt="${esc(caption)}"><figcaption>${i + 1}. ${esc(caption)}</figcaption></figure>`
    )
    .join('');

  const quotes = reviews
    .map(
      (r) =>
        `<blockquote><p>${esc(r.text)}</p><cite>— ${esc(r.source)}, ${esc(r.date)}</cite></blockquote>`
    )
    .join('');

  const qa = faq
    .map(
      (f) =>
        `<div class="qa"><p class="q">${esc(f.q)}</p><p class="a">${esc(f.a)}${todoMark(f.todo)}</p></div>`
    )
    .join('');

  return `
<a class="skip" href="#main">Skip to content</a>
<div class="site" id="top">
  <header class="mast">
    <a class="wm" href="#top">${esc(site.name)}</a>
    <nav class="jump" aria-label="Sections">${nav}</nav>
  </header>

  <main id="main">
    <section id="story" class="sec story">
      <p class="folio">${esc(a.street.replace(/^\d+\s/, ''))} · ${esc(a.city)}, ${esc(a.regionName)} · Open for the season · Est. ${site.established}</p>
      <h1>${esc(site.tagline)}</h1>
      <p class="sub">Tomatoes and peppers off the garden behind it, Amish bread and local honey on the table, mums and pumpkins when the weather turns.</p>
      <div class="story-body">
        <p class="first">For years this was the Lil’ Shack — a small roadside stand that had quietly become a West Meyer Road fixture. In ${site.established} Mike and Laura Nelson took it over and kept it running under their own name.${todoMark('the Lil Shack history and the year')}</p>
        <figure class="inline-plate">
          <img loading="lazy" width="483" height="300" src="photos/${hero.file}" alt="${esc(hero.alt)}">
          <figcaption>${esc(hero.caption)} <span class="cred">— ${esc(hero.credit)}</span></figcaption>
        </figure>
        <p>Most of what’s on the table is Missouri-grown. The tomatoes, peppers, and greens come off the garden right behind the stand; the rest is from Amish growers and neighbors the Nelsons have bought from for years — honey, quick breads, jams, apple butter. Regulars come for the Amish tomatoes and the home-baked bread.</p>
        <p>${esc(site.payment)} Hours move with the season and the harvest — the <a href="${site.links.facebookGroup}">Facebook group</a> always has this week’s.</p>
      </div>
    </section>

    <section id="season" class="sec season">
      <h2>In the stand this week</h2>
      <div class="report">${priceRows}</div>
      <p class="note">${esc(pricesNote)}</p>
    </section>

    <section id="grow" class="sec grow">
      <h2>What we grow &amp; sell</h2>
      <p class="classified">${products.map(esc).join('&nbsp;· ')}.</p>
      <p class="note">${esc(productsNote)}</p>
    </section>

    <section id="calendar" class="sec calendar">
      <h2>In season, by the month</h2>
      <p class="lead">Roughly when to expect each thing at the stand.</p>
      <div class="cal-wrap">
        <table class="cal">
          <thead><tr><th scope="col"><span class="visually-hidden">Item</span></th>${months.map((m) => `<th scope="col">${m}</th>`).join('')}</tr></thead>
          <tbody>${seasonRows}</tbody>
        </table>
      </div>
      <p class="note">${esc(seasonNote)}</p>
    </section>

    <section id="pictures" class="sec pictures">
      <h2>Pictures from the stand</h2>
      <div class="plates" data-preview="${galleryPreviewCount}" data-count="${photos.length}">${plates}</div>
      <button class="viewmore" type="button" aria-expanded="false" hidden>View all ${photos.length} photos</button>
      <p class="note">${esc(galleryNote)}</p>
    </section>

    <section id="reviews" class="sec reviews">
      <h2>From our customers</h2>
      <div class="row3">${quotes}</div>
      <p class="rating">★★★★★ &nbsp;${site.google.rating.toFixed(1)} on Google · about ${site.google.reviewCount} reviews</p>
      <p class="acts"><a href="${site.links.googleMaps}">Read all reviews on Google →</a></p>
    </section>

    <section id="questions" class="sec questions">
      <h2>Questions &amp; answers</h2>
      <div class="qa-row">${qa}</div>
    </section>

    <section id="find" class="sec find">
      <h2>How to find us</h2>
      <address class="slug">${esc(a.street)}, ${esc(a.city)}, ${esc(a.regionName)} ${esc(a.postalCode)}</address>
      <p>${esc(site.hoursNote)}</p>
      <p class="acts">
        <a href="${site.links.directions}">Get directions →</a>
        <a href="${site.links.googleMaps}">Google Maps listing →</a>
        <a href="${site.links.facebookGroup}">Nelson Produce M &amp; L →</a>
      </p>
      <div class="mapframe">
        <iframe title="Map to ${esc(site.name)}, ${esc(a.street)}, ${esc(a.city)}, ${esc(a.regionName)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${site.links.mapEmbed}"></iframe>
      </div>
    </section>
  </main>

  <footer class="colophon">
    <p>${esc(site.name)} · ${esc(a.street)} · ${esc(a.city)}, ${esc(a.regionName)}</p>
    <p>A volunteer-built website. Photos from the stand’s Google listing.</p>
    ${draftNote}
  </footer>
</div>`;
}
