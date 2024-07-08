import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { featherUser, featherUserPlus } from '@ng-icons/feather-icons';
import { NgIconsModule } from '@ng-icons/core';



const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgIconsModule.withIcons({ featherUser, featherUserPlus })
  ]
})
export class ValidationModule { }
