import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShadowUserComponent } from './shadow-user/shadow-user.component';
import { ShowItemComponent } from './show-item/show-item.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgIconsModule } from '@ng-icons/core';
import { featherCreditCard } from '@ng-icons/feather-icons';
import { CartComponent } from './cart/cart.component';
import { PaymethodComponent } from './paymethod/paymethod.component';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

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
    PaymethodComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CartComponent,
    ShowItemComponent,
    MatDialogModule,
    ShadowUserComponent,
    MatInputModule,
    MatFormFieldModule,
    RouterModule.forChild(routes),
    NgIconsModule.withIcons({ featherCreditCard })
  ]
})
export class ShadowUserModule { }
