import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastEncryptionComponent } from './fast-encryption.component';

describe('FastEncryptionComponent', () => {
  let component: FastEncryptionComponent;
  let fixture: ComponentFixture<FastEncryptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastEncryptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastEncryptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
