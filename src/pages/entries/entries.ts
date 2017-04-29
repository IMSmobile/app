import { Component } from '@angular/core';
import { NavController, PopoverController, NavOptions, Popover } from 'ionic-angular';
import { MorePopoverPage } from '../more-popover/more-popover';
import { Entry } from '../../models/entry';
import { EntriesService } from './../../providers/entries-service';
import { AuthService } from './../../providers/auth-service';
import { CameraService } from '../../providers/camera-service';
import { LoadingService } from '../../providers/loading-service';
import { AlertService } from './../../providers/alert-service';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-entries',
  templateUrl: 'entries.html'
})
export class EntriesPage {

  entries: Entry[];

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public entriesService: EntriesService, public authService: AuthService, public cameraService: CameraService, public loadingService: LoadingService, public alertService: AlertService) { }

  public takePictureForEntry(parentImageEntryId: string) {
    this.cameraService.takePicture().subscribe(
      imageSrc => {
        this.navCtrl.push(HomePage, { 'imageSrc': imageSrc, 'parentImageEntryId': parentImageEntryId });
      },
      err => {
        console.warn(err);
      });
  }

  ionViewDidLoad() {
    this.loadingService.showLoading();
    this.entriesService.getParentImageEntries(this.authService.currentCredential, 40).subscribe(
      entries => {
        this.entries = entries.entries;
        this.loadingService.hideLoading();
      },
      err => {
        this.loadingService.hideLoading();
        this.alertService.showError('Failed to load entries');
      });
  }

  presentPopover(myEvent?: NavOptions) {
    let popover: Popover = this.popoverCtrl.create(MorePopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
