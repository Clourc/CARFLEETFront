import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSuccessDialogComponent } from './delete-success-dialog.component';

describe('DeleteSuccessDialogComponent', () => {
  let component: DeleteSuccessDialogComponent;
  let fixture: ComponentFixture<DeleteSuccessDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteSuccessDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
