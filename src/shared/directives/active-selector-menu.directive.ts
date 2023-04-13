import { OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ComponentType } from 'src/models/enums/component-type.enum';
import { Dictionary } from 'src/shared/data-types/dictionary.data-type';
import { SourceCodeStoreService } from 'src/shared/services/store/source-code-store.service';

@Directive({
  selector: '[appHighlight]',
})
export class ActiveSelectorMenu implements OnChanges {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    switch (this.componentType) {
      case ComponentType.MenuItem: {
        console.log(changes['currentElId']);
        
        if (changes['currentElId'].previousValue) {
          //var prevElement = document.getElementById(changes[this.currentElId].previousValue);
          console.log(changes['currentElId'].previousValue);
        }
        
        if (!this.isActive) {
          this.renderer.removeStyle(this.element.nativeElement, 'border');
          return;
        }

        this.renderer.setStyle(
          this.element.nativeElement,
          'border',
          'solid #4D7F9D'
        );

        return;
      }
      case ComponentType.MenuSelection: {
        this.renderer.setStyle(this.element.nativeElement, 'color', '#4D7F9D');
        this.renderer.setStyle(
          this.element.nativeElement,
          'backgroundColor',
          '#FBFAFA'
        );
        return;
      }
    }
  }

  @HostListener('click') 

  @Input() currentElId: string;
  @Input() isActive: boolean = false;
  @Input() componentType: ComponentType; // Initialize Component type like menu item under menu item or smth similar
}
