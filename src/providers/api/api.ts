import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HTTP} from "@ionic-native/http";
import {Storage} from "@ionic/storage";

@Injectable()
export class Api {

    scheme: string = 'http://';
    host: string = '10.0.2.2:8080';
    url: string;

    constructor(private http: HTTP, private storage: Storage,) {
        this.http.setDataSerializer('json');
        this.url = this.scheme + this.host;
    }

    createAuthenticationHeader() {
        return this.storage.get('localUserCredentials')
            .then((credentials) => {
                return this.http.getBasicAuthHeader(credentials.email, credentials.password);
            })
            .catch(() => {
                return {};
            })
    }

    createImageURL(endpoint: string) {
        return this.url + endpoint;
    }

    get(endpoint: string) {
        return this.createAuthenticationHeader()
            .then((header) => {
                return this.http.get(this.url + endpoint, {}, header);
            });
    }

    getURL() {
        return this.url;
    }

    post(endpoint: string) {
        return this.createAuthenticationHeader()
            .then((header) => {
                return this.http.post(this.url + endpoint,{}, header);
            });
    }

    postJSON(endpoint: string, json: any) {
        this.http.setDataSerializer('json');
        return this.createAuthenticationHeader()
            .then((header) => {
                return this.http.post(this.url + endpoint, json, header);
            });
    }

    postUser(endpoint: string, user: any) {
        this.http.setDataSerializer('json');
        return this.http.post(this.url + endpoint, user, { });
    }

}