import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { SettingService } from '../../providers/setting-service';

import { Credential } from '../../models/credential';
import { Response } from '@angular/http';
import { EntriesPage } from '../entries/entries';
import { LoadingService } from '../../providers/loading-service';
import { AlertService } from '../../providers/alert-service';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup;
  isShowRestUrlField: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public loadingService: LoadingService, public alertCtrl: AlertController, public toastCtrl: ToastController, public authService: AuthService, public settingService: SettingService, public alertService: AlertService) {
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
      this.loadingService.showLoading();
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
    this.loadingService.hideLoading();
    this.settingService.setRestUrl(this.loginForm.controls['server'].value);
    this.settingService.setUsername(this.loginForm.controls['user'].value);
    this.navCtrl.setRoot(EntriesPage);
  }

  loginFailed(response: Response) {
    this.loadingService.hideLoading();
    if (response.status === 401) {
      this.alertService.showError('Can\'t login with current credential');
    } else {
      this.alertService.showError('Can\'t connect to rest server at ' + this.loginForm.controls['server'].value);
    }
  }

  showToastMessage(toastMessage: string) {
    let toast = this.toastCtrl.create({
      message: toastMessage,
      duration: 3000,
    });
    toast.present();
  }

  markAllAsTouched() {   // TODO this.loginForm.markAsTouched (mark all as touched in a single call) did not working maybe after update to Ionic
    this.loginForm.controls['server'].markAsTouched();
    this.loginForm.controls['user'].markAsTouched();
    this.loginForm.controls['password'].markAsTouched();
  }

  ionViewDidLoad() {
    this.settingService.getRestUrl().subscribe(val => this.loginForm.controls['server'].setValue(val));
    this.settingService.getUsername().subscribe(val => this.loginForm.controls['user'].setValue(val));
    this.settingService.isShowRestUrlField().subscribe(val => this.isShowRestUrlField = val);
  }

}
