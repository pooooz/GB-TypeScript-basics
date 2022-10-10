export interface BookingItem {
  id: number;
  name: string;
  description: string;
  price: number;
  remoteness: number;
  bookedDates: Array<number>;
  image: string;
  message?: string;
  status?: string;
}
