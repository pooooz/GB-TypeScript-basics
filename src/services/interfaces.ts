export interface BookingItem {
  id: number | string;
  name: string;
  description: string;
  price: number;
  remoteness: number;
  bookedDates: Array<Date>;
  image: string;
  message?: string;
  status?: string;
}
