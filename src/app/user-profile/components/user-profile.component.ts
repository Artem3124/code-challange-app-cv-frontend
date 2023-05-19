import { Component, OnInit } from "@angular/core";
import { User } from "src/models";
import { AuthStoreService } from "src/shared/services/store/auth-store.service";

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
}) export class UserProfileComponent implements OnInit {

  user: User;

  constructor(private authStore: AuthStoreService ) { // make loading all resolved and unresolved user problems here
    this.authStore.initiateAuthCheck();
  }

  ngOnInit(): void {
    this.authStore.getUser().subscribe({
      next: (user: User | null) => { 
        if (!user) { 
          return;
        }

        this.user = user;
      },
      error: (err: any) => console.error(err)
    })

  }

}