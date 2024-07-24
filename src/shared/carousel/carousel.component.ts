import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  slides = [
    'https://dlcdnwebimgs.asus.com/gain/7E72AA02-81DF-43E9-B823-CB3DD30A2413',
    'https://lzd-img-global.slatic.net/g/p/518794fda461319627b5431524af3027.png_2200x2200q80.png_.webp',
    'https://cdn.cs.1worldsync.com/syndication/mediaserverredirect/7b324aca2aebba07c7d26fe54e6172e0/original.jpg',
  ];
  slideInterval: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  get translateX(): string {
    return `-${this.currentIndex * 100}%`;
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.slides.length - 1;
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex < this.slides.length - 1) ? this.currentIndex + 1 : 0;
  }

  startAutoSlide(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000); // Cambia de slide cada 3 segundos
  }

  stopAutoSlide(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }
}