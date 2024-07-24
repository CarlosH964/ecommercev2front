import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationService } from 'src/service/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private service: ValidationService) {}

  email: string =  '';
  password: string = '';

  navigateToSignup() {
    this.router.navigate(['/validation/signup']);
  }

  login() {
    this.service.login(this.email, this.password).subscribe(
      (response: any) => {
        console.log('Login successful', response);
        if (response.rol === 'user') {
          this.router.navigate(['/home']);
        } else if (response.rol === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          alert('Unknown role. Please contact support.');
        }

        localStorage.setItem('user', JSON.stringify(response));
      },
      (error) => {
        console.error('Login error', error);
        alert('Login failed. Invalid email or password.');
      }
    );
  }
}
