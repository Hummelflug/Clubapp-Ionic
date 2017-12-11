import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {NewsProvider} from "../../providers/news/news";
import {TranslateService} from "@ngx-translate/core";
import {VoteProvider} from "../../providers/vote/vote";

@Component({
    selector: 'page-teamnews',
    templateUrl: 'teamnews.html'
})
export class TeamnewsPage {

    private team: any;

    public teamNews: Array<any>;
    public teamVotes: Array<any>;

    // Our translated text strings
    private loadingNewsErrorString: string;
    private loadingVotesErrorString: string;

    constructor(public navCtrl: NavController, private navParams: NavParams,
                private newsProvider: NewsProvider, private translateService: TranslateService,
                private toastCtrl: ToastController, private voteProvider: VoteProvider) {
        this.translateService.get(['LOADING_NEWS_ERROR', 'LOADING_VOTES_ERROR']).subscribe((values) => {
            this.loadingNewsErrorString = values['LOADING_NEWS_ERROR'];
            this.loadingVotesErrorString = values['LOADING_VOTES_ERROR'];

        });

        this.team = this.navParams.get('teamJson');
    }

    doRefresh(refresher) {
        this.loadTeamNews().then((teamNews) => {
            this.teamNews = teamNews;
            this.loadTeamVotes().then((teamVotes) => {
                this.teamVotes = teamVotes;
                refresher.complete();
            });
        });
    }

    ionViewWillEnter() {
        this.loadTeamNews().then((teamNews) => {
            this.teamNews = teamNews;
        });
        this.loadTeamVotes().then((teamVotes) => {
            this.teamVotes = teamVotes;
        });
    }

    loadTeamNews() {
        return this.newsProvider.getSingleTeamNews(this.team.id)
            .then((resp) => {
                return JSON.parse(resp.data);
            })
            .catch((error) => {
                let toast = this.toastCtrl.create({
                    message: this.loadingNewsErrorString,
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
                return [];
            });
    }

    loadTeamVotes() {
        return this.voteProvider.getRecentSingleTeamVotes(this.team.id)
            .then((resp) => {
                return JSON.parse(resp.data);
            })
            .catch((error) => {
                let toast = this.toastCtrl.create({
                    message: this.loadingVotesErrorString,
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
                return [];
            });
    }

}
