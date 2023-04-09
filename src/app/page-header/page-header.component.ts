import { Component, NgModule } from '@angular/core';

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
  declarations: [PageHeaderComponent],
  exports: [PageHeaderComponent]
}) export class PageHeaderModule {}