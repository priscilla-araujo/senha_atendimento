import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInterface } from '../interfaces/user.interface';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  form!: FormGroup;
  id: number;
  existingNames: string[] = []; 

  constructor(
    private readonly fb: FormBuilder,
    private readonly service: UsersService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.create();
    if (this.id) {
      this.loadUser(this.id);
    }
      this.service.getAll().subscribe(users => {
      this.existingNames = users.map(user => user.name);
    });
  }

  create() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(10), this.nameExistsValidator.bind(this)]], // Associe o validador aqui
      age: [, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  nameExistsValidator(control: AbstractControl): { [key: string]: any } | null {
    if (this.existingNames.includes(control.value)) {
      return { nameExists: true };
    }
    return null;
  }

  action() {
    if (this.id) {
      this.update();
    } else {
      this.save();
    }
  }

  save() {
    this.service.create(this.form.value).subscribe(user => {
      if (user) {
        this.form.reset();
      } else {
        alert('Ocorreu um erro ao salvar o arquivo. Por favor, tente novamente mais tarde.');
      }
    });
  }

  loadUser(id: number): void {
    this.service.getById(id).subscribe(user => {
      this.form.patchValue(user);
    });
  }

  update(): void {
    const user: UserInterface = {
      id: this.id,
      ...this.form.value
    }
    this.service.update(user).subscribe(up => {
      if (up) {
        this.router.navigate(['users']);
      } else {
        alert('Usuário não encontrado... Tente novamente mais tarde!');
      }
    });
  }
}
