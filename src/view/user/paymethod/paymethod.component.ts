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
    const inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].checkValidity()) {
        return false;
      }
    }
    return true;
  }
}
