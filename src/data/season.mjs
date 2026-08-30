// "In season, by the month" chart.
// Each row: [name, firstMonthIndex, lastMonthIndex] over the months below.
// TODO: the Nelsons will correct these windows — they're a Missouri-calendar guess.

export const seasonNote =
  'Best guesses from a Missouri growing calendar. The Nelsons will correct these windows.';

export const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const season = [
  ['Asparagus', 0, 1],
  ['Strawberries', 1, 2],
  ['Green onions & greens', 1, 3],
  ['Blueberries', 2, 3],
  ['Green beans', 2, 5],
  ['Cucumbers', 2, 4],
  ['Peaches', 3, 4],
  ['Sweet corn', 3, 5],
  ['Tomatoes (incl. Amish)', 3, 6],
  ['Bell & hot peppers', 3, 6],
  ['Watermelon', 3, 5],
  ['Sweet potatoes', 5, 6],
  ['Winter squash & gourds', 5, 6],
  ['Mums', 5, 6],
  ['Pumpkins', 5, 6],
  ['Honey, breads & jam', 0, 8],
  ['Christmas trees', 7, 8],
];
