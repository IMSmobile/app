import { ImageEntry } from './../../model/imageEntry';
import { UploadService } from './../../providers/upload-service';
import { AuthService } from './../../providers/auth-service';
import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NavController, LoadingController, Loading, AlertController, ToastController } from 'ionic-angular';
import { Image } from '../../model/image';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public camera: Camera, public uploadService: UploadService, public authService: AuthService, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController) { }
  private imageSrc: string;
  private imageBlob: Blob;
  private loading: Loading;

  public takePicture() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation : true
    };

    this.camera.getPicture(options).then((imageData) => {
      this.imageSrc = 'data:image/jpeg;base64,' + imageData;
      this.imageBlob = new Blob([this.fixBinary(atob(imageData))]);
    }, (err) => {
      console.warn(err);
    });
  }

  public uploadPicture() {
    this.showLoading();
    let imageEntry = new ImageEntry().set('IDFall', '20537').set('BILDNAME', 'Image from Camera');
    let image = new Image('SmartPhonePhoto.jpeg', this.imageBlob);
    this.uploadService.uploadImage(this.authService.currentCredential, 40, imageEntry, image).subscribe(
      response => {
        this.hideLoading();
        this.showToastMessage('Image successfully uploaded!');
      },
      err => {
        this.hideLoading();
        this.showAlert('Oops, something went wrong!');
        console.warn(err);
      });
  }

  private fixBinary(bin: string) {
    var length = bin.length;
    var buf = new ArrayBuffer(length);
    var arr = new Uint8Array(buf);
    for (var i = 0; i < length; i++) {
      arr[i] = bin.charCodeAt(i);
    }
    return buf;
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
