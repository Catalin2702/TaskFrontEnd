import {Component, inject, OnInit, signal} from '@angular/core';

import {UsersComponent} from './components/users/users.component';
import {AddUserComponent} from './components/users/add-user.component';
import {CategoriesComponent} from './components/categories/categories.component';
import {UserService} from './services/user.service';
import {NewUser, User, Category} from './models/task.model';
import {CategoryService} from './services/category.service';

@Component({
	selector: 'app-root',
	imports: [UsersComponent, AddUserComponent, CategoriesComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
	title = 'Tasks FrontEnd';
	isAddingUser: boolean = false;
	categoryService: CategoryService = inject(CategoryService);
	userService: UserService = inject(UserService);

	users = signal<User[]>([]);
	selectedUserId = signal<number | undefined>(undefined);
	isUserFetching = signal<boolean>(false);

	categories = signal<Category[]>([]);
	selectedCategoryId = signal<number | undefined>(undefined);
	isCategoryFetching = signal<boolean>(false);

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
				if (users) {
					this.users.set(users);
					if (users.length)
						this.selectedUserId.set(users[0].id);
				}
				else {
					this.users.set([]);
					this.selectedUserId.set(undefined);
				}
			},
			complete: () => {
				this.isUserFetching.set(false)
				this.loadUserCategories();
			},
			error: (error: Error) => console.error(error)
		});
	}

	loadUserCategories() {
		this.isCategoryFetching.set(true);
		if (!this.selectedUserId())
			return;
		this.categoryService.loadCategoriesByUserId(this.selectedUserId() || 0).subscribe({
			next: categories => {
				if (categories) {
					this.categories.set(categories);
					if (categories.length)
						this.selectedCategoryId.set(categories[0].id);
					else
						this.selectedCategoryId.set(undefined);
				}
			},
			complete: () => this.isCategoryFetching.set(false),
			error: (error: Error) => console.error(error),
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
				if (user)
					this.users.set([...this.users(), user]);
			},
			complete: () => {
				this.isAddingUser = false;
				this.isUserFetching.set(false);
			},
			error: (error: Error) => console.error(error),
		});
	}

	onSelectUser(id: number) {
		this.selectedUserId.set(id);
		this.loadUserCategories();
	}
}
