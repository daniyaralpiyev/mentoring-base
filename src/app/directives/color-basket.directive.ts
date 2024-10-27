import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[colorBasket]',
  standalone: true,
})
export class ColorBasket {

  color = '#4c565f'

  @HostBinding('style.backgroundColor')
  get backgroundColor() {
    return this.color;
  }

  @HostListener('mouseenter')
  enter() {
    this.color = '#f0ba4e'
    console.log('ENTER');
  }

  @HostListener('mouseleave')
  leave() {
    this.color = '#4c565f';
    console.log("LEAVE");
  }
}
