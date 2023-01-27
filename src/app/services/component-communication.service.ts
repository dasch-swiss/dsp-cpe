import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComponentCommunicationService {

    // create a subject to hold event information and data which can be subscribed to.
    // you only get the data after you subscribe.
    private _subject$ = new Subject<EventPackage>();

    // used in the listening component
    // i.e. this._componentCommunicationService.on(Events.loginSuccess,
    //          (value) => doSomethingWhenFinished(value),
    //          () => doSomethingWhileWaiting(),
    //          (message) => handleError(message)
    //      );
    on(event: Events, action: (value?: any) => void, waiting: () => void, error: (msg?: any) => void): Subscription {
        return this._subject$
            .pipe(
                // filter down based on event name to any events that are emitted out of the subject from the emit method below.
                filter((e: EventPackage, i: any) => e.event === event),
            ).subscribe((e: EventPackage) => {
                if (e.status === Status.started) {
                    waiting();
                } else if (e.status === Status.finished)  {
                    e.value ? action(e.value): action();
                } else {
                    e.errorMsg ? error(e.errorMsg): error();
                }
            }); // subscribe to the subject to get the data.
    }

    // used in the emitting component.
    // i.e. this.componentCommunicationService.emit(new CpeEvent(Events.loginSuccess));
    emit(eventPackage: EventPackage) {
        this._subject$.next(eventPackage);
    }
}

export interface EventPackage {
    event: Events,
    status: Status,
    value?: any,
    errorMsg?: string
}

// possible events that can be emitted.
export enum Events {
    searchExecuted,
    changeBackground
}

export enum Status {
    started,
    finished,
    failed
}
