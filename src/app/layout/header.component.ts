import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RemoveDashesPipe } from '../pipes/remove-dashes.pipe';
import { ColorBasket } from '../directives/color-basket.directive';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../auth/auth.component';
import { UserService } from '../service/user.service';

const showCatalogCompany:(textMenu: string)=> string = (textMenu: string):string => textMenu;

const text:string = showCatalogCompany('О компании');

const menuItems:string[] = ['Каталог', 'Стройматериалы', ' Инструменты', ' Электрика', ' Интерьер и одежда'];

const upperCaseMenuItems:string[] = menuItems.map(
  (item:string):string => {
    return item.toUpperCase();
  }
)

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, MatButtonModule, MatIconModule, DatePipe, RemoveDashesPipe, ColorBasket, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private snackBar:MatSnackBar = inject(MatSnackBar);

  private readonly dialog:MatDialog = inject(MatDialog);

  public readonly userService:UserService = inject(UserService);

  readonly currentDate: Date = new Date();

  readonly removeDashes: RemoveDashesPipe = new RemoveDashesPipe();

  title:string = 'mentoring-first-project';

  readonly aboutCompany:string = text;

  showCatalogCompany:boolean = false;

  isUpperCase:boolean = true;

  menuItems:string[] = upperCaseMenuItems;

  changeMenuText():void {
    this.menuItems = upperCaseMenuItems.map(
      item => this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
    )

    this.isUpperCase = !this.isUpperCase;
  }

  readonly headerItem1 = 'Главная';
  readonly headerItem2 = 'О компании';
  readonly headerItem3 = 'Каталог';
  readonly headerDate = 'Дата'

  public openDialog(): void {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log('Результат подписки после Диалогового окна', result)
      if (result === 'admin') {
        this.userService.loginAsAdmin();
        this.snackBar.open('Вы зашли как Админ', 'Ok', {
          duration: 3000
        });
      } else if (result === 'user') {
        this.userService.loginAsUser();
        this.snackBar.open('Вы зашли как Пользователь!', 'Ok', {
          duration: 3000
        });
      } else return undefined;
    });
  }

  public logout() {
    if (confirm('Вы точно хотите выйти?')) {
      console.log('Сделали logout');
      return this.userService.logout();
    } else {
      return false;
    }
  }
}
