import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  private cartItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );

  constructor() {
    this.loadCartItemsFromStorage();
  }

  private loadCartItemsFromStorage() {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      this.cartItems = JSON.parse(savedCartItems);
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  private saveCartItemsToStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  addToCart(item: any): void {
    const existingItem = this.cartItems.find((i) => i.idItems === item.idItems);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }

    this.saveCartItemsToStorage();
    this.cartItemsSubject.next(this.cartItems);
    console.log(this.cartItems);
  }

  removeItemFromCart(item: any): void {
    const index = this.cartItems.findIndex((i) => i.idItems === item.idItems);

    if (index !== -1) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity -= 1;
      } else {
        this.cartItems.splice(index, 1);
      }

      this.saveCartItemsToStorage();
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  increaseItemCart(item: any): void {
    const index = this.cartItems.findIndex((i) => i.idItems === item.idItems);

    if (index !== -1) {
      this.cartItems[index].quantity += 1;
    } else {
      item.quantity = 1;
      this.cartItems.push(item);
    }
    this.saveCartItemsToStorage();
    this.cartItemsSubject.next(this.cartItems);
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveCartItemsToStorage();
    this.cartItemsSubject.next(this.cartItems);
  }

  getCartItemsObservable() {
    return this.cartItemsSubject.asObservable();
  }
}
