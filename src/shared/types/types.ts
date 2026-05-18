/** General types */
export interface Address {
  street: string;
  city: string;
  state: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

/** ------------- */
export interface EstateProps extends Omit<ApiEstate, "address" | "imgSrc"> {
  photo: string;
  street: Address["street"];
  city: Address["city"];
  state: Address["state"];
}

export interface ApiEstate {
  id: string;
  price: string;
  beds: number;
  baths: number;
  area: number;
  homeStatus: string;
  imgSrc: string;
  address: Address;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface DetailedEstateProperties {
  id: string;
  photo: string;
  street: string;
  city: string;
  state: string;
  homeType: string;
  marketingStatus: string;
  homeStatus: string;
  beds: number;
  baths: number;
  area: number;
  livingArea: number;
  price: string;
  taxAssessedValue: number;
  coordinates: Coordinates;
  zipcode: string;
  daysOnZillow: number;
  zestimate?: number;
  detailUrl: string;
}
