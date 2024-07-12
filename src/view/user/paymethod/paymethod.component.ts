import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { CartService } from 'src/service/cart.service';
import { VentasService } from 'src/service/ventas.service';
import { ItemsService } from 'src/service/items.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-paymethod',
  templateUrl: './paymethod.component.html',
  styleUrls: ['./paymethod.component.css']
})
export class PaymethodComponent {

  cardNumber: string = '';
  expirationDate: string = '';
  cvv: string = '';
  cardholderName: string = '';

  constructor(
    private router: Router, 
    private dialogRef: MatDialogRef<PaymethodComponent>,
    private cartService: CartService,
    private ventasService: VentasService,
    private itemsService: ItemsService
  ) { }

  Pay(): void {
    const cartItems = this.cartService.getCartItems();

    // Validate stock before proceeding
    const invalidStockItems = cartItems.filter(item => item.quantity > item.stock);
    if (invalidStockItems.length > 0) {
      alert('Some items in your cart exceed the available stock. Please adjust the quantities.');
      return;
    }

    const ventasObservables = cartItems.map((item) => {
      const updatedStock = item.stock - item.quantity;
      const venta = {
        objectId: item.objectId,
        name: item.name,
        description: item.description,
        customer: this.cardholderName,
        price: item.price,
        stock: item.quantity,
        img: item.img,
      };

      const updateStockObservable = this.itemsService.updateObject({
        ...item,
        stock: updatedStock,
      });

      return forkJoin([
        this.ventasService.createVenta(venta),
        updateStockObservable,
      ]);
    });

    forkJoin(ventasObservables).subscribe({
      next: () => {
        alert('Payment Successful');
        this.cartService.clearCart();
        this.dialogRef.close();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error processing payment:', err);
        alert('An error occurred while processing your payment.');
      },
    });
  }
  
  isValidForm(): boolean {
    return !!(this.cardNumber && this.expirationDate && this.cvv && this.cardholderName);
  }
  

  validateNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let values = input.value.replace(/\D/g, '');
    input.value = values;
  }

  formatCardNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    value = value.match(/.{1,4}/g)?.join('-') ?? value;
    input.value = value;
  }
}
