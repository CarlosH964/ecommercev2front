import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ModalCreateComponent } from './modal-create/modal-create.component';
import { ModalEditComponent } from './modal-edit/modal-edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

const adminroutes: Routes = [
  {
    path: '',
    component: DashboardComponent 
  }
];


@NgModule({
  declarations: [
    DashboardComponent,
    ModalEditComponent,
    ModalCreateComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
    RouterModule.forChild(adminroutes)
  ]
})
export class AdminModule { }
