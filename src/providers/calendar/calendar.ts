import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Api } from '../api/api';

@Injectable()
export class CalendarProvider {

    constructor(public api: Api) { }

    getAllEvents(scheduleId: number) {
        return this.api.get('/schedule/' + scheduleId + '/events');
    }

    getGames(scheduleId: number) {
        return this.api.get('/schedule/' + scheduleId + '/game');
    }

    getOthers(scheduleId: number) {
        return this.api.get('/schedule/' + scheduleId + '/others');
    }

    getTournaments(scheduleId: number) {
        return this.api.get('/schedule/' + scheduleId + '/tournament');
    }

    getTrainings(scheduleId: number) {
        return this.api.get('/schedule/' + scheduleId + '/training');
    }

}
