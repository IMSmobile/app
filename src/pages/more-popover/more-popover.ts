import { Component } from '@angular/core';
import { Events } from 'ionic-angular';

@Component({
  selector: 'more-page-popover',
  templateUrl: 'more-popover.html'
})
export class MorePopoverPage {

  constructor(public events: Events) { }

  loadSettings() {
    this.events.publish('nav:settings-page');
  }

  logoutUser() {
    this.events.publish('nav:login-page');
  }
}
