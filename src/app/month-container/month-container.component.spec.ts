import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthContainerComponent } from './month-container.component';

describe('MonthContainerComponent', () => {
  let component: MonthContainerComponent;
  let fixture: ComponentFixture<MonthContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
