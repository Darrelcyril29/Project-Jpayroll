import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientStatusComponent } from './client-status.component';

describe('ClientStatusComponent', () => {
  let component: ClientStatusComponent;
  let fixture: ComponentFixture<ClientStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
