import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {CalendarProvider} from "../../providers/calendar/calendar";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'page-calendar',
    templateUrl: 'calendar.html'
})
export class CalendarPage {

    private allEvents = [];
    private games = [];
    private others = [];
    private tournaments = [];
    private trainings = [];

    private filter: string;

    private user: any;

    // Our translated text strings
    private loadingScheduleErrorString: string;


    constructor(private calendarProvider: CalendarProvider, private navCtrl: NavController, private storage: Storage,
                private toastCtrl: ToastController, private translateService: TranslateService) {
        this.translateService.get(['LOADING_SCHEDULE_ERROR'])
                    .subscribe((values) => {
                this.loadingScheduleErrorString = values['LOADING_SCHEDULE_ERROR'];
        });

        this.filter = 'ALL';
    }

    ionViewWillLoad() {
        this.storage.get('localUser')
            .then((user) => {
                this.user = user;
                this.loadAllEvents().then((events) => {
                    this.allEvents = events;
                });
                this.loadGames().then((events) => {
                    this.games = events;
                });
                this.loadOthers().then((events) => {
                    this.others = events;
                });
                this.loadTournaments().then((events) => {
                    this.tournaments = events;
                });
                this.loadTrainings().then((events) => {
                    this.trainings = events;
                });
            });
    }

    getEvents() {
        if (this.filter === 'ALL') {
            return this.allEvents;
        }

        if (this.filter === 'GAME') {
            return this.games;
        }

        if (this.filter === 'OTHERS') {
            return this.others;
        }

        if (this.filter === 'TRAINING') {
            return this.trainings;
        }

        if (this.filter === 'TOURNAMENT') {
            return this.tournaments;
        }
    }

    loadAllEvents() {
        return this.calendarProvider.getAllEvents(this.user.scheduleId)
            .then((resp) => {
                return JSON.parse(resp.data);
            })
            .catch((error) => {
                return this.showError();
            });
    }

    loadGames(){
        return this.calendarProvider.getGames(this.user.scheduleId)
            .then((resp) => {
                return JSON.parse(resp.data);
            })
            .catch((error) => {
                return this.showError();
            });
    }

    loadOthers() {
        return this.calendarProvider.getOthers(this.user.scheduleId)
            .then((resp) => {
                return JSON.parse(resp.data);
            })
            .catch((error) => {
                return this.showError();
            });
    }

    loadTournaments() {
        return this.calendarProvider.getTournaments(this.user.scheduleId)
            .then((resp) => {
                return JSON.parse(resp.data);
            })
            .catch((error) => {
                return this.showError();
            });
    }

    loadTrainings() {
        return this.calendarProvider.getTrainings(this.user.scheduleId)
            .then((resp) => {
                return JSON.parse(resp.data);
            })
            .catch((error) => {
                return this.showError();
            });
    }

    showError() {
        let toast = this.toastCtrl.create({
            message: this.loadingScheduleErrorString,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
        return [];
    }

}
