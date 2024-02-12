import { Component, Input } from "@angular/core";
import { User } from "src/models";

@Component({
    selector: 'user-list',
    templateUrl: './user-list.html'
})

export class UserList {
    @Input() users: User[];
}
