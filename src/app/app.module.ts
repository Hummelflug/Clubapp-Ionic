import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {WelcomePage} from "../pages/welcome/welcome";
import {SignupPage} from "../pages/signup/signup";
import {LoginPage} from "../pages/login/login";
import { UserProvider } from '../providers/user/user';
import { Api } from '../providers/api/api';
import {HTTP} from '@ionic-native/http';
import {TabsPage} from "../pages/tabs/tabs";
import {IonicStorageModule} from "@ionic/storage";
import {NewsPage} from "../pages/news/news";
import {CalendarPage} from "../pages/calendar/calendar";
import {TeamsPage} from "../pages/teams/teams";
import { NewsProvider } from '../providers/news/news';


// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        MyApp,
        CalendarPage,
        HomePage,
        LoginPage,
        NewsPage,
        SignupPage,
        TabsPage,
        TeamsPage,
        WelcomePage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        CalendarPage,
        HomePage,
        LoginPage,
        NewsPage,
        SignupPage,
        TabsPage,
        TeamsPage,
        WelcomePage
    ],
    providers: [
        Api,
        HTTP,
        NewsProvider,
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        UserProvider,
    NewsProvider
    ]
})
export class AppModule {}
