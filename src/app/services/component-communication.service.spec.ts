import { TestBed } from '@angular/core/testing';

import { ComponentCommunicationService, CpeEvent, Events, Status } from './component-communication.service';

describe('ComponentCommunicationService', () => {
    let service: ComponentCommunicationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ComponentCommunicationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should listen for events and execute code in the callback when the event is emitted and status is finished', () => {
        let searchTerm = '';

        // listen for searchExecuted event
        service.on(Events.searchExecuted, (e: any) => searchTerm = e);

        // emit searchExecuted event with status finished
        service.emit(new CpeEvent(Events.searchExecuted, Status.finished, 'test'));

        expect(searchTerm).toEqual('test');

    });

    it('should listen for events and execute code in the callback when the event is emitted and status is starting', () => {
        let loading = false;

        // listen for searchExecuted event
        service.on(Events.searchExecuted, (e: any) => {}, () => {
            loading = true;
        });

        // emit searchExecuted event with status starting
        service.emit(new CpeEvent(Events.searchExecuted, Status.starting));

        expect(loading).toEqual(true);

    });
});
