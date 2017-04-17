import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams, LoadingController, Loading, AlertController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Credential } from '../../model/credential';
import { Response } from '@angular/http';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup;
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController, public authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      server: ['', Validators.required],
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.markAllAsTouched();
    if (this.loginForm.invalid) {
      this.showToastMessage('Input required');
    } else {
      let credential = this.createCredential();
      this.authService.login(credential).subscribe(
        info => this.loginSuccessful(),
        err => this.loginFailed(err)
      );
    }
  }

  createCredential(): Credential {
    let server = this.loginForm.controls['server'].value;
    let user = this.loginForm.controls['user'].value;
    let password = this.loginForm.controls['password'].value;
    return new Credential(server, user, password);
  }

  loginSuccessful() {
    this.navCtrl.setRoot(HomePage);
  }

  loginFailed(response: Response) {
    let alert = this.alertCtrl.create({
      title: 'No Connection',
      subTitle: 'Can\'t connect to server at' + 'todo',
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
      duration: 3000,
    });
    toast.present();
  }

  showErrorMessage(message: string) {
    let toast = this.toastCtrl.create({
      message: 'Enter correct credentials',
      duration: 3000,
    });
    toast.present();
  }

  markAllAsTouched() {   // TODO this.loginForm.markAsTouched (mark all as touched in a single call) did not working maybe after update to Ionic
    this.loginForm.controls['server'].markAsTouched();
    this.loginForm.controls['user'].markAsTouched();
    this.loginForm.controls['password'].markAsTouched();
  }

}
