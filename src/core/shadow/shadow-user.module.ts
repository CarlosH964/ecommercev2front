import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShadowUserComponent } from './shadow-user/shadow-user.component';
import { ShowItemComponent } from './show-item/show-item.component';

const routes: Routes = [
  {
    path: '',
    component: ShadowUserComponent
  },
  {
    path: 'item/:id',
    component: ShowItemComponent
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ShowItemComponent,
    ShadowUserComponent,
    RouterModule.forChild(routes),
  ]
})
export class ShadowUserModule { }
