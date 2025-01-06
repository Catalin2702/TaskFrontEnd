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
	@Input({required: true}) selectedId!: number | undefined;
	@Input() isFetching!: boolean;
	@Output() addUser = new EventEmitter<void>();
	@Output() userSelected = new EventEmitter<number>();

	isSelected(id: number): boolean {
		return this.selectedId === id;
	}

	onAddUser() {
		this.addUser.emit();
	}

	onUserSelected(id: number) {
		this.userSelected.emit(id);
		this.selectedId = id;
	}
}
