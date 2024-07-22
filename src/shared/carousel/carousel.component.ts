import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  slides = [
    'https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp',
    'https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp',
    'https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp',
    'https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp'
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