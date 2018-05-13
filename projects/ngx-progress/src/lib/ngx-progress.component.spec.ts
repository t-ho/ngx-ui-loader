import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxProgressComponent } from './ngx-progress.component';

describe('NgxProgressComponent', () => {
  let component: NgxProgressComponent;
  let fixture: ComponentFixture<NgxProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
