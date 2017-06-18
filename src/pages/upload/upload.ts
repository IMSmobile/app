import { ImsUploadError } from './../../models/errors/ims-upload-error';
import { ImsLoadingError } from './../../models/errors/ims-loading-error';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MetadataField } from './../../models/metadata-field';
import { ModelService } from './../../providers/model-service';
import { Entry } from './../../models/entry';
import { UploadService } from './../../providers/upload-service';
import { AuthService } from './../../providers/auth-service';
import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { Image } from '../../models/image';
import { CameraService } from '../../providers/camera-service';
import { LoadingService } from '../../providers/loading-service';
import { SettingService } from '../../providers/setting-service';
import { FieldValidatorService } from '../../providers/field-validator-service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/concat';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public cameraService: CameraService, public uploadService: UploadService, public authService: AuthService, public loadingService: LoadingService, public toastCtrl: ToastController, public modelService: ModelService, public formBuilder: FormBuilder, public settingService: SettingService, public fieldValidatorService: FieldValidatorService) {
    this.image = navParams.get('image');
    this.parentImageEntryId = navParams.get('parentImageEntryId');
    this.entryTitle = navParams.get('entryTitle');
  }

  ionViewDidLoad() {
    this.loadParentImageReferenceField();
    this.loadUploadFields();
  }

  loadUploadFields() {
    let fields: Observable<MetadataField[]> = this.modelService.getMetadataFieldsOfImageTable(this.authService.currentCredential, this.authService.archive).flatMap(tableFields => {
      let mandatoryFields: Observable<MetadataField[]> = Observable.of(tableFields.fields.filter(field => this.isMandatory(field, tableFields.parentReferenceField)));
      let activeFields: Observable<MetadataField[]> = this.settingService.getActiveFields(this.authService.archive, tableFields);
      return Observable.concat(mandatoryFields, activeFields);
    });
    this.loadingService.subscribeWithLoading(fields, newFields => this.appendFields(newFields), err => { throw new ImsLoadingError('Feldinformationen', err); });
  }

   loadParentImageReferenceField() {
    let imageTableMetaData = this.modelService.getMetadataFieldsOfImageTable(this.authService.currentCredential, this.authService.archive);
    this.loadingService.subscribeWithLoading(imageTableMetaData, metaData => this.parentImageReferenceField = metaData.parentReferenceField, err => { throw new ImsLoadingError('Feldinformationen', err); });
  }

  isMandatory(field: MetadataField, parentReferenceFieldName: string): boolean {
    return field.mandatory === true && field.name !== parentReferenceFieldName;
  }

  appendFields(fields: MetadataField[]) {
    this.fields = this.fields.concat(fields);
    this.initFormData();
  }

  initFormData() {
    let formData = {};
    this.fields.forEach(field => {
      formData[field.name] = [''];
      formData[field.name].push(Validators.compose(this.fieldValidatorService.getValidatorFunctions(field)));
    });
    this.fieldsForm = this.formBuilder.group(formData);
  }

  public takePicture() {
    this.loadingService.subscribeWithLoading(
      this.cameraService.takePicture(),
      image => this.image = image,
      err => this.cameraService.handleError(err));
  }

  public getGalleryPicture() {
    this.cameraService.getGalleryPicture().subscribe(
      image => this.image = image,
      err => this.cameraService.handleError(err));
  }

  public uploadPicture() {
    this.markAllAsTouched();
    if (this.fieldsForm.invalid) {
      this.showToastMessage('Alle Felder müssen valide sein');
    } else {
      let imageEntry = new Entry().set(this.parentImageReferenceField, this.parentImageEntryId);
      this.fields.forEach(field => {
        let value = this.fieldsForm.controls[field.name].value;
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

  showToastMessage(toastMessage: string) {
    let toast = this.toastCtrl.create({
      message: toastMessage,
      duration: 5000,
    });
    toast.present();
  }

  markAllAsTouched() {
    this.fields.forEach(field => this.fieldsForm.controls[field.name].markAsTouched());
  }

  getErrorMessage(formControl: FormControl): string {
    return this.fieldValidatorService.getErrorMessage(formControl);
  }
}
