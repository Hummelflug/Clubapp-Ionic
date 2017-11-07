import { Component } from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {NewsProvider} from "../../providers/news/news";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'page-news',
    templateUrl: 'news.html'
})
export class NewsPage {

    public clubNews: Array<any>;
    public departmentNews: Array<any>;
    public teamNews: Array<any>;

    // Our translated text strings
    private loadingNewsErrorString: string;

    constructor(public navCtrl: NavController, private newsProvider: NewsProvider,
                private translateService: TranslateService, private toastCtrl: ToastController) {
        this.translateService.get('LOADING_NEWS_ERROR').subscribe((value) => {
            this.loadingNewsErrorString = value;
        });
        this.loadClubNews();
        this.loadDepartmentNews();
        this.loadTeamNews();
    }

    loadClubNews() {
        this.newsProvider.getClubNews(1)
            .then((resp) => {
                this.clubNews = JSON.parse(resp.data);
            })
            .catch((error) => {
                let toast = this.toastCtrl.create({
                    message: this.loadingNewsErrorString,
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
            })
    }

    loadDepartmentNews() {
        this.newsProvider.getDepartmentNews(1)
            .then((resp) => {
                this.departmentNews = JSON.parse(resp.data);
            })
            .catch((error) => {
                let toast = this.toastCtrl.create({
                    message: this.loadingNewsErrorString,
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
            })
    }

    loadTeamNews() {
        this.newsProvider.getTeamNews(2)
            .then((resp) => {
                this.teamNews = JSON.parse(resp.data);
            })
            .catch((error) => {
                let toast = this.toastCtrl.create({
                    message: this.loadingNewsErrorString,
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
            })
    }

}
