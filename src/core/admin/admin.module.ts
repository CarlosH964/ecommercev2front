import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ModalCreateComponent } from './modal-create/modal-create.component';
import { ModalEditComponent } from './modal-edit/modal-edit.component';

const adminroutes: Routes = [
  {
    path: '',
    component: DashboardComponent 
  }
];


@NgModule({
  declarations: [
    DashboardComponent,
    ModalCreateComponent,
    ModalEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(adminroutes)
  ]
})
export class AdminModule { }
