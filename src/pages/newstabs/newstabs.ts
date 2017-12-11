import {Component} from '@angular/core';
import {MenuController} from "ionic-angular";
import {NewsPage} from "../news/news";
import {VotePage} from "../vote/vote";

@Component({
    selector: 'page-newstabs',
    templateUrl: 'newstabs.html'
})
export class NewsTabsPage {

    newsRoot: any = NewsPage;
    voteRoot: any = VotePage;

    constructor(private menuCtrl: MenuController) {

    }

    ionViewWillEnter() {
        this.menuCtrl.enable(true, 'sidemenu');
    }

}