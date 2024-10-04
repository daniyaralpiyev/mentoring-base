import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss',
    standalone: true,
    imports: []
})
export class UserCardComponent {
    // @Input() user_input: any - это входное свойство для получения данных
    @Input()
    user_input: any;

    // @Output() — декоратор, используемый для создания событий
    @Output()
    // EventEmitter — это класс Angular, он же обработчик события который создает событие
    deleteUser_card = new EventEmitter(); // deleteUser_card используем в файле html и в файле html закидываем в круглые скобки(deleteUser_card)="здесь он будет вызывать другую переменную"

    // onDeleteUser используем в файле html user-card.component.html
    onDeleteUser(userId: number) {
        // emit() выбрасывает и запускает событие и передаёт данные через userId родительскому компоненту.
        this.deleteUser_card.emit(userId);
    }
}