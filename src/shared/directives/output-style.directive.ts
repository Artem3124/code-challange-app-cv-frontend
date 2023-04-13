import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { CodeRunOutcome } from "src/models/enums/code-run-outcome.enum";

@Directive({
  selector: '[codeRunOutcomeStyle]'
}) export class CodeRunOutcomeDirective implements OnChanges {

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    switch(this.codeRunOutcome) {
      case CodeRunOutcome.Succeeded: {
        return this.renderer.setStyle(this.element.nativeElement, 'color', '#379A3C');
      }
      default: { 
        return this.renderer.setStyle(this.element.nativeElement, 'color', '#D14A4A');
      }
    }
  }

  @Input() codeRunOutcome: CodeRunOutcome

}