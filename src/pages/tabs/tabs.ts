import {Component} from '@angular/core';
import {HomePage} from "../home/home";
import {MenuController} from "ionic-angular";
import {NewsPage} from "../news/news";
import {TeamsPage} from "../teams/teams";
import {CalendarPage} from "../calendar/calendar";

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html'
})
export class TabsPage {
    homeRoot: any = HomePage;
    teamRoot: any = TeamsPage;
    calendarRoot: any = CalendarPage;
    newsRoot: any = NewsPage;

    constructor(private menuCtrl: MenuController) {
    }

    ionViewWillEnter() {
        this.menuCtrl.enable(true, 'sidemenu');
    }

}