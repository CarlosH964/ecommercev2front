import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cartItemCount: number = 0;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartItemsObservable().subscribe(cartItems => {
      this.cartItemCount = this.calculateCartItemCount(cartItems);
    });
  }

  private calculateCartItemCount(cartItems: any[]): number {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  navigateToLogin() {
    this.router.navigate(['/validation/login']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToCart() {
    this.router.navigate(['/home/cart']);
  }
}
