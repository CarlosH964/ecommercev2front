import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Serviceservice } from 'src/service/service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  ObjectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private services: Serviceservice
  ) {
    this.ObjectForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
    });
  }

  RegisterUser(){
    if (this.ObjectForm.valid){
      this.services.register(this.ObjectForm.value).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/home']);
          alert("Now you are a User");
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  navigatebacktologin() {
    this.router.navigate(['/validation/login']);
  }
}
