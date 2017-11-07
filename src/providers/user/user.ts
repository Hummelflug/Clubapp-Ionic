import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Api } from '../api/api';

@Injectable()
export class UserProvider {

    constructor(public api: Api) { }

    login() {
        return this.api.get('/user/login');
    }

    signUpBasicUser(user: any) {
        return this.api.postUser('/user', user);
    }

}
