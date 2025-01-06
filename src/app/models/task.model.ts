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

interface Category {
	id: number;
	title: string;
	description: string;
	userId: number;
	created: string | null | undefined;
	updated: string | null | undefined;
}

interface Task {
	id: number;
	title: string;
	description: string;
	categoryId: number;
	created: string | null | undefined;
	updated: string | null | undefined;
}

interface UserResponse {
	user: User;
}
interface UsersResponse {
	users: User[];
}

export type {
	ApiResponse,
	NewUser,
	User,
	Category,
	Task,
	UserResponse,
	UsersResponse
}
