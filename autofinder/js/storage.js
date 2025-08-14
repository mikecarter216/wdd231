// Consistent numeric IDs in storage for reliability with includes/filter
const STORAGE_KEY = "favoriteVehicles";

export function saveFavorites(favArray) {
  const normalized = [...new Set(favArray.map(id => Number(id)))];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
}

export function getFavorites() {
  const raw = localStorage.getItem(STORAGE_KEY);
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.map(Number) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(id) {
  const numericId = Number(id);
  let favs = getFavorites();
  if (favs.includes(numericId)) {
    favs = favs.filter(f => f !== numericId);
  } else {
    favs.push(numericId);
  }
  saveFavorites(favs);
}
