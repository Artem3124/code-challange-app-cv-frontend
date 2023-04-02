import { IconStateBase } from "./icon-state.model";

export interface ColorIconState extends IconStateBase { 
  strokeColor: string;
  fill?: string;
  fillOpacity?: number;
}