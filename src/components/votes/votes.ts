import {Component, Input} from '@angular/core';
import {VotedetailPage} from "../../pages/votedetail/votedetail";
import {NavController} from "ionic-angular";

/**
 * Generated class for the VotesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'votes',
  templateUrl: 'votes.html'
})
export class VotesComponent {

    @Input() votes: any;
    @Input() voteType: string;

    constructor(private navCtrl: NavController) {
    }

    openPage(voteJson) {
        this.navCtrl.push(VotedetailPage, {
            voteJson: voteJson,
            voteType: this.voteType
        });
    }


}
