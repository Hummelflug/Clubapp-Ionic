import {Component, Input} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the EventsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'events',
  templateUrl: 'events.html'
})
export class EventsComponent {

    @Input() events: any;

    // Our translated text strings
    private days: any;
    private game: string;
    private tournament: string;
    private training: string;

    constructor(private translateService: TranslateService) {
        this.days = [];

        this.translateService.get(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY',
            'FRIDAY', 'SATURDAY', 'SUNDAY', 'GAME_TITLE', 'TOURNAMENT_TITLE', 'TRAINING_TITLE'])
            .subscribe((values) => {
                this.days.push(values['MONDAY']);
                this.days.push(values['TUESDAY']);
                this.days.push(values['WEDNESDAY']);
                this.days.push(values['THURSDAY']);
                this.days.push(values['FRIDAY']);
                this.days.push(values['SATURDAY']);
                this.days.push(values['SUNDAY']);
                this.game = values['GAME_TITLE'];
                this.tournament = values['TOURNAMENT_TITLE'];
                this.training = values['TRAINING_TITLE'];
            });
    }

    getWeekDay(date) {
        return this.days[ new Date(date).getDay() ];
    }

    getEventType(eventType) {
        if (eventType === 'GAME') {
            return this.game;
        }
        if (eventType === 'TOURNAMENT') {
            return this.tournament;
        }
        if (eventType === 'TRAINING') {
            return this.training;
        }
        return null;
    }

}
