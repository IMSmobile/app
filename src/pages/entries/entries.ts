import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, NavOptions, Popover } from 'ionic-angular';
import { MorePopoverPage } from '../more-popover/more-popover';


@Component({
  selector: 'page-entries',
  templateUrl: 'entries.html'
})
export class EntriesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) { }



  presentPopover(myEvent?: NavOptions ) {
    let popover: Popover = this.popoverCtrl.create(MorePopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
