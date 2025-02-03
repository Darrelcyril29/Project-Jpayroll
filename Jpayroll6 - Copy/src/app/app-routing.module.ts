// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { AuthGuard } from './demo/default/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'ClientStatus',
        loadComponent: () => import('./demo/default/client-status/client-status.component')
      },
      {
        path: 'ChangeOrder',
        loadComponent: () => import('./demo/default/change-order/change-order.component')
      },
      {
        path: 'ChangeForm',
        loadComponent: () => import('./demo/default/change-form/change-form.component')
      },
      {
        path: 'ChangeDetails',
        loadComponent: () => import('./demo/default/change-order-details/change-order-details.component')
      },
      {
        path: 'ChangeClient',
        loadComponent: () => import('./demo/default/change-client-details/change-client-details.component')
      },
      {
        path: 'ChangeLog',
        loadComponent: () => import('./demo/default/change-log/change-log.component')
      },
      {
        path: 'InsertChangeLog',
        loadComponent: () => import('./demo/default/insert-change-log/insert-change-log.component')
      },
      {
        path: 'ChangeLogDetails',
        loadComponent: () => import('./demo/default/change-log-details/change-log-details.component')
      },
      {
        path: 'InsertClient',
        loadComponent: () => import('./demo/default/insert-client/insert-client.component')
      },
      {
        path: 'ClientDetails',
        loadComponent: () => import('./demo/default/clien-details/clien-details.component')
      },
      {
        path: 'UserDataTable',
        loadComponent: () => import('./demo/default/user-data-tabel/user-data-tabel.component')
      },
      {
        path: 'InsertUser',
        loadComponent: () => import('./demo/default/insert-user/insert-user.component')
      },
      {
        path: 'UserDetails',
        loadComponent: () => import('./demo/default/user-details/user-details.component')
      },
      {
        path: 'ChangePassword',
        loadComponent: () => import('./demo/default/change-password/change-password.component')
      },
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/authentication/login/login.component')
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/authentication/register/register.component')
      },
      {
        path: 'ForgotPassword',
        loadComponent: () => import('./demo/authentication/forgot-password-form/forgot-password-form.component')
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard/default',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
