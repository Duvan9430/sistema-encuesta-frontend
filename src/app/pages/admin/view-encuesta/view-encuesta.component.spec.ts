import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEncuestaComponent } from './view-encuesta.component';

describe('ViewEncuestaComponent', () => {
  let component: ViewEncuestaComponent;
  let fixture: ComponentFixture<ViewEncuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEncuestaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
