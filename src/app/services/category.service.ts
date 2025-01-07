import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map, throwError, Observable} from 'rxjs';

import {apiUrl} from './tools';
import {ApiResponse, CategoriesResponse, Category, CategoryResponse, NewCategory} from '../models/task.model';

@Injectable({
	providedIn: 'root',
	deps: [HttpClient]
})
export class CategoryService {

	constructor(private http: HttpClient) {}

	loadCategories(ids: number[] = []) {
		const idsStr = ids.join(',');
		const params = new HttpParams();
		if (idsStr)
			params.set('ids', idsStr);
		return this.http.get<ApiResponse<CategoriesResponse>>(`${apiUrl}/categories`, {
			params,
			observe: 'response'
		}).pipe(
			map(response => response.body?.data?.categories),
			catchError(() => {
				return throwError(() => new Error('Failed to fetch categories'));
			})
		)
	}

	loadCategoriesByUserId(userId: number): Observable<Category[]> {
		const params = new HttpParams().set('userId', userId.toString());
		return this.http.get<ApiResponse<CategoriesResponse>>(`${apiUrl}/categories/user`, {
			params,
			observe: 'response'
		}).pipe(
			map(response => response.body?.data?.categories || []),
			catchError(() => {
				return throwError(() => new Error(`Failed to fetch categories using ${userId} as userId`));
			})
		);
	}

	addCategory(newCategory: NewCategory): Observable<Category | null> {
		return this.http.post<ApiResponse<CategoryResponse>>(`${apiUrl}/category`, newCategory).pipe(
			map(response => response.data.category),
			catchError(() => {
				return throwError(() => new Error('Failed to add category'));
			})
		)
	}
}
