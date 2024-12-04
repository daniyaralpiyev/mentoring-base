import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { UserInterface } from "../../interfaces/user-interfaces";
import { MyErrorStateMatcher } from "../../utils/error-state-matcher";
import { NgIf } from "@angular/common";

@Component({
    selector: 'app-edit-user-dialog',
    templateUrl: './edit-user-dialog.component.html',
    styleUrl: './edit-user-dialog.component.scss',
    standalone: true,
    imports: [NgIf, MatIconModule, MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule, MatDialogClose]
})
export class EditUserDialogComponent {
    // переменная data получает значение из метода openDialog который из компонента UserCardComponent.ts
    // MAT_DIALOG_DATA это ангуляровская штука которая достает данные из переменной data
    // которая хранит код data: { user: this.user }(код находится в компоненте UserCardComponent.ts) при открытий модалки
    public readonly data = inject<{ user: UserInterface }>(MAT_DIALOG_DATA);

    public readonly dialogRef = inject(MatDialogRef<EditUserDialogComponent>);

    public submitForm() {
        this.dialogRef.close({ ...this.form.value, id: this.data.user.id });
    }

    public form = new FormGroup({
        // здесь через this.data вставляем определенные значения в нужные поля которые передались
        // из компонента UserCardComponent.ts и по этому при открытии модалки поля не будут пустыми и будут запонены значениями
        id: new FormControl(this.data.user.id),
        name: new FormControl(this.data.user.name, [Validators.required, Validators.minLength(2)]),
        email: new FormControl(this.data.user.email, [Validators.required, Validators.email]),
        website: new FormControl(this.data.user.website, [Validators.required, Validators.minLength(3)]),
        company: new FormGroup({
            name: new FormControl(this.data.user.company.name, [Validators.required, Validators.minLength(3)])
        })
    });

    public matcher = new MyErrorStateMatcher();
}