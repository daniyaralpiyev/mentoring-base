import { Directive, ElementRef, HostBinding, HostListener, inject } from "@angular/core";

@Directive({
    selector: '[red]', // selector задается в квадратных скобках потому что мы пользуемся им как атрибутом и html файле слово в квадратных скобках вешаем в нужном месте
    standalone: true, // standalone всегда должен быть true по умолчанию
})
export class RedDirective {
    color = 'green';
    textTransform = 'lowercase'

    // Использование @HostBinding для привязки стилей:
    @HostBinding('style.backgroundColor')
    get backgroundColor() { // get пересчитает значение this.color который будет менять на mouseenter и на mouseleave
        return this.color;
    };

    @HostBinding('style.textTransform')
    get textTransformGetter() { // get пересчитает значение this.textTransform который будет менять на mouseenter и на mouseleave
        return this.textTransform;
    };

    // Отслеживание событий с помощью @HostListener:
    @HostListener('mouseenter') // При наведений мышкой на фон наш фон будет red
    enter() { // enter будет делать определенное действие при входе в элемент
        this.color = 'red';
        this.textTransform = 'uppercase'
        console.log('red');
    }

    @HostListener('mouseleave') // Когда отводим от фона мышку наш фон будет white
    leave() { // leave будет делать определенное действие при выходе из элемента
        this.color = 'white';
        this.textTransform = 'lowercase'
        console.log('white');
    }
    // Типы директив:
    //
    // 1.Атрибутные директивы (attribute directives):
    //      Эти директивы изменяют поведение или стиль существующих элементов.
    //      Пример: ngClass, ngStyle, ngModel.
    //
    // 2.Структурные директивы (structural directives):
    //      Эти директивы добавляют или удаляют элементы из DOM на основе определенных условий.
    //      Пример: *ngIf, *ngFor, *ngSwitch.
}