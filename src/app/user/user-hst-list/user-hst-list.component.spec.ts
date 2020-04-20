import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHstListComponent } from './user-hst-list.component';

describe('UserHstListComponent', () => {
  let component: UserHstListComponent;
  let fixture: ComponentFixture<UserHstListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHstListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHstListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
