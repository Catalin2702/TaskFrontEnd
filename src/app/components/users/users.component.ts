import {Component, EventEmitter, Input, Output} from '@angular/core';

import {User} from '../../models/task.model';

@Component({
	selector: 'app-users',
	imports: [],
	templateUrl: './users.component.html',
	styleUrl: './users.component.scss'
})
export class UsersComponent {
	@Input({required: true}) users!: User[] | undefined;
	@Input({required: true}) selectedUserId!: number | undefined;
	@Input() isFetching!: boolean;
	@Output() addUser = new EventEmitter<void>();
	@Output() selectUser = new EventEmitter<number>();

	isSelected(id: number): boolean {
		return this.selectedUserId === id;
	}

	onAddUser() {
		this.addUser.emit();
	}

	onUserSelected(id: number) {
		this.selectUser.emit(id);
		this.selectedUserId = id;
	}
}
