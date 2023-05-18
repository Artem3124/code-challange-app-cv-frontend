import { Component, Input } from '@angular/core';
import { User } from 'src/models';

@Component({
  selector: 'profile-section',
  templateUrl: './profile-section.component.html',
  styleUrls: [
    './profile-section.component.scss',
    '../../../../shared/styles/global-elements.scss',
    '../../../../shared/styles/fonts.scss',
  ],
})
export class ProfileComponent {
  constructor() {}

  @Input() user: User;
}
