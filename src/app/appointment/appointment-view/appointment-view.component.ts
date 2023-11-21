import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../appointment.service';
import { AppointmentAndUserInterface } from '../interfaces/appointment.interface';

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.scss'],
})
export class AppointmentViewComponent implements OnInit {
  appointment!: AppointmentAndUserInterface;
  userAppointments: AppointmentAndUserInterface[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly service: AppointmentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.service.getByIdWithUser(id).subscribe((appointments) => {
      this.appointment = appointments;
      this.getAppointmentsByUser(appointments.user.id)
    });
  }

  getAppointmentsByUser(userId: number) {
    this.service.getUserAppointments(userId).subscribe((userAppointment) => {
      userAppointment.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
      this.userAppointments = userAppointment.slice(0, 3);
    });
  }
}


/* 

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    this.userService.getById(userId).subscribe(user => {
      this.user = user;
    });
  }
}

 */