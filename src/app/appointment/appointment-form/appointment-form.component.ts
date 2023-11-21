import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../appointment.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {
  form!: FormGroup;
  id: number | null; 
  minDate!: Date;

  datepickerConfig = { 
    withTimepicker: true,
    keepDatepickerOpened: true,
    dateInputFormat: 'DD/MM/YYYY - HH:mm'
  }

  user!:string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly appointmentService: AppointmentService,
  ) {
    const idParam = this.route.snapshot.params['id'];
    this.id = idParam ? +idParam : null;  
    this.minDate = new Date();
  }
  
  ngOnInit(): void {
    this.form = this.createForm();
    if (this.id !== null) {
      this.loadAppointment(this.id);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      userId: ['', [Validators.required]],
      especialidade: ['', [Validators.required]],
      datetime: ['', [Validators.required]],
      code: btoa(new Date().getMilliseconds() as any).toUpperCase()
    });
  }

  private loadAppointment(id: number): void {
    this.appointmentService.getByIdWithUser(id).subscribe(appointment => {
      if (appointment) {
        appointment.datetime = new Date(appointment.datetime)
        this.user = appointment.user.name
        this.form.patchValue(appointment);
      }
    });
  }
  

  action() {
    if (this.form.valid) {
      const appointmentData = this.form.value;

      if (this.id !== null) {
        this.updateAppointment(this.id, appointmentData);
      } else {
        this.createAppointment(appointmentData);
      }
    }
  }

  private createAppointment(appointmentData: any) {
    this.appointmentService.create(appointmentData).subscribe(appointment => {
      if (appointment) {
        this.router.navigate(['appointments']);
      } else {
        alert('Ocorreu um erro ao criar o agendamento. Por favor, tente novamente mais tarde.');
      }
    });
  }

  private updateAppointment(id: number, appointmentData: any) {
    const updatedAppointment = { id, ...appointmentData };
    this.appointmentService.update(updatedAppointment).subscribe(appointment => {
      if (appointment) {
        this.router.navigate(['appointments']);
      } else {
        alert('Ocorreu um erro ao atualizar o agendamento. Por favor, tente novamente mais tarde.');
      }
    });
  }

  fillUserId(id: number) {
    const userId = !id ? null : id;
    this.form.get('userId')?.setValue(userId);
  }
}
