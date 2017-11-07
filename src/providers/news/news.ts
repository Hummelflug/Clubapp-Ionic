import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Api } from '../api/api';

@Injectable()
export class NewsProvider {

    constructor(public api: Api) { }

    getClubNews(clubId: number) {
        return this.api.get('/club/' + clubId + '/news?filter=RECENT');
    }

    getDepartmentNews(departmentId: number) {
        return this.api.get('/department/' + departmentId + '/news?filter=RECENT');
    }

    getTeamNews(teamId: number) {
        return this.api.get('/team/' + teamId + '/news?filter=RECENT');
    }

}
