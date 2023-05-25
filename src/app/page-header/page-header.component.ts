import { CommonModule, NgIf } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileIconComponent } from 'src/assets/svg/profile-icon/profile-icon.component';
import { ManageableIconModule } from 'src/shared/directives/icon/manageable-icon.module';
import { AuthStoreService } from 'src/shared/services/store/auth-store.service';

@Component({
  templateUrl: './page-header.component.html',
  selector: 'page-header',
  styleUrls: [
    './page-header.component.scss',
    '../../shared/styles/global-elements.scss',
    '../../shared/styles/fonts.scss',
  ],
})
export class PageHeaderComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private authStore: AuthStoreService) {
    this.authStore.initiateAuthCheck();
  }

  ngOnInit(): void {
    this.authStore.isSignIn().subscribe({
      next: (isLoggedIn: boolean) => { 
        this.isLoggedIn = isLoggedIn;
      }
    })
    
  }
}


@NgModule({
  declarations: [PageHeaderComponent, ProfileIconComponent],
  exports: [PageHeaderComponent],
  imports: [ManageableIconModule, RouterModule, CommonModule, NgIf, RouterModule]
}) export class PageHeaderModule {}