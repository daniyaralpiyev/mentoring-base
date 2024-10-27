// Импортируем необходимые модули из Angular
import { Pipe, PipeTransform } from '@angular/core';

// Декоратор @Pipe, который указывает имя пайпа (используется в шаблоне HTML)
@Pipe({
    name: 'customDate', // Имя, под которым мы будем использовать пайп
    standalone: true, // Указывает, что пайп является независимым
    pure: true, // параметр pure в декораторе @Pipe указывает, является ли пайп чистым (pure: true) или нечистым (pure: false)
})
export class CustomDate implements PipeTransform {
    // valie - исходня строка
    // limit - максимальное кол-во символов
    // return возвращает обрезанную строку с троеточием, если длина превышает лимит
    transform(value: string, limit: number = 15): string {
        // Проверяем, превышает ли строка заданный лимит
        if (value.length > limit) {
            // Возвращаем обрезанную строку с добавлением троеточия используя метод slice()
            return value.slice(0, limit) + '...';
        }
        // Если строка не превышает лимит, возвращаем её как есть
        return value;
    }
}