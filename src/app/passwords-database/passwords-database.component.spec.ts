import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordsDatabaseComponent } from './passwords-database.component';

describe('PasswordsDatabaseComponent', () => {
  let component: PasswordsDatabaseComponent;
  let fixture: ComponentFixture<PasswordsDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordsDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordsDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
