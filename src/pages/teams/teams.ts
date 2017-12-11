import { Component } from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {TranslateService} from "@ngx-translate/core";
import {TeamProvider} from "../../providers/team/team";
import {TeamMemberPage} from "../teammember/teammember";
import {TeamnewsPage} from "../teamnews/teamnews";

@Component({
    selector: 'page-teams',
    templateUrl: 'teams.html'
})
export class TeamsPage {

    private clubId: number;
    private teams: any;

    // Our translated text strings
    private loadingTeamsErrorString: string;

    constructor(public navCtrl: NavController, private storage: Storage, private teamProvider: TeamProvider,
                private toastCtrl: ToastController, private translateService: TranslateService) {
        this.translateService.get('LOADING_TEAMS_ERROR').subscribe((value) => {
            this.loadingTeamsErrorString = value;
        });
    }

    ionViewWillEnter() {
        this.storage.get('activeClubId')
            .then((clubId) => {
                this.clubId = clubId;
                this.initTeams()
                    .then((data) => {
                        this.teams = data;
                    })
            });
    }

    initTeams() {
        var teamIdsQuery = '';
        return this.storage.get('localUser')
            .then((user) => {
                if (user.hasOwnProperty('currentTeamsAsPlayer')) {
                    for (let i in user.currentTeamsAsPlayer) {
                        teamIdsQuery += ('teamids=' + user.currentTeamsAsPlayer[i] + '&');
                    }
                }
                if (user.hasOwnProperty('currentTeamsAsCoach')) {
                    for (let i in user.currentTeamsAsCoach) {
                        teamIdsQuery += ('teamids=' + user.currentTeamsAsCoach[i] + '&');
                    }
                }
                if (user.hasOwnProperty('currentTeamsAsPlayer') || user.hasOwnProperty('currentTeamsAsCoach')) {
                    return this.loadTeams(teamIdsQuery);
                }
            });
    }

    loadTeams(teamIds) {
        return this.teamProvider.getMyTeams(this.clubId, teamIds)
            .then((resp) => {
                return JSON.parse(resp.data);
            })
            .catch((error) => {
                let toast = this.toastCtrl.create({
                    message: this.loadingTeamsErrorString,
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
                return [];
            });
    }

    public openMembersPage(teamJson) {
        this.navCtrl.push(TeamMemberPage, {
            teamJson: teamJson
        });
    }

    public openNewsPage(teamJson) {
        this.navCtrl.push(TeamnewsPage, {
            teamJson: teamJson
        });
    }

}
