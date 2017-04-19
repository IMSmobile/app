import { ImageEntry } from './../../model/imageEntry';
import { Credential } from './../../model/credential';
import { UploadService } from './../../providers/upload-service';
import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NavController } from 'ionic-angular';
import { Image } from '../../model/image';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public camera: Camera, public uploadService: UploadService) { }
  private imageSrc: string;
  private imageBlob: Blob;

  public takePicture() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.imageSrc = 'data:image/jpeg;base64,' + imageData;
      this.imageBlob = new Blob([this.fixBinary(atob(imageData))]);
      console.log('Picture taken');
    }, (err) => {
      console.warn(err);
    });
  }

  public uploadPicture() {
    let credential = new Credential('https://sinv-56028.edu.hsr.ch', 'admin', 'admin', 'Rest Floating Client Read Write');
    let imageEntry = new ImageEntry().set('IDFall', '20537').set('BILDNAME', 'Image from App');
    let image = new Image('SmartPhonePhoto.jpeg', this.imageBlob);
    this.uploadService.uploadImage(credential, 40, imageEntry, image).subscribe(
      response => console.log(response),
      err => console.warn(err));
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

}
