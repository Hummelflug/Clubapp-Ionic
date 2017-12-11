import { NgModule } from '@angular/core';
import { EventsComponent } from './events/events';
import { NewsComponent } from './news/news';
import { VotesComponent } from './votes/votes';
@NgModule({
	declarations: [EventsComponent,
    NewsComponent,
    VotesComponent],
	imports: [],
	exports: [EventsComponent,
    NewsComponent,
    VotesComponent]
})
export class ComponentsModule {}
