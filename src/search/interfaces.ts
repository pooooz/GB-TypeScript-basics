export interface SearchFormData {
  arrival: string;
  departure: string;
  maxPrice: string;
}

export interface BookingItemLocalStorage {
  id: number;
  name: string;
  image: string;
}

export type SortValues = 'expensive' | 'cheap' | 'near'
