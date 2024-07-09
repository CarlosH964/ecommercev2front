import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('../core/shadow/shadow-user.module').then(m => m.ShadowUserModule)
  },
  {
    path: 'validation',
    loadChildren: () => import('./validation/validation.module').then(m => m.ValidationModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('../core/admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
