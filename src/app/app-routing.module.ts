import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtecRoutesGuard } from 'src/guard/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('../view/user/shadow-user.module').then(m => m.ShadowUserModule)
  },
  {
    path: 'validation',
    loadChildren: () => import('src/validation/validation.module').then(m => m.ValidationModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('../view/admin/admin.module').then(m => m.AdminModule),
    canActivate: [ProtecRoutesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
