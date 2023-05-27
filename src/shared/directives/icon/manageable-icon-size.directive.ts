import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: '[manageable-icon-size]',
})

export class ManageableSvgPathSize implements OnInit{
    constructor(private element: ElementRef, private renderer: Renderer2) {}
  
    ngOnInit(): void {
        this.renderer.setStyle(this.element.nativeElement, 'width', `${this.iconSizeState}px`);
        this.renderer.setStyle(this.element.nativeElement, 'height', `${this.iconSizeHeightCoefficient * this.iconSizeState}px`)
    }

  @Input() iconSizeState = 26;
  @Input() iconSizeHeightCoefficient = 1;
}
