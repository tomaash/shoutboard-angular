import { Component } from '@angular/core';

@Component({
  selector: 'app-foo',
  template:
    `<div>
        <h1>{{msgs[0]}}</h1>
     </div>`
})
export class FooComponent {
  msgs = ['foo'];
}
