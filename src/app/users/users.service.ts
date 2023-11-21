import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserInterface } from './interfaces/user.interface';
import { AppointmentAndUserInterface } from '../appointment/interfaces/appointment.interface';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  readonly endpoint: string = 'http://localhost:3000/users';
  private users: UserInterface[] = [];

  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(this.endpoint);
  }

  getById(id: number): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.endpoint}/${id}`);
  }

  userNameExists(name: string): boolean {
    return this.users.some(user => user.name === name);
  }

  create(user: UserInterface): Observable<UserInterface> {
    if (this.userNameExists(user.name)) {
      return throwError('O nome de usuário já está em uso.');
    } else {
      return this.http.post<UserInterface>(this.endpoint, user);
    }
  }

  remove(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.endpoint}/${id}`);
  }

  update(user: UserInterface): Observable<UserInterface> {
    return this.http.put<UserInterface>(`${this.endpoint}/${user.id}`, user);
  }

  setUsers(users: UserInterface[]): void {
    this.users = users;
  }

  getUserAppointments(userId: number): Observable<AppointmentAndUserInterface[]> {
    const url = `${this.endpoint}/${userId}/appointments?_order=desc,asc&_limit=3`;
    return this.http.get<AppointmentAndUserInterface[]>(url)
  }
}
