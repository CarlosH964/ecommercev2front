import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProtecRoutesGuard {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user && user.rol === 'admin') {
      return true;
    } else {
      if (user && user.rol === 'user') {
        this.router.navigate(['/home']);
      } else {
        alert('Please Create an account.');
      }
      return false;
    }
  }
}
