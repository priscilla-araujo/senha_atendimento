import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { UserInterface } from '../interfaces/user.interface';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  user: UserInterface = { id: 0, name: '', age: 0, email: '' }; 
  userAppointments: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UsersService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    this.userService.getById(userId).subscribe(user => {
      this.user = user;
      this.getAppointmentsByUser(userId)
    });
  }

  getAppointmentsByUser(userId: number) {
    this.userService.getUserAppointments(userId).subscribe((userAppointment) => {
    this.userAppointments = userAppointment;
    });
  }
}

