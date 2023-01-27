import { TestBed } from '@angular/core/testing';

import { ComponentCommunicationService, Events, Status } from './component-communication.service';

describe('ComponentCommunicationService', () => {
    let service: ComponentCommunicationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ComponentCommunicationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should listen for the search event and execute code in the callback when the event has emitted a value', () => {
        let searchTerm = '';

        // listen for searchExecuted event
        service.on(Events.searchExecuted, (e: any) => searchTerm = e, () => {}, () => {});

        // emit searchExecuted event with status finished
        service.emit({event: Events.searchExecuted, status: Status.finished, value: 'test'});

        expect(searchTerm).toEqual('test');

    });

    it('should listen for the search event and execute code in the callback when the event has NOT emitted a value', () => {
        let searchTerm;

        // listen for searchExecuted event
        service.on(Events.searchExecuted, (e: any) => searchTerm = e, () => {}, () => {});

        // emit searchExecuted event with status finished
        service.emit({event: Events.searchExecuted, status: Status.finished});

        expect(searchTerm).toBeUndefined();

    });

    it('should listen for the search event and execute code in the callback when the event has started', () => {
        let loading = false;

        // listen for searchExecuted event
        service.on(Events.searchExecuted, () => {}, () => {
            loading = true;
        }, () => {});

        // emit searchExecuted event with status starting
        service.emit({ event: Events.searchExecuted, status:Status.started});

        expect(loading).toEqual(true);

    });

    it('should listen for the search event and execute code in the callback when the event failed and emits an error message', () => {
        let message = '';

        // listen for searchExecuted event
        service.on(Events.searchExecuted, _ => {}, () => {}, (msg) => message = msg);

        // emit searchExecuted event with status starting
        service.emit({event: Events.searchExecuted, status: Status.failed, errorMsg: 'You have failed big time!'});

        expect(message).toEqual('You have failed big time!');

    });

    it('should listen for the search event and execute code in the callback when the event failed and emits no error message', () => {
        let message;

        // listen for searchExecuted event
        service.on(Events.searchExecuted, _ => {}, () => {}, (msg) => message = msg);

        // emit searchExecuted event with status starting
        service.emit({event: Events.searchExecuted, status: Status.failed});

        expect(message).toBeUndefined();

    });
});
