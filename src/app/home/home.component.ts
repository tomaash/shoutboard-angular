import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [
    HomeService
  ]
})

export class HomeComponent {
  constructor(
    public homeService: HomeService,
    public appService: AppService,
  ) { }
}
