import { SearchFormData } from './interfaces';

export const getResults = (values: SearchFormData) => ({
  arrival: new Date(values.arrival),
  departure: new Date(values.departure),
  maxPrice: Number(values.maxPrice),
});
