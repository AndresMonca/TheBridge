export const DISCOVERY_QUERIES = [
  "fiction",
  "history",
  "science",
  "philosophy",
  "art",
  "technology",
  "fantasy",
  "literature",
  "biography",
  "mystery",
];

export function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export function shuffleArray(items) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}
