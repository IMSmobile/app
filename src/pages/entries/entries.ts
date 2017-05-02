import { QueryFragment } from './../../models/queryFragment';
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
import { Entries } from '../../models/entries';

@Component({
  selector: 'page-entries',
  templateUrl: 'entries.html'
})
export class EntriesPage {

  entries: Entry[] = [];
  nextPage: string;
  sort: QueryFragment[] = [new QueryFragment('sort', 'IACreationDate+desc')];

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public entriesService: EntriesService, public authService: AuthService, public cameraService: CameraService, public loadingService: LoadingService, public alertService: AlertService) { }

  public takePictureForEntry(parentImageEntryId: string) {
    this.cameraService.takePicture().subscribe(
      imageSrc => this.navCtrl.push(HomePage, { 'imageSrc': imageSrc, 'parentImageEntryId': parentImageEntryId }),
      err => this.alertService.showError('Failed to take picture.'));
  }

  ionViewDidLoad() {
    this.loadingService.showLoading();
    this.entriesService.getParentImageEntries(this.authService.currentCredential, 40, this.sort).subscribe(
      entries => {
        this.updateEntries(entries);
        this.loadingService.hideLoading();
      },
      err => {
        this.loadingService.hideLoading();
        this.alertService.showError('Failed to load entries.');
      });
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


  presentPopover(myEvent?: NavOptions) {
    let popover: Popover = this.popoverCtrl.create(MorePopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
