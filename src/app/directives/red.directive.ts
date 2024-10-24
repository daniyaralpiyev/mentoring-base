import { Directive, ElementRef, HostBinding, HostListener, inject } from "@angular/core";

@Directive({
    selector: '[red]', // selector задается в квадратных скобках потому что мы пользуемся им как атрибутом и html файле слово в квадратных скобках вешаем в нужном месте
    standalone: true, // standalone всегда должен быть true по умолчанию
})
export class RedDirective {

    // HostListener декоратор отслеживает различные события
    // При клике в браузере на красный элемент будет выдавать DIRECTIVE CLICK
    // @HostListener('click')
    // click() {
    //     console.log("DIRECTIVE CLICK");
    // }

    // Просто при наведении в браузере на красный элемент будет выдавать Mouseenter
    // @HostListener('mouseenter')
    // mouseenter() {
    //     console.log("Mouseenter");
    // }

    color = 'green';
    textTransform = 'lowercase'

    // С помощью HostBinding и get привязываем нужные поля
    @HostBinding('style.backgroundColor')
    get backgroundColor() { // get пересчитает значение this.color который будет менять на mouseenter и на mouseleave
        return this.color;
    };

    @HostBinding('style.textTransform')
    get textTransformGetter() { // get пересчитает значение this.textTransform который будет менять на mouseenter и на mouseleave
        return this.textTransform;
    };

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
}