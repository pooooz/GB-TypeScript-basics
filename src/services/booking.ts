const dateToUnixStamp = (date: Date) => date.getTime() / 1000;

const responseToJson = (requestPromise: Promise<any>) => requestPromise
  .then((response) => response.text())
  .then((response) => JSON.parse(response));

export const search = (checkInDate: Date, checkOutDate: Date, maxPrice?: number) => {
  let url = 'http://localhost:3030/places?'
    + `checkInDate=${dateToUnixStamp(checkInDate)}&`
    + `checkOutDate=${dateToUnixStamp(checkOutDate)}&`
    + 'coordinates=59.9386,30.3141';

  if (maxPrice != null) {
    url += `&maxPrice=${maxPrice}`;
  }

  return responseToJson(fetch(url));
};

export const book = (
  placeId: number,
  checkInDate: Date,
  checkOutDate: Date,
) => responseToJson(fetch(
  `http://localhost:3030/places/${placeId}?`
    + `checkInDate=${dateToUnixStamp(checkInDate)}&`
    + `checkOutDate=${dateToUnixStamp(checkOutDate)}&`,
  { method: 'PATCH' },
));
