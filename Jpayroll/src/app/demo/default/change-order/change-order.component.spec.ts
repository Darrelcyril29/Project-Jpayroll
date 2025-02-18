import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeOrderComponent } from './change-order.component';

describe('ChangeOrderComponent', () => {
  let component: ChangeOrderComponent;
  let fixture: ComponentFixture<ChangeOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
