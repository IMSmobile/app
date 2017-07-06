import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import { Image } from '../../models/image';
import { CameraService } from '../../providers/camera-service';
import { FieldValidatorService } from '../../providers/field-validator-service';
import { LoadingService } from '../../providers/loading-service';
import { SettingService } from '../../providers/setting-service';
import { Entry } from './../../models/entry';
import { ImsLoadingError } from './../../models/errors/ims-loading-error';
import { ImsUploadError } from './../../models/errors/ims-upload-error';
import { MetadataField } from './../../models/metadata-field';
import { AuthService } from './../../providers/auth-service';
import { BrowserFileuploadSelectorService } from './../../providers/browser-fileupload-selector-service';
import { DragEventService } from './../../providers/drag-event-service';
import { ModelService } from './../../providers/model-service';
import { UploadService } from './../../providers/upload-service';

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html'
})
export class UploadPage {
  image: Image;
  parentImageEntryId: string;
  fields: MetadataField[] = [];
  fieldsForm: FormGroup = new FormGroup({});
  uploadSegment: string = 'metadata';
  entryTitle: string;
  parentImageReferenceField: string;
  pictureFromCameraEnabled: boolean;
  showDragOverlay: boolean = false;
  dragEventService: DragEventService = new DragEventService();

  constructor(public navCtrl: NavController, public navParams: NavParams, public cameraService: CameraService, public uploadService: UploadService, public authService: AuthService, public loadingService: LoadingService, public toastCtrl: ToastController, public modelService: ModelService, public formBuilder: FormBuilder, public settingService: SettingService, public fieldValidatorService: FieldValidatorService, public domSanitizer: DomSanitizer, public platform: Platform, public browserFileuploadSelectorService: BrowserFileuploadSelectorService, public renderer: Renderer2) {
    this.image = navParams.get('image');
    this.parentImageEntryId = navParams.get('parentImageEntryId');
    this.entryTitle = navParams.get('entryTitle');
    this.pictureFromCameraEnabled = settingService.isPictureFromCameraEnabled();
    this.dragEventService.preventEventsOnBody(renderer);
  }

  ionViewDidLoad(): void {
    this.loadParentImageReferenceField();
    this.loadUploadFields();
  }

  loadUploadFields(): void {
    const fields: Observable<MetadataField[]> = this.modelService.getMetadataFieldsOfImageTable(this.authService.currentCredential, this.authService.archive).flatMap(tableFields => {
      const mandatoryFields: Observable<MetadataField[]> = Observable.of(tableFields.fields.filter(field => this.isMandatory(field, tableFields.parentReferenceField)));
      const activeFields: Observable<MetadataField[]> = this.settingService.getActiveFields(this.authService.archive, tableFields);
      return Observable.concat(mandatoryFields, activeFields);
    });
    this.loadingService.subscribeWithLoading(fields, newFields => this.appendFields(newFields), err => { throw new ImsLoadingError('Feldinformationen', err); });
  }

  loadParentImageReferenceField(): void {
    const imageTableMetaData = this.modelService.getMetadataFieldsOfImageTable(this.authService.currentCredential, this.authService.archive);
    this.loadingService.subscribeWithLoading(imageTableMetaData, metaData => this.parentImageReferenceField = metaData.parentReferenceField, err => { throw new ImsLoadingError('Feldinformationen', err); });
  }

  isMandatory(field: MetadataField, parentReferenceFieldName: string): boolean {
    return field.mandatory && field.name !== parentReferenceFieldName;
  }

  appendFields(fields: MetadataField[]): void {
    this.fields = this.fields.concat(fields);
    this.initFormData();
  }

  initFormData(): void {
    const formData = {};
    this.fields.forEach(field => {
      formData[field.name] = [this.getDefaultValue(field.type)];
      formData[field.name].push(Validators.compose(this.fieldValidatorService.getValidatorFunctions(field)));
    });
    this.fieldsForm = this.formBuilder.group(formData);
  }

  getDefaultValue(type: string): string {
    switch (type) {
      case 'BOOLEAN': return 'false';
      default: return '';
    }
  }

  public takePicture(): void {
    this.loadingService.subscribeWithLoading(
      this.cameraService.takePicture(),
      image => this.image = image,
      err => this.cameraService.handleError(err));
  }

  public getGalleryPicture(): void {
    if (this.platform.is('core')) {
      const fileUploadElem = document.getElementById('fileUpload');
      fileUploadElem.click();
    } else {
      this.loadingService.subscribeWithLoading(
        this.cameraService.getGalleryPicture(),
        image => this.image = image,
        err => this.cameraService.handleError(err));
    }
  }

  public uploadPicture(): void {
    this.markAllAsTouched();
    if (this.fieldsForm.invalid) {
      this.showToastMessage('Alle Felder müssen valide sein');
    } else {
      let imageEntry = new Entry().set(this.parentImageReferenceField, this.parentImageEntryId);
      this.fields.forEach(field => {
        const value = this.fieldsForm.controls[field.name].value;
        if (value) {
          imageEntry = imageEntry.set(field.name, value);
        }
      });
      this.loadingService.subscribeWithLoading(this.uploadService.uploadImage(this.authService.currentCredential, this.authService.filterId, imageEntry, this.image),
        res => this.showToastMessage('Bild wurde erfolgreich gespeichert!'),
        err => { throw new ImsUploadError(err); }
      );
    }
  }

  showToastMessage(toastMessage: string): void {
    const toast = this.toastCtrl.create({
      message: toastMessage,
      duration: 5000,
    });
    toast.present();
  }

  markAllAsTouched(): void {
    this.fields.forEach(field => this.fieldsForm.controls[field.name].markAsTouched());
  }

  getErrorMessage(formControl: FormControl): string {
    return this.fieldValidatorService.getErrorMessage(formControl);
  }

  fileSelected(event: any): void {
    const selectedImage: Image = this.browserFileuploadSelectorService.getImageFromFilePicker(event);
    if (selectedImage) {
      this.image = selectedImage;
    }
  }

  handleDragEvent(event: DragEvent): void {
    this.dragEventService.handleDragEvent(event, () => this.showDragOverlay = true, () => this.showDragOverlay = false, () => this.receiveDrop(event));
  }

  receiveDrop(event: DragEvent): void {
    this.showDragOverlay = false;
    const selectedImage: Image = this.browserFileuploadSelectorService.getImageFromFileDrop(event);
    if (selectedImage) {
      this.image = selectedImage;
    }
  }

}
