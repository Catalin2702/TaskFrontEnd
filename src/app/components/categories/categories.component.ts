import {Component, Input} from '@angular/core';

import {CategoryComponent} from './category.component';
import {Category} from '../../models/task.model';

@Component({
	selector: 'app-categories',
	imports: [CategoryComponent],
	templateUrl: './categories.component.html',
	styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
	@Input({required: true}) categories!: Category[];
	@Input({required: true}) selectedCategoryId!: number | undefined;
	@Input() isFetching: boolean = false;
}
