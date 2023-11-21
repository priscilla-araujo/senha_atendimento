import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/appointment/appointment.service';
import { PanelInterface, PanelPasswordType } from '../interfaces/panel.interface';
import { PanelService } from '../panel.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { keyType } from 'src/app/shared/utils/key.util';

@Component({
  selector: 'app-panel-gerar-senha',
  templateUrl: './panel-gerar-senha.component.html',
  styleUrls: ['./panel-gerar-senha.component.scss']
})
export class PanelGerarSenhaComponent implements OnInit {

  form!: FormGroup;
  payload: PanelInterface | null = null;
 
  constructor(
    private readonly serviceAppoiments: AppointmentService,
    private readonly servicePanels: PanelService,
    private readonly fb: FormBuilder,
    private readonly store: StorageService
  ) {
    this.form = this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(4)]]
    });
  }

  ngOnInit(): void {
    this.servicePanels.getPasswords().subscribe(item => {
      const normal = item.filter(item => item.password.startsWith('A'))
      const priority = item.filter(item => item.password.startsWith('P'))

      this.store.set<PanelInterface[]>('normal', normal)
      this.store.set<PanelInterface[]>('priority', priority)
    })
  }

  gerarSenha() {
    const dataAtual = new Date();
    const { code } = this.form.value;

    this.serviceAppoiments.getByCode(code).subscribe(app => {
      const [data] = app;
      if (data && data.datetime) {
        const dataDate = new Date(data.datetime);
        if (dataDate.toDateString() === dataAtual.toDateString()) {
          this.createNextPassword(data);
        } else {
          alert('Código inválido ou a data não corresponde à data atual.');
        }
      } 
    });
  }
  
  createNextPassword({ user, datetime }: any) {
    const type = user.age >= 60 ? 'P' : 'A';

    const payload = {
      username: user.name,
      password: this.makePassword(type),
      datetime: datetime,
    }

    this.payload = payload;

    this.servicePanels.create(payload).subscribe(entity => {
      const key = keyType(type)
      const data:PanelInterface[] = this.store.get<PanelInterface>(key)
      data.push(entity)
      this.store.set<PanelInterface[]>(key, data)
    })
  }

  makePassword(type: PanelPasswordType): string {
    const key = keyType(type)
    const next = this.store.get<PanelInterface[]>(key).length + 1
    return `${type}${next.toString().padStart(3,'0')}`
  }

}