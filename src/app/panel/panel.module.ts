import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { PanelSenhaComponent } from './panel-senha/panel-senha.component';
import { PanelGerarSenhaComponent } from './panel-gerar-senha/panel-gerar-senha.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PanelSenhaComponent,
    PanelGerarSenhaComponent
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    ReactiveFormsModule
  ]
})
export class PanelModule { }
