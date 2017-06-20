import { ImsLoadingError } from './../../models/errors/ims-loading-error';
import { ModelService } from './../../providers/model-service';
import { SettingService } from './../../providers/setting-service';
import { MetadataField } from './../../models/metadata-field';
import { Observable } from 'rxjs/Observable';
import { QueryFragment } from './../../models/query-fragment';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Entry } from '../../models/entry';
import { EntriesService } from './../../providers/entries-service';
import { AuthService } from './../../providers/auth-service';
import { CameraService } from '../../providers/camera-service';
import { LoadingService } from '../../providers/loading-service';
import { UploadPage } from '../upload/upload';
import { Entries } from '../../models/entries';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-entries',
  templateUrl: 'entries.html'
})
export class EntriesPage {
  entries: Entry[] = [];
  nextPage: string;
  sort: QueryFragment[] = [new QueryFragment('sort', 'IAModificationDate+desc')];
  fields: MetadataField[];
  titleField: string;
  parentImageReferenceField: string;

  constructor(public navCtrl: NavController, public entriesService: EntriesService, public authService: AuthService, public cameraService: CameraService, public loadingService: LoadingService, public settingService: SettingService, public modelService: ModelService) { }

  public takePictureForEntry(parentImageEntryId: string, entryTitle: string) {
    this.loadingService.subscribeWithLoading(
      this.cameraService.takePicture(),
      imageSrc => this.pushToUploadPageWithPicture(imageSrc, parentImageEntryId, entryTitle),
      err => this.cameraService.handleError(err));
  }

  public getGalleryPictureForEntry(parentImageEntryId: string, entryTitle: string) {
    this.loadingService.subscribeWithLoading(
      this.cameraService.getGalleryPicture(),
      imageSrc => this.pushToUploadPageWithPicture(imageSrc, parentImageEntryId, entryTitle),
      err => this.cameraService.handleError(err));
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
    this.loadingService.subscribeWithLoading(imageTableMetaData, metaData => this.parentImageReferenceField = metaData.parentReferenceField, err => { throw new ImsLoadingError('Feldinformationen', err); });
  }

  loadInitialParentImageEntries() {
    let loadParentImageEntries = this.entriesService.getParentImageEntries(this.authService.currentCredential, this.authService.filterId, this.sort);
    this.loadingService.subscribeWithLoading(loadParentImageEntries, entries => this.updateEntries(entries), err => { throw new ImsLoadingError('Einträge', err); });
  }

  ionViewWillEnter() {
    this.loadSelectedFieldsAndTitle();
  }

  loadSelectedFieldsAndTitle() {
    let metaDataFields: Observable<MetadataField[]> = this.modelService.getMetadataFieldsOfParentImageTable(this.authService.currentCredential, this.authService.archive).flatMap(tableFields => {
      this.titleField = tableFields.identifierField;
      return this.settingService.getActiveFields(this.authService.archive, tableFields);
    });
    this.loadingService.subscribeWithLoading(metaDataFields, fields => this.fields = fields, err =>  { throw new ImsLoadingError('Feldinformationen', err); });
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

  loadSettings() {
    this.navCtrl.push(SettingsPage);
  }

}
