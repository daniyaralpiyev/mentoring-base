import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'customUpperCase', // это имя используем в файле html
    standalone: true, // этот свойство всегда вписываем по дефолту чтобы не было ошибок
    pure: true, //
})
export class CustomUpperCasePipe implements PipeTransform {
    // Когда имплементриуем определенный метод на примере PipeTransform то должны реализовать все его свойства
    transform(test: string): string {
        return test.toUpperCase();
    }

}