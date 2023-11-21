import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel.component';
import { PanelSenhaComponent } from './panel-senha/panel-senha.component';
import { PanelGerarSenhaComponent } from './panel-gerar-senha/panel-gerar-senha.component';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
  },
  {
    path: 'panel-senha',
    component: PanelSenhaComponent,
    data: { breadcrumb: 'Visualizar Senhas' }
  },
  {
    path: 'panel-gerar-senha',
    component: PanelGerarSenhaComponent,
    data: { breadcrumb: 'Gerar Senha' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelRoutingModule {}
