import {Component, EventEmitter, Output} from '@angular/core';
import {NewUser} from '../../models/task.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-user',
	imports: [
		FormsModule
	],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
	username: string = '';
	email: string = '';
	@Output() addUser = new EventEmitter<NewUser>();
	@Output() cancel = new EventEmitter<void>();

	onSave() {
		const newUser: NewUser = {
			username: this.username,
			email: this.email
		}
		this.addUser.emit(newUser);
	}
	onCancel() {
		this.cancel.emit();
	}
}
