import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(module => module.UsersModule),
    data: {
      breadcrumb: 'Usuários'
    }
  },
  {
    path: 'appointments',
    loadChildren: () => import('./appointment/appointment.module').then(module => module.AppointmentModule),
    data: {
      breadcrumb: 'Agendamentos'
    }
  },
  {
    path: 'panels',
    loadChildren: () => import('./panel/panel.module').then(module => module.PanelModule),
    data: {
      breadcrumb: 'Painel'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
