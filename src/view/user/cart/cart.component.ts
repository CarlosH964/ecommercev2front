import { Component, OnInit, inject } from '@angular/core';
import { CartService } from 'src/service/cart.service';
import { SharedModule } from 'src/shared/shared.module';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PaymethodComponent } from '../paymethod/paymethod.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [SharedModule, CommonModule]
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  total: number = 0;
  readonly dialog = inject(MatDialog);

  constructor(private cartService: CartService){}

  ngOnInit(){
    this.cartItems = this.cartService.getCartItems(); 
    this.calculateTotal();
  }

  removeItemFromCart(item: any) {
    this.cartService.removeItemFromCart(item);
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  increaseItemFromCart(item: any) {
    this.cartService.increaseItemCart(item);
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  MethodPay(): void {
    if (this.isLoggedIn()) {
      this.dialog.open(PaymethodComponent, {
        width: 'fullscreen'
      }).afterClosed();
    } else {
      alert('Please Log in or Register to shop at Materia Store.');
    }
  }
}
