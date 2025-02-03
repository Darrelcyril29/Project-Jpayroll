import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeOrderDetailsComponent } from './change-order-details.component';

describe('ChangeOrderDetailsComponent', () => {
  let component: ChangeOrderDetailsComponent;
  let fixture: ComponentFixture<ChangeOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeOrderDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
