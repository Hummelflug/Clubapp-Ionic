import {Component} from '@angular/core';
import {HomePage} from "../home/home";
import {MenuController } from "ionic-angular";
import {TeamsPage} from "../teams/teams";
import {CalendarPage} from "../calendar/calendar";
import {ClubbookPage} from "../clubbook/clubbook";
import {NewsTabsPage} from "../newstabs/newstabs";

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html'
})
export class TabsPage {
    homeRoot: any = HomePage;
    teamRoot: any = TeamsPage;
    calendarRoot: any = CalendarPage;
    newsTabsRoot: any = NewsTabsPage;
    clubBookRoot: any = ClubbookPage;

    constructor(private menuCtrl: MenuController) {
    }

    ionViewWillEnter() {
        this.menuCtrl.enable(true, 'sidemenu');
    }

}