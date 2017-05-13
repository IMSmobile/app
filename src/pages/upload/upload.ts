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
  uploadSegment: string;
  archiveName: string = 'workflow_db1';

  constructor(public navCtrl: NavController, public navParams: NavParams, public cameraService: CameraService, public uploadService: UploadService, public authService: AuthService, public loadingService: LoadingService, public alertService: AlertService, public toastCtrl: ToastController, public modelService: ModelService, public formBuilder: FormBuilder, public settingService: SettingService) {
    this.imageSrc = navParams.get('imageSrc');
    this.parentImageEntryId = navParams.get('parentImageEntryId');
    this.uploadSegment = 'metadata';
  }

  ionViewDidLoad() {
    this.loadingService.showLoading();
    this.modelService.getMetadataFieldsOfImageTable(this.authService.currentCredential, this.archiveName).subscribe(
      tableFields => {
        this.fields = tableFields.fields.filter(field => field.mandatory === true && field.name !== tableFields.parentReferenceField);
        this.addAdditionalFields(tableFields);
        this.initFormData();
        this.loadingService.hideLoading();
      },
      err => {
        this.loadingService.hideLoading();
        this.alertService.showError('Failed to load metadata fields.');
      });
  }

  addAdditionalFields(tableFields: MetadataTableFields) {
    tableFields.fields.forEach(field => this.settingService.getFieldState(this.archiveName, tableFields.name, field.name).subscribe(active => {
      if (active) {
        this.fields.push(field);
        this.initFormData();
      }
    }));
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
      imageData => {
        this.imageSrc = imageData;
      },
      err => this.alertService.showError('Failed to take picture.'));
  }

  public uploadPicture() {
    this.markAllAsTouched();
    if (this.fieldsForm.invalid) {
      this.showToastMessage('Invalid input');
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
    this.showToastMessage('Image successfully uploaded!');
  }

  uploadFailed(err: Response) {
    this.loadingService.hideLoading();
    this.alertService.showError('Failed to upload image.');
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

