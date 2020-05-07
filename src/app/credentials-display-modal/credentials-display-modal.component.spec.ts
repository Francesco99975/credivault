import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsDisplayModalComponent } from './credentials-display-modal.component';

describe('CredentialsDisplayModalComponent', () => {
  let component: CredentialsDisplayModalComponent;
  let fixture: ComponentFixture<CredentialsDisplayModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredentialsDisplayModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialsDisplayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
