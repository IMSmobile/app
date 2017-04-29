import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, NavOptions, Popover } from 'ionic-angular';
import { MorePopoverPage } from '../more-popover/more-popover';
import { Entry } from '../../models/entry';
import { EntriesService } from './../../providers/entries-service';
import { AuthService } from './../../providers/auth-service';




@Component({
  selector: 'page-entries',
  templateUrl: 'entries.html'
})
export class EntriesPage {

  entries: Entry[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public entriesService: EntriesService, public authService: AuthService) { }

  ionViewDidLoad() {
    this.entriesService.getParentImageEntries(this.authService.currentCredential, 40).subscribe(entries => {
      this.entries = entries.entries; console.log(entries.entries);
    });
  }

  presentPopover(myEvent?: NavOptions) {
    let popover: Popover = this.popoverCtrl.create(MorePopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
