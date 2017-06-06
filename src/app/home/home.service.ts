import { Injectable } from '@angular/core';

@Injectable()
export class HomeService {
  message = 'Welcome to home page';
  counter = 0;
  increment() {
    this.counter++;
  }
}
