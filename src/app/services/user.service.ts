import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';

import {apiUrl} from './tools';
import {ApiResponse, UserResponse, UsersResponse, User, NewUser} from '../models/task.model';

@Injectable({
	providedIn: 'root',
	deps: [HttpClient]
})
export class UserService {
	constructor(private http: HttpClient) {}

	loadUsers(ids: number[] = []): Observable<User[]> {
		const idsStr = ids.join(',');
		const params = new HttpParams();
		if (idsStr)
			params.set('ids', idsStr);
		return this.http.get<ApiResponse<UsersResponse>>(`${apiUrl}/users`, {params}).pipe(
			map(response => response.data.users || []),
			catchError(() => {
				return throwError(() => new Error('Failed to fetch users'));
			})
		)
	}

	addUser(newUser: NewUser): Observable<User | null> {
		return this.http.post<ApiResponse<UserResponse>>(`${apiUrl}/user`, newUser).pipe(
			map(response => response.data.user),
			catchError(() => {
				return throwError(() => new Error('Failed to add user'));
			})
		)
	}
}
