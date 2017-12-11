import {Component, ViewChild} from '@angular/core';
import {Config, Events, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

import {WelcomePage} from "../pages/welcome/welcome";
import {TabsPage} from "../pages/tabs/tabs";
import {ImageLoaderConfig} from "ionic-image-loader";
import {Api} from "../providers/api/api";
import {BugreportPage} from "../pages/bugreport/bugreport";
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    // A reference to the ion-nav in our component
    @ViewChild(Nav) nav: Nav;

    rootPage;

    currentUser: any;

    //menu pages
    pages: Array<{ title: string, component: any }>;

    constructor(private api: Api, private config: Config, public events: Events, private imageLoaderConfig: ImageLoaderConfig,
                platform: Platform, splashScreen: SplashScreen, statusBar: StatusBar, private storage: Storage,
                private translateService: TranslateService) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();

            splashScreen.hide();

            this.storage.get('localUser')
                .then((value) => {
                    if (value !== null && value !== undefined) {
                        this.currentUser = value;
                        this.rootPage = TabsPage;
                    } else {
                        this.rootPage = WelcomePage;
                    }
                });

        });

        events.subscribe('user:login', () => {
            this.login();
        });

        this.configureImgLoader();
        this.initTranslate();
        this.initMenu();
    }

    configureImgLoader() {
        this.imageLoaderConfig.enableDebugMode();

        this.imageLoaderConfig.setImageReturnType('base64');

        this.api.createAuthenticationHeader().then((header) => {
            this.imageLoaderConfig.setFileTransferOptions({
                trustAllHosts: true,
                headers: header
            });
        })
    }

    initTranslate() {
        // Set the default language for translation strings, and the current language.
        this.translateService.setDefaultLang('de');

        this.translateService.get(['BACK_BUTTON_TEXT']).subscribe(values => {
            this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
        });
    }

    initMenu() {
        this.pages = [
            {title: "", component: BugreportPage },
            {title: "", component: WelcomePage }
        ];

        this.translateService.get(['LOGOUT', 'BUG_REPORT_TITLE']).subscribe((values) => {
            this.pages[0].title = values['BUG_REPORT_TITLE'];
            this.pages[1].title = values['LOGOUT'];
        })
    }

    login() {
        this.configureImgLoader();
        this.storage.get('localUser')
            .then((user) => {
            this.currentUser = user;
                if (user.hasOwnProperty('currentClubsAsPlayer')) {
                    if (user.currentClubsAsPlayer.length > 0) {
                        this.storage.set('activeClubId', user.currentClubsAsPlayer[0]);
                    }
                } else if (user.hasOwnProperty('currentClubsAsCoach')) {
                    if (user.currentClubsAsCoach.length > 0) {
                        this.storage.set('activeClubId', user.currentClubsAsCoach[0]);
                    }
                }
            });
    }

    logout() {
        this.storage.remove('localUser');
        this.storage.remove('localUserCredentials');
        this.configureImgLoader();
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        if (page.component === WelcomePage) {
            this.logout();
        }
        this.nav.setRoot(page.component);
    }
}

