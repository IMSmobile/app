import { ImsLoadingError } from '../../models/errors/ims-loading-error';
import { ImsServerConnectionError } from './../../models/errors/ims-server-connection-error';
import { ImsAuthenticationError } from './../../models/errors/ims-authentication-error';
import { Filter } from './../../models/filter';
import { SettingArchivePage } from './../setting-archive/setting-archive';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { SettingService } from '../../providers/setting-service';
import { Credential } from '../../models/credential';
import { Response } from '@angular/http';
import { EntriesPage } from '../entries/entries';
import { LoadingService } from '../../providers/loading-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup;
  isShowRestUrlField: boolean = true;
  version: string = '0.2.4';

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public loadingService: LoadingService, public alertCtrl: AlertController, public toastCtrl: ToastController, public authService: AuthService, public settingService: SettingService) {
    this.loginForm = this.formBuilder.group({
      server: ['', Validators.required],
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.showToastMessage('Alle Felder müssen ausgefüllt werden');
    } else {
      let credential = this.createCredential();
      this.loadingService.subscribeWithLoading(this.authService.login(credential), info => this.loginSuccessful(), err => this.loginFailed(err));
    }
  }

  createCredential(): Credential {
    let server = this.loginForm.controls['server'].value;
    let user = this.loginForm.controls['user'].value;
    let password = this.loginForm.controls['password'].value;
    return new Credential(server, user, password);
  }

  loginSuccessful() {
    let credential: Credential = this.createCredential();
    this.settingService.setRestUrl(credential.server);
    this.settingService.setUsername(credential.username);
    this.settingService.getFilter(credential.server, credential.username).subscribe(filter => this.navigateAfterLogin(filter), err => { throw new ImsLoadingError('Archiv-Einstellungen', err); } );
  }

  navigateAfterLogin(filter: Filter) {
    if (filter) {
      this.authService.setArchive(filter);
      this.navCtrl.setRoot(EntriesPage);
    } else {
      this.navCtrl.setRoot(SettingArchivePage);
    }
  }

  loginFailed(response: Response) {
    if (response.status === 401) {
      throw new ImsAuthenticationError(response);
    } else {
      throw new ImsServerConnectionError(this.loginForm.controls['server'].value, response);
    }
  }

  showToastMessage(toastMessage: string) {
    let toast = this.toastCtrl.create({
      message: toastMessage,
      duration: 3000,
    });
    toast.present();
  }

  ionViewDidLoad() {
    this.settingService.getRestUrl().subscribe(val => this.loginForm.controls['server'].setValue(val));
    this.settingService.getUsername().subscribe(val => this.loginForm.controls['user'].setValue(val));
    this.settingService.isShowRestUrlField().subscribe(val => this.isShowRestUrlField = val);
  }

}
