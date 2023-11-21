import { PanelInterface } from './../interfaces/panel.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { PanelService } from '../panel.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-panel-senha',
  templateUrl: './panel-senha.component.html',
  styleUrls: ['./panel-senha.component.scss'],
})
export class PanelSenhaComponent implements OnInit, OnDestroy {
  senhasAtendidas: string[] = [];
  senhasPreferenciais: string[] = [];

  normal?: PanelInterface;
  priority?: PanelInterface;

  stackNormal: any[] = [];
  stackPriority: any[] = [];

  totalNormal: number = 0;
  totalPriority: number = 0;

  constructor(
    private readonly service: PanelService,
    private readonly store: StorageService,
  ) {}

  ngOnInit(): void {
    this.service.getPasswords().subscribe((item) => this.init(item));
  }
  
  nextNormal() {
    const senhas = this.store.get<PanelInterface>('normal');
    this.normal = senhas.shift();
    this.store.set<PanelInterface[]>('normal', senhas);
    
    if (this.senhasAtendidas.length < this.totalNormal) {
      this.stackNormal.push(this.normal?.password);
    }

    if (this.stackNormal.length > 1) {
      this.senhasAtendidas.unshift(this.stackNormal.shift());
    }
  }

  nextPriority() {
    const senhas = this.store.get<PanelInterface>('priority');
    this.priority = senhas.shift();
    this.store.set<PanelInterface[]>('priority', senhas);

    if (this.senhasPreferenciais.length < this.totalPriority) {
      this.stackPriority.push(this.priority?.password);
    }

    if (this.stackPriority.length > 1) {
      this.senhasPreferenciais.unshift(this.stackPriority.shift());
    }
  }

  limparSenhasChamadas() {
    this.senhasAtendidas = [];
    this.senhasPreferenciais = [];
    this.store.clear();
  }

  private init(item: PanelInterface[]): void {
    const normal = item.filter((item) => item.password.startsWith('A'));
    const priority = item.filter((item) => item.password.startsWith('P'));
    this.totalNormal = normal.length;
    this.totalPriority = priority.length;
    this.store.set<PanelInterface[]>('normal', normal);
    this.store.set<PanelInterface[]>('priority', priority);
  }

  ngOnDestroy(): void {
    this.store.clear();
  }
}
