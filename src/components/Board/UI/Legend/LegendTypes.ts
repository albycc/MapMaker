export interface ILegend {
  id: string;
  label: string;
  colour: string;
}

export interface ILegendStyles {
  border: boolean;
  borderColor: string;
  borderWidth: number;
  borderRound: number;
  background: boolean;
  backgroundColor: string;
  fontColor: string;
  titleSize: number;
  framePadding: number;
  spaceBetweenRows: number;
}
