import { Component, OnInit } from '@angular/core';
import { NgxProgressService } from 'ngx-progress';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'NGX-PROGRESS';

  constructor(private ngxProgressService: NgxProgressService) {

  }

  ngOnInit() {
    setTimeout(() => {
      this.ngxProgressService.start('fore');
    }, 5000);

    this.ngxProgressService.startBackground();

    setTimeout(() => {
      this.ngxProgressService.stop('fore');
    }, 10000);

    setTimeout(() => {
      this.ngxProgressService.stop();
    }, 56000);
  }
}
