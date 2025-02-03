import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeClientDetailsComponent } from './change-client-details.component';

describe('ChangeClientDetailsComponent', () => {
  let component: ChangeClientDetailsComponent;
  let fixture: ComponentFixture<ChangeClientDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeClientDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeClientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
