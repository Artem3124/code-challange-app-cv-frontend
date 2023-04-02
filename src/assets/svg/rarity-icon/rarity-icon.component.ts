import { Component, Input } from "@angular/core";
import ProblemComplexity from "src/models/enums/problem-rarity.enum";
import { IconStateBase } from "src/models/icon/icon-state.model";

export interface RarityIconState extends IconStateBase {
  fill: string;
  fillOpacity: number;
}

@Component({
  selector: "complexity-icon",
  templateUrl: "./rarity-icon.component.html",
  styleUrls: ['./rarity-icon.component.scss'],
})

export class RarityIconComponent {
  constructor() {}

  @Input() complexity: ProblemComplexity;
}
