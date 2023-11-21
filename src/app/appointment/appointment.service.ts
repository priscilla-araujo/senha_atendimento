import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppointmentAndUserInterface, AppointmentInterface } from './interfaces/appointment.interface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private readonly endpoint: string = 'http://localhost:3000/appointments';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<AppointmentInterface[]> {
    return this.http.get<AppointmentInterface[]>(this.endpoint);
  }

  getAllWithUser(): Observable<AppointmentAndUserInterface[]> {
    const url = `${this.endpoint}?_expand=user`
    return this.http.get<AppointmentAndUserInterface[]>(url);
  }

  getById(id: number): Observable<AppointmentInterface> {
    return this.http.get<AppointmentInterface>(`${this.endpoint}/${id}`);
  }

  getByIdWithUser(id: number): Observable<AppointmentAndUserInterface> {
    const url = `${this.endpoint}/${id}?_expand=user`
    return this.http.get<AppointmentAndUserInterface>(url);
  }

  getByCode(code: string): Observable<AppointmentAndUserInterface[]> {
    const url = `${this.endpoint}?code=${code}&_expand=user`
    return this.http.get<AppointmentAndUserInterface[]>(url);
  }

  getUserAppointments(userId: number): Observable<AppointmentAndUserInterface[]> {
    const url = `${this.endpoint}?userId=${userId}`;
    return this.http.get<AppointmentAndUserInterface[]>(url);
  }
  
  create(appointment: AppointmentInterface): Observable<AppointmentInterface> {
    return this.http.post<AppointmentInterface>(this.endpoint, appointment);
  }

  update(appointment: AppointmentInterface): Observable<AppointmentInterface> {
    return this.http.put<AppointmentInterface>(`${this.endpoint}/${appointment.id}`, appointment);
  }

  remove(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.endpoint}/${id}`);
  }
}
