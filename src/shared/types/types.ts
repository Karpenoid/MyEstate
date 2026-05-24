/** General types */
export interface Address {
  street: string;
  city: string;
  state: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
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
  area: number | string;
  homeStatus: string;
  imgSrc: string;
  address: Address;
  // Optional data
  homeType?: string;
  marketingStatus?: string;
  livingArea?: number;
  taxAssessedValue?: number;
  latLong?: Coordinates;
  zipcode?: string;
  daysOnZillow?: number;
  zestimate?: number;
  detailUrl?: string;
}
