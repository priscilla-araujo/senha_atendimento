import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../appointment.service';
import { AppointmentAndUserInterface } from '../interfaces/appointment.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectFilterInterface } from 'src/app/shared/interfaces/select.interface';
import { PanelService } from 'src/app/panel/panel.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss'],
})
export class AppointmentListComponent implements OnInit {
  appointments: AppointmentAndUserInterface[] = [];
  filteredAppointments: AppointmentAndUserInterface[] = [];
  form!: FormGroup;
  filterBy: SelectFilterInterface[] = [
    {
      key: 'username',
      value: 'Nome'
    }, 
    {
      key:'especialidade',
      value: 'Especialidade'
    },
    {
      key:'datetime',
      value:'Data'
    }
  ]
  
  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
    private readonly panelService: PanelService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadAppointments();
  }

  initForm(): void {
    this.form = new FormGroup({
      search: new FormControl(''),
    });

    this.form.valueChanges.subscribe(() => {
      this.filterAppointments();
    });
  }

  filterAppointments(): void {
    const searchTerm = this.form.value.search.toLowerCase();
  
    this.filteredAppointments = this.appointments.filter(appointment => {
      const nameIncludes = appointment.user.name.toLowerCase().includes(searchTerm);
      const especialidadeIncludes = appointment.especialidade.toLowerCase().includes(searchTerm);
  
      const datetimeString = this.formatDate(appointment.datetime);
      const datetimeIncludes = datetimeString.includes(searchTerm('/', ''));
  
      return nameIncludes || especialidadeIncludes || datetimeIncludes;
    });
  }
  

  formatDate(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  editAppointment(id: number): void {
    this.router.navigate(['/appointments', id, 'edit']);
  }

  loadAppointments(): void {
    this.appointmentService.getAllWithUser().subscribe((appointments) => {
      this.appointments = appointments.sort((a, b) => {
        const dateA = new Date(a.datetime);
        const dateB = new Date(b.datetime);
        return dateA.getTime() - dateB.getTime();
      }).map(item => ({
        ...item,
        username: item.user.name
      }));

      const currentDate = new Date();
      this.appointments = this.appointments.sort((a, b) => {
        const dateA = new Date(a.datetime);
        const dateB = new Date(b.datetime);

        if (dateA.getTime() === dateB.getTime()) {
          return 0;
        }

        return dateA.getTime() < dateB.getTime() ? 1 : -1;
      });

      this.filteredAppointments = [...this.appointments]; 
      this.filterAppointments();
    });
  }

  deleteAppointment(id: number): void {
    this.appointmentService.remove(id).subscribe((success) => {
      if (success) {
        this.appointments = this.appointments.filter((app) => app.id !== id);
        this.filterAppointments();
        this.panelService.getPanelByAppointment(id).subscribe(p => {
          if(p) {
            this.panelService.removeByAppointment(id)
          }
        })
      } else {
        console.error('Falha ao remover o agendamento.');
      }
    });
  }

  onAppointmentCreated(appointment: AppointmentAndUserInterface) {
    this.appointments.push(appointment);
    this.filterAppointments(); 
  }
}
