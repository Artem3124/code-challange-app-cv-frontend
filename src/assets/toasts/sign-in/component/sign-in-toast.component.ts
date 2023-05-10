import { Component } from '@angular/core';

@Component({
  selector: 'sign-in-toast',
  templateUrl: './sign-in-toast.component.html',
  styleUrls: ['./sign-in-toast.component.scss'],
})
export class SignInToastComponent {
  position = 'bottom-end';
  visible = 'false';
  percentage = 0;

  toggleToast() {
    this.visible = !this.visible;
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 25;
  }
}
