import { Component } from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';
import {SignupPage} from "../signup/signup";
import {LoginPage} from "../login/login";

@Component({
      selector: 'page-welcome',
      templateUrl: 'welcome.html'
})
export class WelcomePage {

    loginPage = LoginPage;
    signupPage = SignupPage;

    constructor(private menuCtrl: MenuController, public navCtrl: NavController) {
        this.menuCtrl.enable(false, 'sidemenu');
    }

    ionViewWillEnter() {
        this.menuCtrl.enable(false, 'sidemenu');
    }

}
