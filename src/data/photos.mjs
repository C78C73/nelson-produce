// Gallery photos, in order. Files live in src/photos/ (optimized .webp).
// Add new ones by dropping the original in _source-photos/new/, running
// `npm run photos`, then adding a line here.
//
// The gallery shows the first `galleryPreviewCount` and a "View all" button
// reveals the rest.

export const galleryPreviewCount = 6;

export const galleryNote =
  'Low-resolution for now — pulled from the Google listing. Real photos from the stand, especially the barn-red exterior and the flag, will replace these.';

// The lead image at the top of the page.
export const hero = {
  file: 'stand-interior.webp',
  alt: 'The open-air Nelson Produce stand seen from the road, tomatoes lined along the counter',
  caption: 'The stand, from the customer side.',
  credit: 'Google Maps',
};

export const photos = [
  ['amish-tomatoes-rows.webp', 'Amish tomatoes, sorted by size and ripeness'],
  ['spread-wide.webp', "Berries, cherries, and the morning's tomatoes"],
  ['bell-peppers.webp', 'Green bells a dollar, colored ones a dollar-fifty'],
  ['jalapenos.webp', 'Peppers by the crate — three for a dollar'],
  ['sweet-potatoes.webp', 'Sweet potatoes, a dollar and a quarter a pound'],
  ['onions.webp', 'Red and yellow onions in the pallet boxes'],
  ['green-onions.webp', 'Green onions kept standing in water on the counter'],
  ['asparagus.webp', 'Purple and green asparagus in the wash tub'],
  ['amish-breads.webp', 'Amish quick breads, wrapped and stacked on the mat'],
  ['tomatoes-orange-red.webp', 'Orange and red slicers lined up on the mats'],
];
