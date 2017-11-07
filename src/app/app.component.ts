import {Component, ViewChild} from '@angular/core';
import {Config, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

import {WelcomePage} from "../pages/welcome/welcome";
import {TabsPage} from "../pages/tabs/tabs";
import {NewsPage} from "../pages/news/news";
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    // A reference to the ion-nav in our component
    @ViewChild(Nav) nav: Nav;

    rootPage;

    //menu pages
    pages: Array<{ title: string, component: any }>;

    constructor(private config: Config, platform: Platform, splashScreen: SplashScreen, statusBar: StatusBar,
                private storage: Storage, private translateService: TranslateService) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();

            splashScreen.hide();

            this.storage.get('localUser')
                .then((value) => {
                    if (value !== null && value !== undefined) {
                        this.rootPage = TabsPage;
                    } else {
                        this.rootPage = WelcomePage;
                    }
                });

        });
        this.initTranslate();
        this.initMenu();
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
            {title: "", component: WelcomePage }
        ];

        this.translateService.get('LOGOUT').subscribe((value) => {
            this.pages[0].title = value;
        })
    }

    logout() {
        this.storage.remove('localUser');
        this.storage.remove('localUserCredentials');
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

