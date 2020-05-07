import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterModalComponent } from './master-modal.component';

describe('MasterModalComponent', () => {
  let component: MasterModalComponent;
  let fixture: ComponentFixture<MasterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
