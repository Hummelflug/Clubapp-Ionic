import {Component} from '@angular/core';
import {NavParams, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {TranslateService} from "@ngx-translate/core";
import {VoteProvider} from "../../providers/vote/vote";

@Component({
    selector: 'page-votedetail',
    templateUrl: 'votedetail.html',
})
export class VotedetailPage {

    private vote: any;
    private voteType: string;
    private userId: number;

    // Our translated text strings
    private loadingVotesErrorString: string;

    constructor(private navParams: NavParams, private storage: Storage,
                private translateService: TranslateService, private toastCtrl: ToastController,
                private voteProvider: VoteProvider) {

        this.translateService.get('LOADING_VOTES_ERROR').subscribe((value) => {
            this.loadingVotesErrorString = value;
        });

        this.vote = this.navParams.get('voteJson');
        this.voteType = this.navParams.get('voteType');

        this.storage.get('localUser')
            .then((user) => {
                this.userId = user.id;
            });
    }

    hasVotedForAnswer(answerId) {
        return this.vote.answers[answerId].voters.includes(this.userId);
    }

    isExpired() {
        return (this.vote.status === 'EXPIRED');
    }

    voteForAnswer(answerId) {
        if (this.voteType === 'CLUB') {
            this.voteForClubAnswer(answerId);
        } else if (this.voteType === 'DEPARTMENT') {
            this.voteForDepartmentAnswer(answerId);
        } else if (this.voteType === 'TEAM') {
            this.voteForTeamAnswer(answerId);
        }
    }

    voteForClubAnswer(answerId) {
        this.voteProvider.voteForClubVote(this.vote.id, answerId)
            .then((resp) => {
                this.vote = JSON.parse(resp.data);
            })
            .catch((error) => {
                let toast = this.toastCtrl.create({
                    message: this.loadingVotesErrorString,
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
            });
    }

    voteForDepartmentAnswer(answerId) {
        this.voteProvider.voteForDepartmentVote(this.vote.id, answerId)
            .then((resp) => {
                this.vote = JSON.parse(resp.data);
            })
            .catch((error) => {
                let toast = this.toastCtrl.create({
                    message: this.loadingVotesErrorString,
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
            });
    }

    voteForTeamAnswer(answerId) {
        this.voteProvider.voteForTeamVote(this.vote.id, answerId)
            .then((resp) => {
                this.vote = JSON.parse(resp.data);
            })
            .catch((error) => {
                let toast = this.toastCtrl.create({
                    message: this.loadingVotesErrorString,
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
            });
    }

}
