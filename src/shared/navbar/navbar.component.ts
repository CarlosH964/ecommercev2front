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
  username: string = '';

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartItemsObservable().subscribe(cartItems => {
      this.cartItemCount = this.calculateCartItemCount(cartItems);
    });

    const user = localStorage.getItem('user');
    console.log(user);
    if (user) {
      const userData = JSON.parse(user);
      this.username = userData.name;
    }
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

  EndSession(){
    localStorage.removeItem('user');
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
    alert("Session ended");
  }
}
