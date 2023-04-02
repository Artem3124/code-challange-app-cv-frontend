import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from "@angular/core";

export interface RarityIconColorState { 
  stroke: string;
  fill: string;
}

@Directive({
  selector: '[manageable-icon-color]',
})
export class ManageableIconColor implements OnChanges{
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    
    if (!this.validateInputParameters(this.iconStrokeWidth, this.strokeWidthMultiplyCoefficient)) { 
      return;
    }

    this.renderer.setStyle(this.element.nativeElement, 'fill', `${this.iconFillColor}`);
    this.renderer.setStyle(this.element.nativeElement, 'stroke', `${this.iconStrokeColor}`);
    this.renderer.setStyle(this.element.nativeElement, 'fill-opacity', `${this.iconFillOpacity}`);
    this.renderer.setStyle(this.element.nativeElement, 'stroke-width', `${this.iconStrokeWidth * this.strokeWidthMultiplyCoefficient}`);
  }

  @Input() iconStrokeColor: string | undefined = "#4E79C6";
  @Input() iconFillColor: string | undefined = "transparent";
  @Input() iconFillOpacity: number | undefined = 1;
  @Input() iconStrokeWidth: number = 2.3;
  @Input() strokeWidthMultiplyCoefficient: number = 0.0884;

  private validateInputParameters(...parameters: (string | number | undefined)[]): boolean { 
    return !Object.keys(parameters).some((parameter: string) => { 
      parameter === undefined;
    })
  }
}
