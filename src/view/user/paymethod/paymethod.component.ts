import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { CartService } from 'src/service/cart.service';

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
    private cartService: CartService
  ) { }

  Pay(): void {
    alert('Payment Successful');
    this.cartService.clearCart();
    this.dialogRef.close();
    this.router.navigate(['/home']);
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
