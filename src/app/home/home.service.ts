import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class HomeService {
  message = 'Welcome to home page'
  counterSubject = new BehaviorSubject(0)
  // Computed property can serve as basis for further computed properties
  counterMessage = new BehaviorSubject('')
  constructor() {
    // Manually subscribe to each subject that couterMessage depends on
    this.counterSubject.subscribe(this.recomputeCounterMessage)
  }

  // Needs to have bound this
  private recomputeCounterMessage = (x) => {
    console.log('recompute counterMessage!')
    this.counterMessage.next(`${x} ${x === 1 ? 'click' : 'clicks'} since last visit`)
  }

  increment() {
    this.counterSubject.next(this.counterSubject.getValue() + 1)
  }

}
