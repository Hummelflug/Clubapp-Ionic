import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Api } from '../api/api';

@Injectable()
export class BugreportProvider {

    constructor(public api: Api) { }

    sendBugReport(bugReport: any) {
        return this.api.postJSON('/bug_report', bugReport);
    }

}
