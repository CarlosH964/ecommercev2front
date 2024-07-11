import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShadowUserComponent } from './shadow-user/shadow-user.component';
import { ShowItemComponent } from './show-item/show-item.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: '',
    component: ShadowUserComponent
  },
  {
    path: 'item/:id',
    component: ShowItemComponent
  },
  {
    path:'cart',
    component: CartComponent
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CartComponent,
    ShowItemComponent,
    ShadowUserComponent,
    RouterModule.forChild(routes),
  ]
})
export class ShadowUserModule { }
