import { Img } from "../components/types/Image";

export interface ICountry {
  id: string;
  name: string;
  fillColour: string | Img | null;
}

export interface ICountryForm {
  countryId: string;
  fillColour: string | Img | null;
}
