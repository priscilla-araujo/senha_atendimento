import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Observable } from 'rxjs';

import { UserInterface } from 'src/app/users/interfaces/user.interface';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.scss']
})
export class UsersSearchComponent {

  @Input({ required: false }) name: string = '';
  @Output() userSelected: EventEmitter<number> = new EventEmitter<number>();

  users$: Observable<UserInterface[]> = this.service.getAll();
  constructor(private readonly service: UsersService) {
  }

  onSelect(event: TypeaheadMatch): void {
    const {id} =  event.item;
    this.userSelected.emit(id)
  }

  typeaheadOnBlur(event: any): void {
    if(!event.value) {
      this.userSelected.emit(0)
    }
  }
}
