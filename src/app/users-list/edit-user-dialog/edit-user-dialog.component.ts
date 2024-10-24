import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { UserInterface } from "../../interfaces/user-interfaces";
import { MyErrorStateMatcher } from "../../utils/error-state-matcher";
import { NgFor, NgIf } from "@angular/common";

@Component({
    selector: 'app-edit-user-dialog',
    templateUrl: './edit-user-dialog.component.html',
    styleUrl: './edit-user-dialog.component.scss',
    standalone: true,
    imports: [NgIf, NgFor, MatIconModule, MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule, MatDialogClose]
})
export class EditUserDialogComponent {
    // переменная data получает значение из метода openDialog который из компонента UserCardComponent.ts
    // MAT_DIALOG_DATA это ангуляровская штука которая достает данные из переменной data
    // которая хранит код data: { user: this.user }(код находится в компоненте UserCardComponent.ts) при открытий модалки
    readonly data = inject<{ user: UserInterface }>(MAT_DIALOG_DATA);

    readonly dialogRef = inject(MatDialogRef<EditUserDialogComponent>);

    submitForm() {
        this.dialogRef.close({ ...this.form.value, id: this.data.user.id });
    }

    public form = new FormGroup({
        // здесь через this.data вставляем определенные значения в нужные поля которые передались
        // из компонента UserCardComponent.ts и по этому при открытии модалки поля не будут пустыми и будут запонены значениями
        id: new FormControl(this.data.user.id),
        name: new FormControl(this.data.user.name, [Validators.required, Validators.minLength(2)]),
        email: new FormControl(this.data.user.email, [Validators.required, Validators.email]),
        website: new FormControl(this.data.user.website, [Validators.required, Validators.minLength(5)]),
        company: new FormGroup({
            name: new FormControl(this.data.user.company.name, [Validators.required, Validators.minLength(3)])
        })
    });

    matcher = new MyErrorStateMatcher();

    // get это специальная конструкция которая позволяет к методу или классу обращаться как к полю который будет автоматический вычисляемым в момент обращения к нему
    get userWithUpdatedFields() { // получает все данные через mat-dialog-close который навешали к кнопке button в файле edit-user-dialog.component.html
        return {
            ...this.form.value, // возвращается обновленное значение формы
            id: this.data.user.id, // так же добавляем к нему id который уже лежал в (MAT_DIALOG_DATA);
        };
    }
}