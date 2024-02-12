import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/models';
import { AuthStoreService } from 'src/shared/services/store/auth-store.service';
import { ProblemListStoreService } from 'src/shared/services/store/problem-list-store.service';
import { ProblemStoreService } from 'src/shared/services/store/problem-store.service';

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
    constructor(private toastr: ToastrService, private problemStore: ProblemListStoreService, private authStore: AuthStoreService) {
        this.problemStore.initiateProblemListFetching();
    }

  @Input() user: User;

  logOut() { 
     this.authStore.initiateLogout();
  }
}
