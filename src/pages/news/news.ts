import { Component } from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {NewsProvider} from "../../providers/news/news";
import { Storage } from '@ionic/storage';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'page-news',
    templateUrl: 'news.html'
})
export class NewsPage {

    private clubId: number;
    private departmentIdsQuery: string;
    private teamIdsQuery: string;

    public clubNews: Array<any>;
    public departmentNews: Array<any>;
    public teamNews: Array<any>;

    // Our translated text strings
    private loadingNewsErrorString: string;

    constructor(public navCtrl: NavController, private newsProvider: NewsProvider, private storage: Storage,
                private translateService: TranslateService, private toastCtrl: ToastController) {
        this.translateService.get('LOADING_NEWS_ERROR').subscribe((value) => {
            this.loadingNewsErrorString = value;
        });
    }

    doRefresh(refresher) {
        this.loadClubNews().then((clubNews) => {
            this.clubNews = clubNews;
            this.loadDepartmentNews().then((departmentNews) => {
                this.departmentNews = departmentNews;
                this.loadTeamNews().then((teamNews) => {
                    this.teamNews = teamNews;
                    refresher.complete();
                });
            });
        });
    }

    ionViewWillEnter() {
        this.storage.get('activeClubId')
            .then((clubId) => {
                this.clubId = clubId;
                this.loadClubNews().then((clubNews) => {
                    this.clubNews = clubNews;
                });
                this.initDepartmentNews().then((departmentNews) => {
                    this.departmentNews = departmentNews;
                });
                this.initTeamNews().then((teamNews) => {
                    this.teamNews = teamNews;
                });
            });
    }

    initDepartmentNews() {
        this.departmentIdsQuery = '';
        return this.storage.get('localUser')
            .then((user) => {
                if (user.hasOwnProperty('currentDepartments')) {
                    for (let i in user.currentDepartments) {
                        this.departmentIdsQuery += ('departmentids=' + user.currentDepartments[i] + '&');
                    }
                    return this.loadDepartmentNews();
                }
            });
    }

    initTeamNews() {
        this.teamIdsQuery = '';
        return this.storage.get('localUser')
            .then((user) => {
                if (user.hasOwnProperty('currentTeamsAsPlayer')) {
                    for (let i in user.currentTeamsAsPlayer) {
                        this.teamIdsQuery += ('teamids=' + user.currentTeamsAsPlayer[i] + '&');
                    }
                }
                if (user.hasOwnProperty('currentTeamsAsCoach')) {
                    for (let i in user.currentTeamsAsCoach) {
                        this.teamIdsQuery += ('teamids=' + user.currentTeamsAsCoach[i] + '&');
                    }
                }
                if (user.hasOwnProperty('currentTeamsAsPlayer') || user.hasOwnProperty('currentTeamsAsCoach')) {
                    return this.loadTeamNews();
                }
            });
    }

    loadClubNews() {
        return this.newsProvider.getClubNews(this.clubId)
            .then((resp) => {
                return JSON.parse(resp.data);
            })
            .catch((error) => {
                console.log(error);
                let toast = this.toastCtrl.create({
                    message: this.loadingNewsErrorString,
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
                return [];
            });
    }

    loadDepartmentNews() {
        return this.newsProvider.getDepartmentNews(this.clubId, this.departmentIdsQuery)
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

    loadTeamNews() {
        return this.newsProvider.getTeamNews(this.clubId, this.teamIdsQuery)
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

}
