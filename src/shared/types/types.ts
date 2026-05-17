export interface EstateProps {
  id: string;
  photo: string;
  street: string;
  city: string;
  state: string;
  homeStatus: string;
  beds: number;
  baths: number;
  area: number;
  price: string;
}

export interface ApiEstate {
  id: string;
  price: string;
  beds: number;
  baths: number;
  area: number;
  homeStatus: string;
  imgSrc: string;
  address: {
    street: string;
    city: string;
    state: string;
  };
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
  coordinates: {
    lat: number;
    lng: number;
  };
  zipcode: string;
  daysOnZillow: number;
  zestimate?: number;
  detailUrl: string;
}
