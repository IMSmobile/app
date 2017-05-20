import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MetadataField } from './../../models/metadata-field';
import { ModelService } from './../../providers/model-service';
import { Entry } from './../../models/entry';
import { UploadService } from './../../providers/upload-service';
import { AuthService } from './../../providers/auth-service';
import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { Image } from '../../models/image';
import { Response } from '@angular/http';
import { CameraService } from '../../providers/camera-service';
import { LoadingService } from '../../providers/loading-service';
import { AlertService } from '../../providers/alert-service';
import { SettingService } from '../../providers/setting-service';
import { MetadataTableFields } from '../../models/metadata-table-fields';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html'
})
export class UploadPage {

  imageSrc: string;
  parentImageEntryId: string;
  filterId: number = 40;
  fields: MetadataField[] = [];
  fieldsForm: FormGroup = new FormGroup({});
  archiveName: string = 'workflow_db1';
  uploadSegment: string = 'metadata';

  constructor(public navCtrl: NavController, public navParams: NavParams, public cameraService: CameraService, public uploadService: UploadService, public authService: AuthService, public loadingService: LoadingService, public alertService: AlertService, public toastCtrl: ToastController, public modelService: ModelService, public formBuilder: FormBuilder, public settingService: SettingService) {
    this.imageSrc = navParams.get('imageSrc');
    this.parentImageEntryId = navParams.get('parentImageEntryId');
  }

  ionViewDidLoad() {
    let imageTableMetaData: Observable<MetadataTableFields> = this.modelService.getMetadataFieldsOfImageTable(this.authService.currentCredential, this.archiveName);
    let imageTableMetaDataFields: Observable<MetadataField[]> = imageTableMetaData.flatMap(tableFields => {
      let allFields: Observable<MetadataField[]> = Observable.forkJoin(tableFields.fields.map(field => this.settingService.getFieldState(this.archiveName, tableFields.name, field.name).map(active => {
        field.active = active || this.isMandatory(field, tableFields.parentReferenceField);
        return field;
      })));
      return allFields.map(this.mapActiveFields);
    });
    this.loadingService.subscribeWithLoading(imageTableMetaDataFields, fields => this.initFields(fields), err => this.alertService.showError('Beim Laden der Feldinformationen ist ein Fehler aufgetreten.'));
  }

  mapActiveFields(fields: MetadataField[]): MetadataField[] {
    return fields.filter(field => field.active);
  }

  isMandatory(field: MetadataField, parentReferenceFieldName: string): boolean {
    return field.mandatory === true && field.name !== parentReferenceFieldName;
  }

  initFields(fields: MetadataField[]) {
    this.fields = fields;
    this.initFormData();
  }

  initFormData() {
    var formData = {};
    this.fields.forEach(field => {
      formData[field.name] = [''];
      formData[field.name].push(Validators.required);
    });
    this.fieldsForm = this.formBuilder.group(formData);
  }

  public takePicture() {
    this.cameraService.takePicture().subscribe(
      imageData => this.imageSrc = imageData,
      err => this.cameraService.showAlertOnError(err));
  }

  public uploadPicture() {
    this.markAllAsTouched();
    if (this.fieldsForm.invalid) {
      this.showToastMessage('Alle Felder müssen ausgefüllt werden');
    } else {
      this.loadingService.showLoading();
      let imageEntry = new Entry().set('IDFall', this.parentImageEntryId);
      this.fields.forEach(field => {
        let value = this.fieldsForm.controls[field.name].value;
        imageEntry = imageEntry.set(field.name, value);
      });
      let image = new Image('SmartPhonePhoto.jpeg', this.imageSrc);
      this.uploadService.uploadImage(this.authService.currentCredential, this.filterId, imageEntry, image).subscribe(
        res => this.uploadSuccessful(),
        err => this.uploadFailed(err)
      );
    }
  }

  uploadSuccessful() {
    this.loadingService.hideLoading();
    this.showToastMessage('Bild wurde erfolgreich gespeichert!');
  }

  uploadFailed(err: Response) {
    this.loadingService.hideLoading();
    this.alertService.showError('Beim Speichern der Bilder ist ein Fehler aufgetreten.');
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

}

