import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginLayoutComponent } from './login/layout/login-layout.component';
import { DashboardLayoutComponent } from './dashboard/layout/dashboard-layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
      path: '',
      component: LoginLayoutComponent,
      children: [{
          path: '',
          loadChildren: './login/login.module#LoginModule'
      }]
  },
  {
      path: '',
      component: DashboardLayoutComponent,
      children: [{
          path: '',
          loadChildren: './/dashboard/dashboard.module#DashboardModule'
      }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
