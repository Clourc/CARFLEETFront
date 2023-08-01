import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCancelComponent } from './reservation-cancel.component';

describe('ReservationCancelComponent', () => {
  let component: ReservationCancelComponent;
  let fixture: ComponentFixture<ReservationCancelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationCancelComponent]
    });
    fixture = TestBed.createComponent(ReservationCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
