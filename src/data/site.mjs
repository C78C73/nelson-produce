// Core facts about the stand. Edit these as things get confirmed.
// Lines tagged TODO are not yet verified with the Nelson family.

export const site = {
  name: 'Nelson Produce',
  // Shown in the browser tab and search results.
  title: 'Nelson Produce — roadside produce stand in Wentzville, MO',
  // One sentence for search engines and link previews (~155 chars).
  description:
    'A family-run roadside produce stand at 1800 West Meyer Road in Wentzville, Missouri. Missouri-grown tomatoes, peppers, sweet corn, Amish bread, local honey, fall pumpkins and mums.',
  tagline: 'A produce stand you can see from the road',
  established: 2025,

  address: {
    street: '1800 West Meyer Road',
    city: 'Wentzville',
    region: 'MO',
    regionName: 'Missouri',
    postalCode: '63385',
    country: 'US',
  },

  // Approximate — matched from OpenStreetMap to the street address. TODO: confirm.
  geo: { lat: 38.8249, lng: -90.8878 },

  // TODO: confirm hours and the season's open / close dates with the Nelsons.
  // Left out of the site's structured data until confirmed so Google doesn't
  // publish wrong hours. `hoursNote` is the honest version shown on the page.
  hoursNote:
    'Open for the season, roughly Wednesday through Sunday, daytime. Hours change week to week and with the harvest — check the Facebook group before you head out.',
  hoursConfirmed: false,
  // When hoursConfirmed is true, fill this in and it will be used everywhere:
  hours: null,
  // e.g. { days: ['We','Th','Fr','Sa','Su'], opens: '09:00', closes: '17:00' }

  payment: 'Credit, debit, and cash. Free parking lot. Quick stop.',
  paymentSource: "the stand's Google listing", // TODO: confirm at the stand

  // TODO: the only phone number found online is unverified — not published yet.
  phone: null,

  links: {
    facebookGroup: 'https://www.facebook.com/groups/1587390851548041/',
    googleMaps:
      'https://www.google.com/maps/search/?api=1&query=Nelson+Produce+1800+West+Meyer+Road+Wentzville+MO',
    directions:
      'https://www.google.com/maps/dir/?api=1&destination=1800+West+Meyer+Road+Wentzville+MO+63385',
    // Keyless embeddable map for the "Find us" section.
    mapEmbed:
      'https://www.google.com/maps?q=1800%20West%20Meyer%20Road%2C%20Wentzville%2C%20MO%2063385&output=embed',
  },

  // Google Business Profile summary (from what the Nelsons entered there).
  google: { rating: 5.0, reviewCount: 25 },
};

// Privacy-friendly visitor analytics. All three are cookieless and need no
// consent banner. Leave a field blank to skip that one; fill any you want and
// rebuild. You can run more than one at once.
//
//  - Cloudflare Web Analytics: dash.cloudflare.com -> Analytics & Logs ->
//    Web Analytics -> "Add a site". Copy the token out of the snippet it shows
//    (the value after "token": "...").
//  - Umami: cloud.umami.is (free tier) or self-hosted -> add website ->
//    Tracking code. Copy the data-website-id, and the script src if self-hosted.
//  - GoatCounter: sign up at goatcounter.com, pick a code -> your dashboard is
//    <code>.goatcounter.com and can be made public. Put just the <code> here.
export const analytics = {
  cloudflareToken: '8230f5b095e143758a83cc867ae78423', // Cloudflare Web Analytics, hostname c78c73.github.io
  umamiWebsiteId: 'ea34ae60-c5f1-46e7-a089-bec37be01223', // Umami Cloud
  umamiSrc: 'https://cloud.umami.is/script.js',
  goatcounterCode: '',
};

// The public address of the finished site. Change this one line when the
// custom domain is live (e.g. 'https://nelsonproduce.com').
export const SITE_URL = 'https://c78c73.github.io/nelson-produce';

// While true: the page tells search engines not to index it yet, and shows a
// small "draft" line. Flip to false once the TODO items are confirmed and the
// real domain is set above.
export const DRAFT = true;
