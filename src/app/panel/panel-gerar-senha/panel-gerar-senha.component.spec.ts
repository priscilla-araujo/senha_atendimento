import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelGerarSenhaComponent } from './panel-gerar-senha.component';

describe('PanelGerarSenhaComponent', () => {
  let component: PanelGerarSenhaComponent;
  let fixture: ComponentFixture<PanelGerarSenhaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelGerarSenhaComponent]
    });
    fixture = TestBed.createComponent(PanelGerarSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
