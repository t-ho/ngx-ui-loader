import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxUiLoaderComponent } from './ngx-ui-loader.component';
import { NgxUiLoaderHelperService } from './ngx-ui-loader-helper.service';

describe('NgxUiLoaderComponent', () => {
  let component: NgxUiLoaderComponent;
  let fixture: ComponentFixture<NgxUiLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxUiLoaderComponent ],
      providers: [
        NgxUiLoaderHelperService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxUiLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
