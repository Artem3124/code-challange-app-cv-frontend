import { Component, EventEmitter, Input, Output } from "@angular/core";
import { User } from "src/models";

@Component({
    selector: 'user-list-item',
    templateUrl: './user-list-item.component.html',
    styleUrls: [
        '../../../shared/styles/custom-form.scss',
        '../../../shared/styles/global-elements.scss',
    ]
})

export class UserListItem {
    @Input() user: User;
    @Output() selected: EventEmitter<User> = new EventEmitter<User>();
    
    onClick(): void {
        this.selected.emit(this.user);
    }
}