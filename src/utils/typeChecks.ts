import { IText } from "../components/CanvasMap/Elements/element-types";
import { ICountry } from "../types/CountriesTypes";

export function selectionIsCountry(
  item: ICountry | IText | null
): item is ICountry {
  if (item === null) {
    return false;
  }
  return (item as ICountry).name !== undefined;
}

export function selectionIsText(item: ICountry | IText | null): item is IText {
  if (item === null) {
    return false;
  }
  return (item as IText).font !== undefined;
}
