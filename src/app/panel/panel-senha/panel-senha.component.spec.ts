import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSenhaComponent } from './panel-senha.component';

describe('PanelSenhaComponent', () => {
  let component: PanelSenhaComponent;
  let fixture: ComponentFixture<PanelSenhaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelSenhaComponent]
    });
    fixture = TestBed.createComponent(PanelSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
