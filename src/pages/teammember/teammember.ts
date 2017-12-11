import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {TranslateService} from "@ngx-translate/core";
import {TeamProvider} from "../../providers/team/team";
import {Api} from "../../providers/api/api";

@Component({
    selector: 'page-teammember',
    templateUrl: 'teammember.html'
})
export class TeamMemberPage {

    private coaches: any;
    private players: any;
    private team: any;
    private url: string;

    private userId: number;

    // Our translated text strings
    private loadingTeamErrorString: string;

    constructor(api: Api, public navCtrl: NavController, private navParams: NavParams, private storage: Storage,
                private teamProvider: TeamProvider, private toastCtrl: ToastController,
                private translateService: TranslateService) {
        this.translateService.get('LOADING_TEAM_ERROR').subscribe((value) => {
            this.loadingTeamErrorString = value;
        });

        this.url = api.getURL();

        this.team = this.navParams.get('teamJson');
    }

    ionViewWillEnter() {
        this.storage.get('localUser')
            .then((user) => {
                this.userId = user.id;
            });
        this.loadCoaches()
            .then((data) => {
                this.coaches = data;
            });
        this.loadPlayers()
            .then((data) => {
                this.players = data;
            });
    }

    loadCoaches() {
        return this.teamProvider.getTeamCoaches(this.team.id)
            .then((resp) => {
                console.log(resp);
                return JSON.parse(resp.data);
            })
            .catch((error) => {
                let toast = this.toastCtrl.create({
                    message: this.loadingTeamErrorString,
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
                return [];
            });
    }

    loadPlayers() {
        return this.teamProvider.getTeamPlayers(this.team.id)
            .then((resp) => {
                console.log(resp);
                return JSON.parse(resp.data);
            })
            .catch((error) => {
                let toast = this.toastCtrl.create({
                    message: this.loadingTeamErrorString,
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
                return [];
            });
    }

}
