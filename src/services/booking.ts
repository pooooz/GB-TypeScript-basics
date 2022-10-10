import { BookingItem } from './interfaces';

const dateToUnixStamp = (date: Date) => date.getTime() / 1000;

const responseToJson = async (
  requestPromise: Response,
): Promise<Array<BookingItem> | BookingItem> => {
  const response = await requestPromise;
  const text = await response.text();
  return JSON.parse(text);
};

export const search = async (
  checkInDate: Date,
  checkOutDate: Date,
  maxPrice?: number | null,
) => {
  let url = 'http://localhost:3030/places?'
    + `checkInDate=${dateToUnixStamp(checkInDate)}&`
    + `checkOutDate=${dateToUnixStamp(checkOutDate)}&`
    + 'coordinates=59.9386,30.3141';

  if (maxPrice != null) {
    url += `&maxPrice=${maxPrice}`;
  }

  const results = await fetch(url);

  if (!results.ok) {
    const error = await responseToJson(results) as BookingItem;
    if (error.message) {
      throw new Error(error.message);
    }
  }

  return responseToJson(results);
};

export const book = async (
  placeId: number,
  checkInDate: Date,
  checkOutDate: Date,
) => {
  const results = await fetch(
    `http://localhost:3030/places/${placeId}?`
    + `checkInDate=${dateToUnixStamp(checkInDate)}&`
    + `checkOutDate=${dateToUnixStamp(checkOutDate)}&`,
    { method: 'PATCH' },
  );

  if (!results.ok) {
    const error = await responseToJson(results) as BookingItem;
    if (error.message) {
      throw new Error(error.message);
    }
  }

  return responseToJson(results);
};
