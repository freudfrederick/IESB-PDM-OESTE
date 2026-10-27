import * as Location from 'expo-location';

// Devolve { latitude, longitude, label } ou null quando a permissão de primeiro plano é negada
export async function getCurrentPlace() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return null;

  const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
  const { latitude, longitude } = position.coords;

  // Se não houver endereço para as coordenadas, o rótulo cai para latitude e longitude
  let label = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
  try {
    const [address] = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (address) {
      const parts = [address.street, address.district || address.subregion, address.city, address.region];
      const text = parts.filter(Boolean).join(', ');
      if (text) label = text;
    }
  } catch (error) {
    // mantém as coordenadas como rótulo
  }

  return { latitude, longitude, label };
}
