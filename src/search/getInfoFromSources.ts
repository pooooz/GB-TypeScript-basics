import { search } from '../services/booking.js';
import { BookingItem } from '../services/interfaces';
import { FlatRentSdk } from '../sdk/flat-rent-sdk.js';
import { formatRentItems } from '../helpers/formatRentItems.js';

export const getInfoFromSources = async (
  arrival: Date,
  departure: Date,
  maxPrice: number,
  coords: GeolocationCoordinates,
): Promise<Array<BookingItem>> => {
  const results = await search(
    arrival,
    departure,
    maxPrice > 0 ? maxPrice : null,
  ) as Array<BookingItem>;

  const rent = new FlatRentSdk();

  const resultsFromSDK = await rent.search({
    city: 'Санкт-Петербург',
    checkInDate: arrival,
    checkOutDate: departure,
    priceLimit: maxPrice,
  });

  return [...results, ...formatRentItems(resultsFromSDK, coords)];
};
