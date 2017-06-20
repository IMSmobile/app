import { Image } from './../../models/image';
import { ImsLoadingError } from './../../models/errors/ims-loading-error';
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
import { UploadPage } from '../upload/upload';
import { Entries } from '../../models/entries';
import { SettingsPage } from '../settings/settings';
import { LoginPage } from '../login/login';
import { Platform } from 'ionic-angular';

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
  pictureFromCameraEnabled: boolean;

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public entriesService: EntriesService, public authService: AuthService, public cameraService: CameraService, public loadingService: LoadingService, public events: Events, public settingService: SettingService, public modelService: ModelService, public platform: Platform) {
    this.pictureFromCameraEnabled = settingService.isPictureFromCameraEnabled();
  }

  public takePictureForEntry(parentImageEntryId: string, entryTitle: string) {
    this.loadingService.subscribeWithLoading(
      this.cameraService.takePicture(),
      image => this.pushToUploadPageWithPicture(image, parentImageEntryId, entryTitle),
      err => this.cameraService.handleError(err));
  }

  public getGalleryPictureForEntry(parentImageEntryId: string, entryTitle: string) {
    if (this.platform.is('core')) {
      let fileUploadElem = document.getElementById('fileUpload' + parentImageEntryId);
      fileUploadElem.click();
    } else {
      this.loadingService.subscribeWithLoading(
        this.cameraService.getGalleryPicture(),
        image => this.pushToUploadPageWithPicture(image, parentImageEntryId, entryTitle),
        err => this.cameraService.handleError(err));
    }
  }

  pushToUploadPageWithPicture(image: Image, parentImageEntryId: string, entryTitle: string) {
    this.navCtrl.push(UploadPage, { 'image': image, 'parentImageEntryId': parentImageEntryId, 'entryTitle': entryTitle });
  }

  ionViewDidLoad() {
    this.loadParentImageReferenceField();
    this.loadInitialParentImageEntries();
  }

  loadParentImageReferenceField() {
    let imageTableMetaData = this.modelService.getMetadataFieldsOfImageTable(this.authService.currentCredential, this.authService.archive);
    this.loadingService.subscribeWithLoading(imageTableMetaData, metaData => this.parentImageReferenceField = metaData.parentReferenceField, err => { throw new ImsLoadingError('Feldinformationen', err); });
  }

  loadInitialParentImageEntries() {
    let loadParentImageEntries = this.entriesService.getParentImageEntries(this.authService.currentCredential, this.authService.filterId, this.sort);
    this.loadingService.subscribeWithLoading(loadParentImageEntries, entries => this.updateEntries(entries), err => { throw new ImsLoadingError('Einträge', err); });
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
    this.loadingService.subscribeWithLoading(metaDataFields, fields => this.fields = fields, err => { throw new ImsLoadingError('Feldinformationen', err); });
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
          throw new ImsLoadingError('Einträge', err);
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

  fileSelected(event: any, parentImageEntryId: string, entryTitle: string) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      event.target.value = null;
      let image = new Image(file.name, window.URL.createObjectURL(file), file);
      this.pushToUploadPageWithPicture(image, parentImageEntryId, entryTitle);
    }
  }

}
