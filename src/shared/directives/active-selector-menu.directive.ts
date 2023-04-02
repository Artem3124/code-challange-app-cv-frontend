import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class ActiveSelectorMenu implements OnInit {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (!this.isActive) {
      return;
    }

    console.log(this.isActive);
    this.renderer.setStyle(this.element.nativeElement, 'color', '#4D7F9D');
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      '#FBFAFA'
    );
  }

  @Input() isActive: boolean = false;
}
