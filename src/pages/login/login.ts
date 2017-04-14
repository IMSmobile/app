import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';



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
    console.log(this.loginForm.value)
  }

}
