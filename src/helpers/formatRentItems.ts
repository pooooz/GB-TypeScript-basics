interface RentItem {
  id: string,
  title: string,
  details: string,
  photos: Array<string>,
  coordinates: Array<number>,
  bookedDates: Array<Date>,
  totalPrice: number,
}

const getDistance = (coords: GeolocationCoordinates, coordinates: [number, number]) => {
  const y = coordinates[0] - coords.longitude;
  const x = coordinates[1] - coords.latitude;

  return Math.trunc(Math.sqrt(x * x + y * y));
};

export const formatRentItems = (
  items: Array<RentItem>,
  coords: GeolocationCoordinates,
) => items.map((item) => ({
  ...item,
  name: item.title,
  description: item.details,
  image: item.photos[0],
  price: item.totalPrice,
  remoteness: getDistance(coords, item.coordinates as [number, number]),
}));
