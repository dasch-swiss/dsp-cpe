import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComponentCommunicationService {

    // create a subject to hold data which can be subscribed to.
    // you only get the data after you subscribe.
    private _subject$ = new Subject<CpeEvent>();

    // used in the listening component.
    // i.e. this.componentCommunicationService = this._componentCommunicationService.on(Events.loginSuccess, () => doSomething());
    on(event: Events, action: (value: any) => void, loading?: () => void): Subscription {
        return this._subject$
            .pipe(
                // filter down based on event name to any events that are emitted out of the subject from the emit method below.
                filter((e: CpeEvent, i: any) => e.name === event),
            ).subscribe((e: CpeEvent) => {
                if (e.status == Status.starting) {
                    if (loading) loading();
                } else {
                    action(e.value);
                }
            }); // subscribe to the subject to get the data.
    }

    // used in the emitting component.
    // i.e. this.componentCommunicationService.emit(new CpeEvent(Events.loginSuccess));
    emit(event: CpeEvent) {
        this._subject$.next(event);
    }
}

export class CpeEvent {
    constructor(public name: Events, public status: Status, public value?: any) { }
}

// possible events that can be emitted.
export enum Events {
    searchExecuted,
    changeBackground
}

export enum Status {
    starting,
    finished
}
