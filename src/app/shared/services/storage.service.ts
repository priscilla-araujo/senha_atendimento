import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storage!: Storage;
  constructor() {
    this.storage = localStorage;
  }

  set<T>(key: string, payload: T) {
    this.storage.setItem(key, this.encode(payload))
  }

  get<T>(key: string): T[] {
    return this.decode(this.storage.getItem(key));
  }

  has(key: string): boolean {
    return Object.keys(this.storage).includes(key)
  }

  clear() {
    this.storage.clear();
  }

  private encode(payload: any) {
    return JSON.stringify(payload)
  }

  private decode(payload: any){
    return JSON.parse(payload)
  }
  
}
