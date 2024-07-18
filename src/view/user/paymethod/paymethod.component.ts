import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { CartService } from 'src/service/cart.service';
import { VentasService } from 'src/service/ventas.service';
import { ItemsService } from 'src/service/items.service';
import { forkJoin, switchMap } from 'rxjs';

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

    const invalidStockItems = cartItems.filter(item => item.quantity > item.stock);
    if (invalidStockItems.length > 0) {
      alert('Algunos artículos en tu carrito exceden el stock disponible. Por favor ajusta las cantidades.');
      return;
    }

    const preV = {
      userId: this.getUserId(),
      fecha: new Date().toISOString()
    };

    this.ventasService.createPreV(preV).pipe(
      switchMap(preVResponse => {
        const prevId = preVResponse.prevId;

        const ventasObservables = cartItems.map((item) => {
          const updatedStock = item.stock - item.quantity;
          const venta = {
            itemsIds: [item.idItems],
            idPrev: prevId,
            total: item.price * item.quantity
          };

          console.log(venta);

          const updateStockObservable = this.itemsService.updateObject({
            ...item,
            stock: updatedStock,
          });

          return forkJoin([
            this.ventasService.createVenta(venta),
            updateStockObservable,
          ]);
        });

        return forkJoin(ventasObservables);
      })
    ).subscribe({
      next: (responses) => {
        alert('Pago realizado con éxito');
        this.cartService.clearCart();
        this.dialogRef.close();
        this.router.navigate(['/home']);
        
        responses.forEach(response => console.log('Venta creada:', response[0], 'Stock actualizado:', response[1]));
      },
      error: (err) => {
        console.error('Error al procesar el pago:', err);
        alert('Ocurrió un error al procesar tu pago.');
      },
    });
  }

  getUserId(): number {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.idUser;
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
