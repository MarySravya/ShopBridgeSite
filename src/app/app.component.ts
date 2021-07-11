import { Component } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ShopBridge';
  isCollapsed: boolean = false;
  selectedIndex: number;
  public navbarItems: any[] = [
    { name: 'ViewItems', routeUrl: '/viewItem' },
    { name: 'AddItem', routeUrl: '/addItem' },
    { name: 'ModifyItem', routeUrl: '/modifyItem' },
    { name: 'DeleteItem', routeUrl: '/deleteItem' }
  ];
  public heroImageConfig: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    autoplay: true
  };
  public heroImageSlides = [
    "assets/images/shopping1.jpg",
    "assets/images/shopping1a.jpg"
  ];

  public setRow(_index: number) {
    this.selectedIndex = _index;
  }
}
