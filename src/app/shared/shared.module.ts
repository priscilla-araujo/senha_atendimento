import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { UsersSearchComponent } from './components/users-search/users-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterInputPipe } from './pipes/filter-input.pipe';
import { InputSearchComponent } from './components/input-search/input-search.component';

@NgModule({
  declarations: [
    UsersSearchComponent,
    FilterInputPipe,
    InputSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TypeaheadModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  exports: [
    UsersSearchComponent,
    FilterInputPipe,
    InputSearchComponent
  ]
})
export class SharedModule { }
