import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserViewComponent } from './user-view/user-view.component';

const routes: Routes = [
  {
    path: 'new',
    component: UserFormComponent,
    data: {
      breadcrumb: 'Novo',
    },
  },
  {
    path: ':id/edit',
    component: UserFormComponent,
    data: {
      breadcrumb: 'Editar',
    },
  },
  {
    path: '',
    component: UserListComponent,
  },
  {
    path: ':id/view',
    component: UserViewComponent,
    data: {
      breadcrumb: 'Visualizar',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
