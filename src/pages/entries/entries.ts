import { Component, Renderer2 } from '@angular/core';
import { Platform } from 'ionic-angular';
import { InfiniteScroll, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Entries } from '../../models/entries';
import { Entry } from '../../models/entry';
import { CameraService } from '../../providers/camera-service';
import { LoadingService } from '../../providers/loading-service';
import { SettingsPage } from '../settings/settings';
import { UploadPage } from '../upload/upload';
import { ImsLoadingError } from './../../models/errors/ims-loading-error';
import { Image } from './../../models/image';
import { MetadataField } from './../../models/metadata-field';
import { QueryFragment } from './../../models/query-fragment';
import { AuthService } from './../../providers/auth-service';
import { BrowserFileuploadSelectorService } from './../../providers/browser-fileupload-selector-service';
import { DragEventService } from './../../providers/drag-event-service';
import { EntriesService } from './../../providers/entries-service';
import { ModelService } from './../../providers/model-service';
import { SettingService } from './../../providers/setting-service';

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
  pictureFromCameraEnabled: boolean;
  dragEventService: DragEventService = new DragEventService();

  constructor(public navCtrl: NavController, public entriesService: EntriesService, public authService: AuthService, public cameraService: CameraService, public loadingService: LoadingService, public settingService: SettingService, public modelService: ModelService, public platform: Platform, public browserFileuploadSelectorService: BrowserFileuploadSelectorService, public renderer: Renderer2) {
    this.pictureFromCameraEnabled = settingService.isPictureFromCameraEnabled();
    this.dragEventService.preventEventsOnBody(renderer);
  }

  public takePictureForEntry(parentImageEntryId: string, entryTitle: string): void {
    this.loadingService.subscribeWithLoading(
      this.cameraService.takePicture(),
      image => this.pushToUploadPageWithPicture(image, parentImageEntryId, entryTitle),
      err => this.cameraService.handleError(err));
  }

  public getGalleryPictureForEntry(parentImageEntryId: string, entryTitle: string): void {
    if (this.platform.is('core')) {
      const fileUploadElem = document.getElementById('fileUpload' + parentImageEntryId);
      fileUploadElem.click();
    } else {
      this.loadingService.subscribeWithLoading(
        this.cameraService.getGalleryPicture(),
        image => this.pushToUploadPageWithPicture(image, parentImageEntryId, entryTitle),
        err => this.cameraService.handleError(err));
    }
  }

  pushToUploadPageWithPicture(image: Image, parentImageEntryId: string, entryTitle: string): void {
    this.navCtrl.push(UploadPage, { image: image, parentImageEntryId: parentImageEntryId, entryTitle: entryTitle });
  }

  ionViewDidLoad(): void {
    this.loadParentImageReferenceField();
    this.loadInitialParentImageEntries();
  }

  loadParentImageReferenceField(): void {
    const imageTableMetaData = this.modelService.getMetadataFieldsOfImageTable(this.authService.currentCredential, this.authService.archive);
    this.loadingService.subscribeWithLoading(imageTableMetaData, metaData => this.parentImageReferenceField = metaData.parentReferenceField, err => { throw new ImsLoadingError('Feldinformationen', err); });
  }

  loadInitialParentImageEntries(): void {
    const loadParentImageEntries = this.entriesService.getParentImageEntries(this.authService.currentCredential, this.authService.filterId, this.sort);
    this.loadingService.subscribeWithLoading(loadParentImageEntries, entries => this.updateEntries(entries), err => { throw new ImsLoadingError('Einträge', err); });
  }

  ionViewWillEnter(): void {
    this.loadSelectedFieldsAndTitle();
  }

  loadSelectedFieldsAndTitle(): void {
    const metaDataFields: Observable<MetadataField[]> = this.modelService.getMetadataFieldsOfParentImageTable(this.authService.currentCredential, this.authService.archive).flatMap(tableFields => {
      this.titleField = tableFields.identifierField;
      return this.settingService.getActiveFields(this.authService.archive, tableFields);
    });
    this.loadingService.subscribeWithLoading(metaDataFields, fields => this.fields = fields, err => { throw new ImsLoadingError('Feldinformationen', err); });
  }

  infiniteEntries(infiniteScroll: InfiniteScroll): void {
    if (this.nextPage === undefined) {
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

  loadSettings(): void {
    this.navCtrl.push(SettingsPage);
  }

  fileSelected(event: any, parentImageEntryId: string, entryTitle: string): void {
    const selectedImage: Image = this.browserFileuploadSelectorService.getImageFromFilePicker(event);
    if (selectedImage !== undefined) {
      this.pushToUploadPageWithPicture(selectedImage, parentImageEntryId, entryTitle);
    }
  }

  handleDragEvent(event: DragEvent, parentImageEntryId?: string, entryTitle?: string): void {
    const element: Element = (event.currentTarget as Element);
    this.dragEventService.handleDragEvent(event, () => element.classList.add('drag'), () => element.classList.remove('drag'), () => this.receiveDrop(event, parentImageEntryId, entryTitle));
  }

  receiveDrop(event: DragEvent, parentImageEntryId: string, entryTitle: string): void {
    const selectedImage: Image = this.browserFileuploadSelectorService.getImageFromFileDrop(event);
    if (selectedImage !== undefined) {
      const element: Element = (event.currentTarget as Element);
      element.classList.remove('drag');
      this.pushToUploadPageWithPicture(selectedImage, parentImageEntryId, entryTitle);
    }
  }

}
