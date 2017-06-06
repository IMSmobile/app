import { ModelService } from './../../providers/model-service';
import { SettingService } from './../../providers/setting-service';
import { MetadataField } from './../../models/metadata-field';
import { Observable } from 'rxjs/Observable';
import { QueryFragment } from './../../models/query-fragment';
import { Component } from '@angular/core';
import { NavController, PopoverController, Popover, Events } from 'ionic-angular';
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
  fields: MetadataField[];
  titleField: string;
  parentImageReferenceField: string;

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public entriesService: EntriesService, public authService: AuthService, public cameraService: CameraService, public loadingService: LoadingService, public alertService: AlertService, public events: Events, public settingService: SettingService, public modelService: ModelService) { }

  public takePictureForEntry(parentImageEntryId: string, entryTitle: string) {
    this.loadingService.subscribeWithLoading(
      this.cameraService.takePicture(),
      imageSrc => this.pushToUploadPageWithPicture(imageSrc, parentImageEntryId, entryTitle),
      err => this.cameraService.showAlertOnError(err));
  }

  public getGalleryPictureForEntry(parentImageEntryId: string, entryTitle: string) {
    this.loadingService.subscribeWithLoading(
      this.cameraService.getGalleryPicture(),
      imageSrc => this.pushToUploadPageWithPicture(imageSrc, parentImageEntryId, entryTitle),
      err => this.cameraService.showAlertOnError(err));
  }

  pushToUploadPageWithPicture(imageSrc: string, parentImageEntryId: string, entryTitle: string) {
    this.navCtrl.push(UploadPage, { 'imageSrc': imageSrc, 'parentImageEntryId': parentImageEntryId, 'entryTitle': entryTitle });
  }

  ionViewDidLoad() {
    this.loadParentImageReferenceField();
    this.loadInitialParentImageEntries();
  }

  loadParentImageReferenceField() {
    let imageTableMetaData = this.modelService.getMetadataFieldsOfImageTable(this.authService.currentCredential, this.authService.archive);
    this.loadingService.subscribeWithLoading(imageTableMetaData, metaData => this.parentImageReferenceField = metaData.parentReferenceField, err => this.alertService.showError('Beim Laden der Feldinformationen ist ein Fehler aufgetreten.'));
  }

  loadInitialParentImageEntries() {
    let loadParentImageEntries = this.entriesService.getParentImageEntries(this.authService.currentCredential, this.authService.filterId, this.sort);
    this.loadingService.subscribeWithLoading(loadParentImageEntries, entries => this.updateEntries(entries), err => this.alertService.showError('Beim Laden der Einträge ist ein Fehler aufgetreten.'));
  }

  ionViewWillEnter() {
    this.subscribeToEvents();
    this.loadSelectedFieldsAndTitle();
  }

  loadSelectedFieldsAndTitle() {
    let metaDataFields: Observable<MetadataField[]> = this.modelService.getMetadataFieldsOfParentImageTable(this.authService.currentCredential, this.authService.archive).flatMap(tableFields => {
      this.titleField = tableFields.identifierField;
      return this.settingService.getActiveFields(this.authService.archive, tableFields);
    });
    this.loadingService.subscribeWithLoading(metaDataFields, fields => this.fields = fields, err => this.alertService.showError('Beim Laden der Feldinformationen ist ein Fehler aufgetreten.'));
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
          this.alertService.showError('Beim Laden weiterer Einträge ist ein Fehler aufgetreten.');
        });
    }
  }

  updateEntries(entries: Entries): void {
    this.entries.push(...entries.entries);
    this.nextPage = entries.pagination.nextPage;
  }

  subscribeToEvents() {
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

  presentPopover(event) {
    this.popover = this.popoverCtrl.create(MorePopoverPage);
    this.popover.present({
      ev: event
    });
  }

}
