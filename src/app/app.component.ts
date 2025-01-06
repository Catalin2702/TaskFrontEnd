import {Component, inject, OnInit, signal} from '@angular/core';

import {UsersComponent} from './components/users/users.component';
import {AddUserComponent} from './components/users/add-user.component';
import {UserService} from './services/user.service';
import {NewUser, User} from './models/task.model';

@Component({
	selector: 'app-root',
	imports: [UsersComponent, AddUserComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
	title = 'Tasks FrontEnd';
	isAddingUser: boolean = false;
	userService: UserService = inject(UserService);
	userRefreshCounter = -1;
	users = signal<User[]>([]);
	selectedId = signal<number | undefined>(undefined);
	isUserFetching = signal<boolean>(false);

	constructor() {
		document.title = this.title;
	}

	ngOnInit() {
		this.loadUsers();
	}

	loadUsers() {
		this.isUserFetching.set(true);
		this.userService.loadUsers().subscribe({
			next: users => {
				this.users.set(users);
				if (users.length)
					this.selectedId.set(users[0].id);
			},
			error: (error: Error) => console.error(error),
			complete: () => this.isUserFetching.set(false)
		});
	}

	onOpenAddUser() {
		this.isAddingUser = true;
	}
	onCloseAddUser() {
		this.isAddingUser = false;
	}

	onAddUser(newUser: NewUser) {
		this.isUserFetching.set(true);
		this.userService.addUser(newUser).subscribe({
			next: user => {
				this.users.set([...this.users(), user]);
			},
			complete: () => {
				this.isAddingUser = false;
				this.isUserFetching.set(false);
			},
			error: (error: Error) => {
				console.error('Error adding user:', error);
			}
		});
	}
}
