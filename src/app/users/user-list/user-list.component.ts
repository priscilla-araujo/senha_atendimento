import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { UserInterface } from '../interfaces/user.interface';
import { map } from 'rxjs/operators'; 
// ... outras importações

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users$: Observable<UserInterface[]> = this.service.getAll();
  filteredUsers$: Observable<UserInterface[]> | undefined;
  selectedUserId: number | null = null;
  searchText: string = '';

  constructor(private readonly service: UsersService) {}

  ngOnInit(): void {
    this.filteredUsers$ = this.users$.pipe(
      map(users => users.sort((a, b) => a.name.localeCompare(b.name)))
    );
  }

  remove(id: number): void {
    this.service.remove(id).subscribe(
      () => {
        console.log('Usuário removido com sucesso.');
        this.users$ = this.service.getAll();
        this.filterUsers();
      },
    );
  }

  onSearchChange(event: any) {
    this.searchText = event.target.value;
    this.filterUsers();
  }

  filterUsers() {
    this.filteredUsers$ = this.users$.pipe(
      map(users => users.filter(user => user.name.toLowerCase().includes(this.searchText.toLowerCase())))
    );
  }
}
