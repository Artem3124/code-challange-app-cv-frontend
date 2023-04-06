import { OnChanges, SimpleChanges } from '@angular/core';
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class ActiveSelectorMenu implements OnChanges {
  constructor(private element: ElementRef, private renderer: Renderer2) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.isActive) {
      return;
    }
    this.renderer.setStyle(this.element.nativeElement, 'color', '#4D7F9D');
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      '#FBFAFA'
    );
  }

  @HostListener('click') 
  changeActiveState() {
    console.log('event works')
  }

  @Input() isActive: boolean = false;
}
