import { Component } from '@angular/core';
import { EventService } from './event.service';
import { Observable } from 'rxjs';
import { IEvent } from './event.interface';

@Component({
  selector: 'app-event',
  templateUrl: 'event.page.html',
  styleUrls: ['event.page.scss'],
})
export class EventPage {
  events$: Observable<IEvent[]>;

  constructor(public eventService: EventService) {
    this.events$ = this.eventService.getNextEvents();
  }
}
