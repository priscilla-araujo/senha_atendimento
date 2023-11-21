import { Component, Input } from '@angular/core';
import { SelectFilterInterface } from '../../interfaces/select.interface';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent {

  @Input({ required: true }) options: SelectFilterInterface[] = [];
  term: string = '';
  filterBy: string = '';

}
