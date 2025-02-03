import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertChangeLogComponent } from './insert-change-log.component';

describe('InsertChangeLogComponent', () => {
  let component: InsertChangeLogComponent;
  let fixture: ComponentFixture<InsertChangeLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertChangeLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertChangeLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
