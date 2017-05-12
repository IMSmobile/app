import { QueryFragment } from './../../models/queryFragment';
import { Component } from '@angular/core';
import { NavController, PopoverController, NavOptions, Popover, Events } from 'ionic-angular';
import { MorePopoverPage } from '../more-popover/more-popover';
import { Entry } from '../../models/entry';
import { EntriesService } from './../../providers/entries-service';
import { AuthService } from './../../providers/auth-service';
import { CameraService } from '../../providers/camera-service';
import { LoadingService } from '../../providers/loading-service';
import { AlertService } from './../../providers/alert-service';
import { UploadPage } from '../upload/upload';
import { Entries } from '../../models/entries';
import { SettingsPage } from '../settings/settings';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-entries',
  templateUrl: 'entries.html'
})
export class EntriesPage {

  entries: Entry[] = [];
  nextPage: string;
  sort: QueryFragment[] = [new QueryFragment('sort', 'IAModificationDate+desc')];
  popover: Popover;

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public entriesService: EntriesService, public authService: AuthService, public cameraService: CameraService, public loadingService: LoadingService, public alertService: AlertService, public events: Events) { }

  public takePictureForEntry(parentImageEntryId: string) {
    this.cameraService.takePicture().subscribe(
      imageSrc => this.navCtrl.push(UploadPage, { 'imageSrc': imageSrc, 'parentImageEntryId': parentImageEntryId }),
      err => this.alertService.showError('Failed to take picture.'));
  }

  ionViewDidLoad() {
    let loadParentImageEntries = this.entriesService.getParentImageEntries(this.authService.currentCredential, 40, this.sort);
    this.loadingService.subscribeWithLoading(loadParentImageEntries, entries => this.updateEntries(entries), err => this.alertService.showError('Failed to load entries.'));
  }

  infiniteEntries(infiniteScroll) {
    if (this.nextPage == null) {
      infiniteScroll.enable(false);
    } else {
      this.entriesService.getEntries(this.authService.currentCredential, this.nextPage).subscribe(
        entries => {
          this.updateEntries(entries);
          infiniteScroll.complete();
        },
        err => {
          infiniteScroll.complete();
          this.alertService.showError('Failed to load more entries.');
        });
    }
  }

  updateEntries(entries: Entries): void {
    this.entries.push(...entries.entries);
    this.nextPage = entries.pagination.nextPage;
  }

  ionViewWillEnter() {
    this.events.subscribe('nav:settings-page', () => {
      this.popover.dismiss();
      this.navCtrl.push(SettingsPage);
    });
    this.events.subscribe('nav:login-page', () => {
      this.popover.dismiss();
      this.authService.logout();
      this.navCtrl.setRoot(LoginPage);
    });
  }

  ionViewWillLeave() {
    this.events.unsubscribe('nav:settings-page');
    this.events.unsubscribe('nav:login-page');
  }

  presentPopover(myEvent?: NavOptions) {
    this.popover = this.popoverCtrl.create(MorePopoverPage);
    this.popover.present({
      ev: myEvent
    });
  }

}
