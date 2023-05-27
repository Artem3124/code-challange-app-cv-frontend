import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[spin-arrows]',
})
export class AwaitIconAnimation implements OnChanges {
    constructor(
    private element: ElementRef,
    private renderer: Renderer2
    ) {
    }

    ngOnChanges(): void {
        if(!this.isAnimate) { 
            return this.disableAnimation();
        }

        this.enableAnimation();
    }

    private disableAnimation() { 
        if (this.element.nativeElement.id === 'hours-arrow') { 
            this.renderer.removeClass(this.element.nativeElement, 'clock-arrow-hours');
        }

        if (this.element.nativeElement.id === 'minutes-arrow') {
            this.renderer.removeClass(this.element.nativeElement, 'clock-arrow-minutes');
        }
    }

    private enableAnimation() { 
        if (this.element.nativeElement.id === 'hours-arrow') { 
            this.renderer.addClass(this.element.nativeElement, 'clock-arrow-hours');
        }

        if (this.element.nativeElement.id === 'minutes-arrow') {
            this.renderer.addClass(this.element.nativeElement, 'clock-arrow-minutes');
        }
    }
  
  @Input() isAnimate = false;
}
