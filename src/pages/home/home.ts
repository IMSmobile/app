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

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  imageSrc: string;
  parentImageEntryId: string;
  filterId: number = 40;


  constructor(public navCtrl: NavController, public navParams: NavParams, public cameraService: CameraService, public uploadService: UploadService, public authService: AuthService, public loadingService: LoadingService, public alertService: AlertService, public toastCtrl: ToastController) {
    this.imageSrc = navParams.get('imageSrc');
    this.parentImageEntryId = navParams.get('parentImageEntryId');
  }

  public takePicture() {
    this.cameraService.takePicture().subscribe(
      imageData => this.imageSrc = imageData,
      err => this.alertService.showError('Failed to take picture.'));
  }

  public uploadPicture() {
    this.loadingService.showLoading();
    let imageEntry = new Entry().set('IDFall', this.parentImageEntryId).set('BILDNAME', 'Image from Camera');
    let image = new Image('SmartPhonePhoto.jpeg', this.imageSrc);
    this.uploadService.uploadImage(this.authService.currentCredential, this.filterId, imageEntry, image).subscribe(
      res => this.uploadSuccessful(),
      err => this.uploadFailed(err)
    );
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
}

