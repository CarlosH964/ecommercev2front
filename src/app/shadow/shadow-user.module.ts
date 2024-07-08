import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShadowUserComponent } from './shadow-user/shadow-user.component';
import { ShowItemComponent } from './show-item/show-item.component';

const routes: Routes = [
  {
    path: '',
    component: ShadowUserComponent
  }
];

@NgModule({
  declarations: [
    ShowItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ShadowUserModule { }
