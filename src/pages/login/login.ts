import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';




@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
    this.loginForm = this.formBuilder.group({
      url: ['', Validators.required],
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    let loader = this.loadingCtrl.create({
      content: "Connecting to IMS Server",
      duration: 3000
    });
    loader.present();
  }

}
