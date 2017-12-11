import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule} from '@angular/core';
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
import {ClubbookPage} from "../pages/clubbook/clubbook";
import {IonicImageLoader} from "ionic-image-loader";
import {NewsTabsPage} from "../pages/newstabs/newstabs";
import {VotePage} from "../pages/vote/vote";
import { VoteProvider } from '../providers/vote/vote';
import {NewsdetailPage} from "../pages/newsdetail/newsdetail";
import {VotedetailPage} from "../pages/votedetail/votedetail";
import { TeamProvider } from '../providers/team/team';
import {TeamMemberPage} from "../pages/teammember/teammember";
import {TeamnewsPage} from "../pages/teamnews/teamnews";
import { CalendarProvider } from '../providers/calendar/calendar';
import { BugreportProvider } from '../providers/bugreport/bugreport';
import {BugreportPage} from "../pages/bugreport/bugreport";
import {AutosizeDirective} from "../directives/autosize/autosize";
import {EventsComponent} from "../components/events/events";
import {VotesComponent} from "../components/votes/votes";
import {NewsComponent} from "../components/news/news";


// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AutosizeDirective,
        MyApp,
        BugreportPage,
        CalendarPage,
        ClubbookPage,
        EventsComponent,
        HomePage,
        LoginPage,
        NewsComponent,
        NewsPage,
        NewsdetailPage,
        NewsTabsPage,
        SignupPage,
        TabsPage,
        TeamMemberPage,
        TeamnewsPage,
        TeamsPage,
        VotePage,
        VotedetailPage,
        VotesComponent,
        WelcomePage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicImageLoader.forRoot(),
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
        BugreportPage,
        CalendarPage,
        ClubbookPage,
        HomePage,
        LoginPage,
        NewsPage,
        NewsdetailPage,
        NewsTabsPage,
        SignupPage,
        TabsPage,
        TeamMemberPage,
        TeamnewsPage,
        TeamsPage,
        VotePage,
        VotedetailPage,
        WelcomePage
    ],
    providers: [
        Api,
        BugreportProvider,
        CalendarProvider,
        HTTP,
        NewsProvider,
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        UserProvider,
        VoteProvider,
        TeamProvider
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
