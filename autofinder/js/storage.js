const STORAGE_KEY = 'favoriteVehicles';

export function saveFavorites(favArray) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favArray));
}

export function getFavorites() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function toggleFavorite(id) {
  let favs = getFavorites();
  if (favs.includes(id)) {
    favs = favs.filter(favId => favId !== id);
  } else {
    favs.push(id);
  }
  saveFavorites(favs);
}
