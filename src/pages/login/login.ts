import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Events, NavController, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {UserProvider} from "../../providers/user/user";
import {TabsPage} from "../tabs/tabs";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    // The user fields for the login form.
    user: { email: string, password: string } = {
        email: '',
        password: ''
    };

    // Our translated text strings
    private loginErrorString: string;

    constructor(public events: Events,
                private navCtrl: NavController,
                private storage: Storage,
                private toastCtrl: ToastController,
                private translateService: TranslateService,
                private userProvider: UserProvider) {
        this.translateService.get('LOGIN_ERROR').subscribe((value) => {
            this.loginErrorString = value;
        });
    }

    // Attempt to login in through our User service
    doLogin() {
        this.storage.set('localUserCredentials', {
            email: this.user.email,
            password: this.user.password,
        })
            .then(() => {
                this.userProvider.login()
                    .then((resp) => {
                        this.storage.set('localUser', JSON.parse(resp.data)).then((date) => {
                            this.events.publish('user:login');
                            this.navCtrl.setRoot(TabsPage);
                        });
                    })
                    .catch( (error) => {
                        // Unable to log in
                        let toast = this.toastCtrl.create({
                            message: this.loginErrorString,
                            duration: 3000,
                            position: 'bottom'
                        });
                        toast.present();
                    });
            })

    }
}
