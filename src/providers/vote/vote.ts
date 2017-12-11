import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Api } from '../api/api';

@Injectable()
export class VoteProvider {

    constructor(public api: Api) { }

    getAllClubVotes(clubId: number) {
        return this.api.get('/club/' + clubId + '/vote?filter=ALL');
    }

    getAllDepartmentVotes(clubId: number, departmentIds: string) {
        return this.api.get('/club/' + clubId + '/department/vote?' + departmentIds + 'filter=ALL');
    }

    getAllTeamVotes(clubId: number, teamIds: string) {
        return this.api.get('/club/' + clubId + '/team/vote?' + teamIds + 'filter=ALL');
    }

    getRecentClubVotes(clubId: number) {
        return this.api.get('/club/' + clubId + '/vote?filter=RECENT');
    }

    getRecentDepartmentVotes(clubId: number, departmentIds: string) {
        return this.api.get('/club/' + clubId + '/department/vote?' + departmentIds + 'filter=RECENT');
    }

    getRecentSingleTeamVotes(teamId: number) {
        return this.api.get('/team/' + teamId + '/vote?filter=RECENT');
    }

    getRecentTeamVotes(clubId: number, teamIds: string) {
        return this.api.get('/club/' + clubId + '/team/vote?' + teamIds + 'filter=RECENT');
    }

    voteForClubVote(voteId: number, answerId: number) {
        return this.api.post('/club/vote/' + voteId + '/answer/' + answerId);
    }

    voteForDepartmentVote(voteId: number, answerId: number) {
        return this.api.post('/department/vote/' + voteId + '/answer/' + answerId);
    }

    voteForTeamVote(voteId: number, answerId: number) {
        return this.api.post('/team/vote/' + voteId + '/answer/' + answerId);
    }

}
