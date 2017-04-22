import { ImageEntry } from './../../models/imageEntry';
import { UploadService } from './../../providers/upload-service';
import { AuthService } from './../../providers/auth-service';
import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NavController, LoadingController, Loading, AlertController, ToastController } from 'ionic-angular';
import { Image } from '../../models/image';
import { Response } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public camera: Camera, public uploadService: UploadService, public authService: AuthService, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController) { }
  imageSrc: string;
  loading: Loading;
  filterId: number = 40;

  public takePicture() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {
      this.imageSrc = imageData;
    }, (err) => {
      console.warn(err);
    });
  }

  public uploadPicture() {
    this.showLoading();
    let imageEntry = new ImageEntry().set('IDFall', '20537').set('BILDNAME', 'Image from Camera');
    let image = new Image('SmartPhonePhoto.jpeg', this.imageSrc);
    this.uploadService.uploadImage(this.authService.currentCredential, this.filterId, imageEntry, image).subscribe(
      res => this.uploadSuccessful(),
      err => this.uploadFailed(err)
    );
  }

  uploadSuccessful() {
    this.hideLoading();
    this.showToastMessage('Image successfully uploaded!');
  }

  uploadFailed(err: Response) {
    this.hideLoading();
    this.showAlert('Oops, something went wrong!');
    console.warn(err);
  }

  showAlert(message: string) {
    let alert = this.alertCtrl.create({
      title: 'Failed',
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }

  showToastMessage(toastMessage: string) {
    let toast = this.toastCtrl.create({
      message: toastMessage,
      duration: 5000,
    });
    toast.present();
  }
}
