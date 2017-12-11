import {Component, Input} from '@angular/core';
import {NavController} from "ionic-angular";
import {NewsdetailPage} from "../../pages/newsdetail/newsdetail";
import {Api} from "../../providers/api/api";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the NewsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'news',
  templateUrl: 'news.html'
})
export class NewsComponent {

    @Input() allNews: any;
    @Input() newsType: string;
    @Input() imageSrcPath: string;

    clubId: number;
    url: string;
    srcURL: string;

    constructor(api: Api, private navCtrl: NavController, private storage: Storage) {
        this.url = api.getURL();

        this.storage.get('activeClubId')
            .then((clubId) => {
                this.clubId = clubId;
            });

        this.srcURL = "";
    }

    getSrcURL(newsId) {
        if (this.srcURL === "") {
            if (this.newsType === 'CLUB') {
                this.srcURL = this.url + '/club/' + this.clubId + '/news/';
            } else if (this.newsType === 'DEPARTMENT') {
                this.srcURL = this.url + '/department/news/';
            } else if (this.newsType === 'TEAM') {
                this.srcURL = this.url + '/team/news/';
            }
        }
        return this.srcURL + newsId + '/image.jpg';
    }

    openNewsDetails(newsJson) {
        this.navCtrl.push(NewsdetailPage, {
            newsJson: newsJson,
            newsType: this.newsType
        });
    }

}
