import { Injectable } from '@angular/core';
import { IEvent } from './event.interface';
import { AngularFirestore, QueryFn, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class EventService {
  constructor(private db: AngularFirestore) {}

  getEvent(id: string): Observable<IEvent> {
    return this.getEventQuery()
      .doc<IEvent>(id)
      .valueChanges();
  }

  getEvents(): Observable<IEvent[]> {
    return this.getEventQuery().valueChanges();
  }

  getNextEvents(): Observable<IEvent[]> {
    return this.getEventQuery(ref =>
      ref.orderBy('date', 'asc').where(
        'date',
        '>=',
        moment()
          .startOf('day')
          .toDate()
          .valueOf(),
      ),
    ).valueChanges();
  }

  save(event: Partial<IEvent>) {
    return this.getEventQuery()
      .doc(event.id)
      .set(event, { merge: true });
  }

  private getEventQuery(refCb?: QueryFn): AngularFirestoreCollection<IEvent> {
    return this.db.collection<IEvent>('events', refCb);
  }
}
