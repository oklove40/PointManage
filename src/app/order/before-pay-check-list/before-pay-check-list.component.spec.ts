import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforePayCheckListComponent } from './before-pay-check-list.component';

describe('BeforePayCheckListComponent', () => {
  let component: BeforePayCheckListComponent;
  let fixture: ComponentFixture<BeforePayCheckListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeforePayCheckListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeforePayCheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
