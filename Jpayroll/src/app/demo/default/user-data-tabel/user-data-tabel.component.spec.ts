import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDataTabelComponent } from './user-data-tabel.component';

describe('UserDataTabelComponent', () => {
  let component: UserDataTabelComponent;
  let fixture: ComponentFixture<UserDataTabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDataTabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDataTabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
