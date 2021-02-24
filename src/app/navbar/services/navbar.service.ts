import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  title: BehaviorSubject<string>; // this will allow us to change the title of the navbar depending on which component we are in

  constructor() {
    this.title = new BehaviorSubject('MovieNight');
  }
}
