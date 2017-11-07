import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HTTP} from "@ionic-native/http";
import {Storage} from "@ionic/storage";

@Injectable()
export class Api {
    url: string = 'http://10.0.2.2:8080';

    constructor(private http: HTTP, private storage: Storage,) {
        this.http.setDataSerializer('json');
    }

    createAuthenticationHeader() {
        return this.storage.get('localUserCredentials').then((credentials) => {
            return this.http.getBasicAuthHeader(credentials.email, credentials.password);
        })
    }

    get(endpoint: string) {
        return this.createAuthenticationHeader()
            .then((header) => {
                return this.http.get(this.url + endpoint, {}, header);
            });
    }

    postUser(endpoint: string, user: any) {
        return this.http.post(this.url + endpoint, user, { });
    }

}