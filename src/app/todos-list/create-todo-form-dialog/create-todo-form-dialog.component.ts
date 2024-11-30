import { Component, inject } from '@angular/core';
import { Validators, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// Валидатор для поля 'completed'
// export function completedValidator(): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const value = control.value?.trim().toLowerCase();
//     return (value === 'yes' || value === 'no') ? null : { invalidCompleted: true };
//   };
// }

@Component({
  selector: 'app-create-todo-form-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatDialogClose],
  templateUrl: './create-todo-form-dialog.component.html',
  styleUrl: './create-todo-form-dialog.component.scss'
})
export class CreateTodoFormDialogComponent {

  readonly dialogRef = inject(MatDialogRef<CreateTodoFormDialogComponent>);

  submitForm() {
    this.dialogRef.close(this.form.value);
  }

  public form = new FormGroup({
    userId: new FormControl('', [Validators.required, Validators.minLength(1), Validators.pattern("^[0-9]*$")]),
    title: new FormControl('', [Validators.required, Validators.minLength(1), Validators.pattern("^[a-zA-Zа-яА-Я0-9.,_\\- ]*$")]),
    completed: new FormControl('', [Validators.required])
  });
}
