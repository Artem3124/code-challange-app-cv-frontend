import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileIconComponent } from 'src/assets/svg/profile-icon/profile-icon.component';
import { ManageableIconModule } from 'src/shared/directives/icon/manageable-icon.module';

@Component({
  templateUrl: './page-header.component.html',
  selector: 'page-header',
  styleUrls: [
    './page-header.component.scss',
    '../../shared/styles/global-elements.scss',
    '../../shared/styles/fonts.scss',
  ],
})
export class PageHeaderComponent {
  constructor() {}
}


@NgModule({
  declarations: [PageHeaderComponent, ProfileIconComponent],
  exports: [PageHeaderComponent],
  imports: [ManageableIconModule, RouterModule]
}) export class PageHeaderModule {}