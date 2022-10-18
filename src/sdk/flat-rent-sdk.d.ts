export interface RentItem {
  id: string,
  title: string,
  details: string,
  photos: Array<string>,
  coordinates: Array<number>,
  bookedDates: Array<Date>,
  totalPrice: number,
}

export class FlatRentSdk {
  search(
    options:
      {
        city: string,
        checkInDate: Date,
        checkOutDate: Date,
        priceLimit: number
      }
  ): Promise<Array<RentItem>>
}
