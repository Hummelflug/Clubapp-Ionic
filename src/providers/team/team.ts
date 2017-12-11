import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Api } from '../api/api';

@Injectable()
export class TeamProvider {

    constructor(public api: Api) { }

    getMyTeams(clubId: number, teamIdsQuery: string) {
        return this.api.get('/team/myteams?' + teamIdsQuery + 'clubid=' + clubId);
    }

    getTeamCoaches(teamId: number) {
        return this.api.get('/team/' + teamId + '/coach');
    }

    getTeamPlayers(teamId: number) {
        return this.api.get('/team/' + teamId + '/player');
    }

}
