export async function fetchVehicles() {
  try {
    const response = await fetch('data/vehicles.json');
    if (!response.ok) {
      throw new Error('Failed to fetch vehicle data.');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
