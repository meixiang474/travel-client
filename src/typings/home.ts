export interface City {
  label: string;
  value: string;
}

export interface House {
  id: number;
  name: string;
  info: string;
  address: string;
  price: number;
  cityCode: string;
  showCount: number;
  url: string;
}

export interface GetCitiesAPI {
  cities: City[][];
}

export interface GetHotsAPI {
  count: number;
  hots: House[];
}
