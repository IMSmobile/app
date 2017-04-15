import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.loginForm = this.formBuilder.group({
      url: ['', Validators.required],
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.markAllAsTouched();
    if (this.loginForm.invalid) {
      let toast = this.toastCtrl.create({
        message: 'Enter correct credentials',
        duration: 3000,
      });
      toast.present();
    } else {
      let url = this.loginForm.controls['url'].value;
      let alert = this.alertCtrl.create({
        title: 'No Connection',
        subTitle: 'Can\'t connect to server at' + url,
        buttons: ['Dismiss']
      });
      alert.present();

    }

  }

  markAllAsTouched() {
    this.loginForm.controls['url'].markAsTouched();
    this.loginForm.controls['user'].markAsTouched();
    this.loginForm.controls['password'].markAsTouched();
  }

}
