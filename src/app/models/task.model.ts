interface ApiResponse<T> {
	status: boolean;
	message: string;
	data: T;
}

interface NewUser {
	username: string;
	email: string;
}

interface User extends NewUser{
	id: number;
	created: string | null | undefined;
	updated: string | null | undefined;
}

interface NewCategory {
	title: string;
	description: string;
	userId: number;
}

interface Category extends NewCategory {
	id: number;
	created: string | null | undefined;
	updated: string | null | undefined;
}

interface NewTask {
	title: string;
	description: string;
	categoryId: number;
}

interface Task extends NewTask {
	id: number;
	created: string | null | undefined;
	updated: string | null | undefined;
}

interface UserResponse {
	user: User | null;
}
interface UsersResponse {
	users: User[] | null;
}

interface CategoryResponse {
	category: Category | null;
}
interface CategoriesResponse {
	categories: Category[] | null;
}

export type {
	ApiResponse,
	NewUser,
	User,
	NewCategory,
	Category,
	NewTask,
	Task,
	UserResponse,
	UsersResponse,
	CategoryResponse,
	CategoriesResponse,
}
