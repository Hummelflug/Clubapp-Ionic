import { Component } from '@angular/core';
import {NavParams, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {NewsProvider} from "../../providers/news/news";
import {TranslateService} from "@ngx-translate/core";
import {Api} from "../../providers/api/api";

@Component({
  selector: 'page-newsdetail',
  templateUrl: 'newsdetail.html',
})
export class NewsdetailPage {

    private clubId: number;
    private news: any;
    private newsType: string;
    private url: string;

    // Our translated text strings
    private loadingNewsErrorString: string;

    constructor(private api: Api, private navParams: NavParams, private newsProvider: NewsProvider,
                private storage: Storage, private translateService: TranslateService,
                private toastCtrl: ToastController) {
        this.translateService.get('LOADING_NEWS_ERROR').subscribe((value) => {
            this.loadingNewsErrorString = value;
        });

        this.url = this.api.getURL();

        this.news = this.navParams.get('newsJson');
        this.newsType = this.navParams.get('newsType');

        this.storage.get('activeClubId')
            .then((id) => {
                this.clubId = id;
                this.storage.get('localUser')
                    .then((user) => {
                        if (!this.news.newsReaders.includes(user.id)) {
                            this.addUserAsReader(user.id);
                        }
                    });
            });
    }

    addUserAsReader(userId) {

        if (this.newsType === 'CLUB') {
            this.newsProvider.addClubNewsReader(this.clubId, this.news.id)
                .then((resp) => {
                    this.news = JSON.parse(resp.data);
                })
                .catch((error) => {
                    let toast = this.toastCtrl.create({
                        message: this.loadingNewsErrorString,
                        duration: 3000,
                        position: 'bottom'
                    });
                    toast.present();
                });
        } else if (this.newsType === 'DEPARTMENT') {
            this.newsProvider.addDepartmentNewsReader(this.clubId, this.news.id)
                .then((resp) => {
                    this.news = JSON.parse(resp.data);
                })
                .catch((error) => {
                    let toast = this.toastCtrl.create({
                        message: this.loadingNewsErrorString,
                        duration: 3000,
                        position: 'bottom'
                    });
                    toast.present();
                });
        } else if (this.newsType === 'TEAM') {
            this.newsProvider.addTeamNewsReader(this.clubId, this.news.id)
                .then((resp) => {
                    this.news = JSON.parse(resp.data);
                })
                .catch((error) => {
                    let toast = this.toastCtrl.create({
                        message: this.loadingNewsErrorString,
                        duration: 3000,
                        position: 'bottom'
                    });
                    toast.present();
                });
        }
    }

}
