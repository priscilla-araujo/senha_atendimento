import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, map, tap } from 'rxjs';
import { PanelInterface } from './interfaces/panel.interface';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  private endpoint: string = 'http://localhost:3000/panels';

  constructor(private readonly http: HttpClient) {}

  create(panel: PanelInterface): Observable<PanelInterface> {
    const endpoint = `${this.endpoint}`; 
    return this.http.post<PanelInterface>(endpoint, panel);
  }

  getPasswords():Observable<PanelInterface[]> {
    const endpoint = `${this.endpoint}`; 
    return this.http.get<PanelInterface[]>(endpoint).pipe(
      map(panel => panel.filter(item => this.diffDate(item.datetime)))
    );
  }

  private diffDate(date: Date): boolean {
    const dateParse = new Date(date).toLocaleDateString().replaceAll('/', '');
    const currentDate = new Date().toLocaleDateString().replaceAll('/','');
    return currentDate == dateParse;
  }
}
