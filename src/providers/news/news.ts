import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Api } from '../api/api';

@Injectable()
export class NewsProvider {

    constructor(public api: Api) { }

    addClubNewsReader(clubId: number, newsId: number) {
        return this.api.post('/club/' + clubId + '/news/' + newsId + '/reader');
    }

    addDepartmentNewsReader(clubId: number, newsId: number) {
        return this.api.post('/club/' + clubId + '/department/news/' + newsId + '/reader');
    }

    addTeamNewsReader(clubId: number, newsId: number) {
        return this.api.post('/club/' + clubId + '/team/news/' + newsId + '/reader');
    }

    getClubNews(clubId: number) {
        return this.api.get('/club/' + clubId + '/news?filter=RECENT');
    }

    getDepartmentNews(clubId: number, departmentIdsQuery: string) {
        return this.api.get('/club/' + clubId + '/department/news?' + departmentIdsQuery + 'filter=RECENT');
    }

    getSingleTeamNews(teamId: number) {
        return this.api.get('/team/' + teamId + '/news?filter=RECENT')
    }

    getTeamNews(clubId: number, teamIdsQuery: string) {
        return this.api.get('/club/' + clubId + '/team/news?' + teamIdsQuery + 'filter=RECENT');
    }

}
