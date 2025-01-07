import {Component, Input} from '@angular/core';
import {Category} from '../../models/task.model';

@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
	@Input({required: true}) category!: Category;
}
