import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CodeProblemView, User } from 'src/models';
import { AuthStoreService } from 'src/shared/services/store/auth-store.service';
import { CodeRunsStoreService } from 'src/shared/services/store/code-runs-store.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: User;
  resolvedProblems: CodeProblemView[] = [];
  unresolvedProblems: CodeProblemView[] = [];

  constructor(
    private authStore: AuthStoreService,
    private codeRunsStore: CodeRunsStoreService,
    private profileStore: AuthStoreService,
    private router: Router,
  ) {
    this.authStore.initiateAuthCheck();
    this.authStore.getStatistic();
    this.codeRunsStore.initiateGettingAllCodeSubmissions();
  }

  ngOnInit(): void {
    this.authStore.getUser().subscribe({
      next: (user: User | null) => {
        if (!user) {
          this.router.navigate(['/home'])
          return;
        }

        this.user = user;
      },
      error: (err: any) => console.error(err),
    });

    this.profileStore.getResolvedProblems().subscribe({
      next: (resolvedProblems: CodeProblemView[] | null) => { 
        if (!resolvedProblems) { 
          return;
        }

        this.resolvedProblems = resolvedProblems;
      }
    })

    this.profileStore.getUnresolvedProblems().subscribe({
      next: (unresolvedProblems: CodeProblemView[] | null) => { 
        if (!unresolvedProblems) { 
          return;
        }

        this.unresolvedProblems = unresolvedProblems;
      }
    })
  }
}
