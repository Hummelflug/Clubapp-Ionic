import {Component} from '@angular/core';
import {MenuController, NavController, ToastController} from "ionic-angular";
import { Storage } from '@ionic/storage';
import {TranslateService} from "@ngx-translate/core";
import {VoteProvider} from "../../providers/vote/vote";
import {VotedetailPage} from "../votedetail/votedetail";

@Component({
    selector: 'page-vote',
    templateUrl: 'vote.html'
})
export class VotePage {

    private clubId: number;
    private departmentIdsQuery: string;
    private teamIdsQuery: string;

    public clubVotes: Array<any>;
    public departmentVotes: Array<any>;
    public teamVotes: Array<any>;

    // Our translated text strings
    private loadingVotesErrorString: string;

    constructor(private navCtrl: NavController, private storage: Storage,
                private translateService: TranslateService, private toastCtrl: ToastController,
                private voteProvider: VoteProvider) {
        this.translateService.get('LOADING_VOTES_ERROR').subscribe((value) => {
            this.loadingVotesErrorString = value;
        });
    }

    doRefresh(refresher) {
        this.loadClubVotes().then((clubVotes) => {
            this.clubVotes = clubVotes;
            this.loadDepartmentVotes().then((departmentVotes) => {
                this.departmentVotes = departmentVotes;
                this.loadTeamVotes().then((teamVotes) => {
                    this.teamVotes = teamVotes;
                    refresher.complete();
                });
            });
        });
    }

    ionViewWillEnter() {
        this.storage.get('activeClubId')
            .then((clubId) => {
                this.clubId = clubId;
                this.loadClubVotes().then((data) => {
                    this.clubVotes = data;
                });
                this.initDepartmentVotes().then((data) => {
                    this.departmentVotes = data;
                });
                this.initTeamVotes().then((data) => {
                    this.teamVotes = data;
                });
            });
    }

    initDepartmentVotes() {
        this.departmentIdsQuery = '';
        return this.storage.get('localUser')
            .then((user) => {
                if (user.hasOwnProperty('currentDepartments')) {
                    for (let i in user.currentDepartments) {
                        this.departmentIdsQuery += ('departmentids=' + user.currentDepartments[i] + '&');
                    }
                    return this.loadDepartmentVotes();
                }
            });
    }

    initTeamVotes() {
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
                    return this.loadTeamVotes();
                }
            })
    }

    loadClubVotes() {
        return this.voteProvider.getRecentClubVotes(this.clubId)
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

    loadDepartmentVotes() {
        return this.voteProvider.getRecentDepartmentVotes(this.clubId, this.departmentIdsQuery)
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

    loadTeamVotes() {
        return this.voteProvider.getRecentTeamVotes(this.clubId, this.teamIdsQuery)
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