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
      this.ngxProgressService.start('fgb');
      console.log('1000 start fgb');
    }, 1000);

    console.log('000 start bga');
    this.ngxProgressService.startBackground('bga');

    setTimeout(() => {
      this.ngxProgressService.start('fgc');
      console.log('3000 start fgc');
    }, 3000);

    setTimeout(() => {
      this.ngxProgressService.stop('fgc');
      console.log('15000 stop fgc');
    }, 15000);

    setTimeout(() => {
      this.ngxProgressService.stop('fgb');
      console.log('22000 stop fgb');
    }, 22000);

    setTimeout(() => {
      this.ngxProgressService.stopBackground('bga');
      console.log('35000 stop bga');
    }, 35000);
  }
}
