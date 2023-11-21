import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { AppointmentViewComponent } from './appointment-view/appointment-view.component';

const routes: Routes = [
  {
    path: '',
    component: AppointmentListComponent
  },
  {
    path: 'new',
    component: AppointmentFormComponent,
    data: { breadcrumb: 'Novo' }
  },
  {
    path: ':id/edit',
    component: AppointmentFormComponent,
    data: { breadcrumb: 'Editar' }
  },
  {
    path: ':id/view',
    component: AppointmentViewComponent,
    data: {breadcrumb: 'Visualizar'}
  },
  {
    path: ':id',
    component: AppointmentViewComponent,
    data: { breadcrumb: 'Visualizar' }
  }
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
