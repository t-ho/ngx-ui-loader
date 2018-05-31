import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxUiLoaderComponent } from './ngx-ui-loader.component';
import { NgxUiLoaderService } from './ngx-ui-loader.service';

describe('NgxUiLoaderComponent', () => {
  let component: NgxUiLoaderComponent;
  let fixture: ComponentFixture<NgxUiLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxUiLoaderComponent ],
      providers: [
        NgxUiLoaderService
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
