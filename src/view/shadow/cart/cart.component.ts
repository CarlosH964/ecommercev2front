import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/service/cart.service';
import { SharedModule } from 'src/shared/shared.module';
import { CommonModule } from '@angular/common';

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

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0);
  }
}
