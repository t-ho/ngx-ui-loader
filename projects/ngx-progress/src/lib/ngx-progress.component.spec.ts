import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxProgressComponent } from './ngx-progress.component';
import { NgxProgressHelperService } from './ngx-progress-helper.service';

describe('NgxProgressComponent', () => {
  let component: NgxProgressComponent;
  let fixture: ComponentFixture<NgxProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxProgressComponent ],
      providers: [
        NgxProgressHelperService
      ]
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
