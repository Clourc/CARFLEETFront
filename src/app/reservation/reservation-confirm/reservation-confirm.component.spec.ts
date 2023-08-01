import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationConfirmComponent } from './reservation-confirm.component';

describe('ReservationConfirmComponent', () => {
  let component: ReservationConfirmComponent;
  let fixture: ComponentFixture<ReservationConfirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationConfirmComponent]
    });
    fixture = TestBed.createComponent(ReservationConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
