import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { CartService } from 'src/service/cart.service';
import { VentasService } from 'src/service/ventas.service';
import { ItemsService } from 'src/service/items.service';
import { forkJoin, switchMap, Observable } from 'rxjs';

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

  //obtener items del carrito
  Pay(): void {
    const cartItems = this.cartService.getCartItems();
    //valida que haya stock en todos los productos del carrito
    if (this.isStockInvalid(cartItems)){
      alert('Algunos artículos en tu carrito exceden el stock disponible. Por favor ajusta las cantidades.');
      return;
    }

    //crea la preventa
    const preV = this.createPreV();

    //llama a la funcion processpayment para realizar la venta.
    this.processPayment(preV, cartItems).subscribe({
      //limpiar el carrito y actualiza el stock
      next: () => this.handleSuccess(),
      error: (err) => this.handleError(err),
    });
  }

  //verifica el stock de los productos del carrito si son suficientes a lo solicitado
  private isStockInvalid(cartItems: any[]): boolean {
    return cartItems.some(item => item.quantity > item.stock);
  }

  private createPreV(): { userId: number, fecha: string } {
    return {
      userId: this.getUserId(),
      fecha: new Date().toISOString()
    };
  }

  //crea la pre venta y combina los observables usando forkJoin
  private processPayment(preV: { userId: number, fecha: string }, cartItems: any[]): Observable<any[]> {
    return this.ventasService.createPreV(preV).pipe(
      switchMap(preVResponse => {
        const prevId = preVResponse.prevId;
        const ventasObservables = cartItems.map(item => this.createVentaAndUpdateStock(item, prevId));
        return forkJoin(ventasObservables);
      })
    );
  }
    
  private createVentaAndUpdateStock(item: any, prevId: number): Observable<any[]> {
    const updatedStock = item.stock - item.quantity;
    const venta = {
      itemsIds: [item.idItems],
      idPrev: prevId,
      total: item.price * item.quantity
    };

    const updateStockObservable = this.itemsService.updateObject({
      ...item,
      stock: updatedStock,
    });

    return forkJoin([
      this.ventasService.createVenta(venta),
      updateStockObservable,
    ]);
  }

  private handleSuccess(): void {
    alert('Pago realizado con éxito');
    this.cartService.clearCart();
    this.dialogRef.close();
    this.router.navigate(['/home']);
  }

  private handleError(error: any): void {
    console.error('Error al procesar el pago:', error);
    alert('Ocurrió un error al procesar tu pago.');
  }

  private getUserId(): number {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.idUser;
  }
  
  isValidForm(): boolean {
    return !!(this.cardNumber && this.expirationDate && this.cvv && this.cardholderName);
  }
  
  validateNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = this.formatInput(input.value, /\D/g);
  }

  formatCardNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = this.formatInput(input.value, /\D/g, 4, '-');
  }

  private formatInput(value: string, regex: RegExp, groupSize?: number, delimiter?: string): string {
    let formattedValue = value.replace(regex, '');
    if (groupSize && delimiter) {
      formattedValue = formattedValue.match(new RegExp(`.{1,${groupSize}}`, 'g'))?.join(delimiter) ?? formattedValue;
    }
    return formattedValue;
  }
}
