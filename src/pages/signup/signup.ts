import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {AlertController, Events, NavController, ToastController} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {UserProvider} from "../../providers/user/user";
import {TabsPage} from "../tabs/tabs";

@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignupPage {

    user: { firstname: string, lastname: string, gender: string, email: string, password: string,
            repeatedPassword: string, birthday: string, phone: string, street: string, postcode: string,
            city: string, userRole: any, agbAccepted: boolean } = {
        firstname: undefined,
        lastname: undefined,
        gender: undefined,
        email: undefined,
        password: undefined,
        repeatedPassword: undefined,
        birthday: undefined,
        phone: undefined,
        street: undefined,
        postcode: undefined,
        city: undefined,
        userRole: [],
        agbAccepted: false,
    };

    // Our translated text strings
    private signUpErrorFirstName: string;
    private signUpErrorLastName: string;
    private signUpErrorGender: string;
    private signUpErrorEmail: string;
    private signUpErrorPassword: string;
    private signUpErrorBirthday: string;
    private signUpErrorPhone: string;
    private signUpErrorStreet: string;
    private signUpErrorPostcode: string;
    private signUpErrorCity: string;
    private signUpErrorUserRole: string;
    private signUpErrorAGB: string;
    private signUpError: string;

    private AGBTitle: string;
    private AGBText: string;
    private OkText: string;

    constructor(private alertCtrl: AlertController, public events: Events, private storage: Storage,
                private navCtrl: NavController, private userProvider: UserProvider, private toastCtrl: ToastController,
                private translateService: TranslateService) {

        this.translateService.get(['SIGNUP_ERROR_FIRST_NAME', 'SIGNUP_ERROR_LAST_NAME', 'SIGNUP_ERROR_GENDER',
            'SIGNUP_ERROR_EMAIL', 'SIGNUP_ERROR_PASSWORD', 'SIGNUP_ERROR_BIRTHDAY', 'SIGNUP_ERROR_PHONE',
            'SIGNUP_ERROR_STREET', 'SIGNUP_ERROR_POSTCODE', 'SIGNUP_ERROR_CITY', 'SIGNUP_ERROR_USER_ROLE',
            'SIGNUP_ERROR_AGB', 'SIGNUP_ERROR', 'AGB_TITLE', 'AGB_TEXT', 'OK_BUTTON'])
                .subscribe((values) => {
                    this.signUpErrorFirstName = values['SIGNUP_ERROR_FIRST_NAME'];
                    this.signUpErrorLastName = values['SIGNUP_ERROR_LAST_NAME'];
                    this.signUpErrorGender = values['SIGNUP_ERROR_GENDER'];
                    this.signUpErrorEmail = values['SIGNUP_ERROR_EMAIL'];
                    this.signUpErrorPassword = values['SIGNUP_ERROR_PASSWORD'];
                    this.signUpErrorBirthday = values['SIGNUP_ERROR_BIRTHDAY'];
                    this.signUpErrorPhone = values['SIGNUP_ERROR_PHONE'];
                    this.signUpErrorStreet = values['SIGNUP_ERROR_STREET'];
                    this.signUpErrorPostcode = values['SIGNUP_ERROR_POSTCODE'];
                    this.signUpErrorCity = values['SIGNUP_ERROR_CITY'];
                    this.signUpErrorUserRole = values['SIGNUP_ERROR_USER_ROLE'];
                    this.signUpErrorAGB = values['SIGNUP_ERROR_AGB'];
                    this.signUpError = values['SIGNUP_ERROR'];

                    this.AGBTitle = values['AGB_TITLE'];
                    this.AGBText = values['AGB_TEXT'];
                    this.OkText = values['OK_BUTTON'];
        });
    }

    doSignUp() {
        console.log(this.user);
        if (this.validInputs()) {
            this.storage.set('localUserCredentials', {
                email: this.user.email,
                password: this.user.password,
            })
                .then(() => {
                    this.userProvider.signUpBasicUser({
                        lastName: this.user.lastname,
                        firstName: this.user.firstname,
                        birthday: this.user.birthday,
                        email: this.user.email,
                        password: this.user.password,
                        gender: this.user.gender,
                        phone: this.user.phone,
                        street: this.user.street,
                        postcode: this.user.postcode,
                        city: this.user.city,
                        userRoles: [this.user.userRole]
                    })
                        .then((resp) => {
                            console.log(resp);
                            this.storage.set('localUser', JSON.parse(resp.data)).then((date) => {
                                this.events.publish('user:login');
                                this.navCtrl.setRoot(TabsPage);
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                            // Unable to log in
                            this.showSignUpError(this.signUpError);
                        });
                });
        }
    }

    showAGB() {
        //TODO: maybe use modal instead
        let alert = this.alertCtrl.create({
            title: this.AGBTitle,
            subTitle: this.AGBText,
            buttons: [this.OkText]
        });
        alert.present();
    }

    showSignUpError(errorMsg: string) {
        let toast = this.toastCtrl.create({
            message: errorMsg,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }

    validInputs() {
        if (this.user.firstname === undefined || this.user.firstname === '' || this.user.firstname.length < 1) {
            this.showSignUpError(this.signUpErrorFirstName);
            return false;
        }
        if (this.user.lastname === undefined || this.user.lastname === '' || this.user.lastname.length < 1) {
            this.showSignUpError(this.signUpErrorLastName);
            return false;
        }
        if (this.user.gender === undefined) {
            this.showSignUpError(this.signUpErrorGender);
            return false;
        }
        if (this.user.email === undefined) {
            var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!emailPattern.test(this.user.email)) {
                this.showSignUpError(this.signUpErrorEmail);
                return false;
            }
        }
        if (this.user.password === undefined || this.user.password !== this.user.repeatedPassword
            || this.user.password.length < 8) {
            this.showSignUpError(this.signUpErrorPassword);
            return false;
        }
        if (this.user.birthday === undefined) {
            this.showSignUpError(this.signUpErrorBirthday);
            return false;
        }
        if (this.user.phone === undefined || this.user.phone === '' || this.user.phone.length < 1) {
            this.showSignUpError(this.signUpErrorPhone);
            return false;
        }
        if (this.user.street === undefined || this.user.street === '' || this.user.street.length < 1) {
            this.showSignUpError(this.signUpErrorStreet);
            return false;
        }
        if (this.user.postcode === undefined || this.user.postcode === '' || this.user.postcode.length < 1) {
            this.showSignUpError(this.signUpErrorPostcode);
            return false;
        }
        if (this.user.city === undefined || this.user.city === '' || this.user.city.length < 1) {
            this.showSignUpError(this.signUpErrorCity);
            return false;
        }
        if (this.user.userRole === undefined) {
            this.showSignUpError(this.signUpErrorUserRole);
            return false;
        }
        if (this.user.agbAccepted === false) {
            this.showSignUpError(this.signUpErrorAGB);
            return false;
        }
        return true;
    }
}
