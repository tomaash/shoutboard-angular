import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  model = {
    name: 'foo',
    alterEgo: 'bar',
    power: 'Super Hot'
  };
  powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];
  onSubmit() {
    console.log(this.model);
  }
}
