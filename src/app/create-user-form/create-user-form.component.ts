import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MyErrorStateMatcher } from '../utils/error-state-matcher';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserInterface } from '../interfaces/user-interfaces';
import { CreateUserFormDialogComponent } from '../users-list/create-user-form-dialog/create-user-form-dialog.component';

@Component({
  selector: 'app-create-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, CreateUserFormDialogComponent],
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.scss'
})
export class CreateUserFormComponent {

  // @Output() это декоратор, который помечает свойство компонента как исходящее событие
  // new EventEmitter() это класс, который используется для создания и отправки событий
  // и здесь createUserForm передали в user-list.component.html
  @Output()
  public createUserForm = new EventEmitter();

  // подключаем к html переменную form
  // класс FormGroup обеденяет все FormControl так как FormControl это элемент класса FormGroup
  public form = new FormGroup({

    // каждую переменную класс FormControl будем передавать в файле html в тег input по названиям
    // [Validators.required] поле обязательно для заполнения
    // [Validators.email] поле ожидает обязательное заполнение c @
    // [Validators.minLength(5)] поле ожидает минимум 5 символов
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(5)]),
    website: new FormControl('', [Validators.required, Validators.minLength(5)]),
    company: new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    }),
  });

  matcher = new MyErrorStateMatcher();

  public submitForm(): void {
    // emit() используется для генерации или отправки события от дочернего компонента к родительскому.
    // Он вызывается на объекте EventEmitter, который был создан с помощью декоратора @Output().
    this.createUserForm.emit(this.form.value);
    // reset очишает форму после добавления
    this.form.reset();
  }

  @Input()
  public user!: CreateUserInterface;

  @Output()
  // используем в users-list.component.html
  editUser = new EventEmitter<CreateUserInterface>();

  // этот код взяли из сайта angular material из вкладки Dialog для диалогового окна
  // MatDialog импортировали выше из angular material и так же переменную dialog используем ниже в методе openDialog()
  readonly dialog = inject(MatDialog);


  openCreateDialog(): void {
    // EditUserDialogComponent это имя нашего компонента который сами создали
    // this.dialog.open() открывает компонент EditUserDialogComponent и внутрь передаем данные (вкратце this.dialog.open() открывает модалку)
    const dialogRef = this.dialog.open(CreateUserFormDialogComponent, {
      data: { user: this.user },
    });

    // здесь когда компонент EditUserDialogComponent будет закрываться через subscribe отлавливаем событие
    // и если во время закрытия передались данные то через emit передаем в наружний компонент
    dialogRef.afterClosed().subscribe(editResult => {
      if (editResult) {
        this.editUser.emit(editResult);
      };
    });
  }
}
