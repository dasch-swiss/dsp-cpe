import { TestBed } from '@angular/core/testing';

import { ComponentCommunicationService, CpeEvent, Events } from './component-communication.service';

describe('ComponentCommunicationService', () => {
    let service: ComponentCommunicationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ComponentCommunicationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should listen for events and execute code in the callback when the event is emitted', () => {
        let searchTerm = '';

        // listen for searchExecuted event
        service.on(Events.searchExecuted, (e: any) => searchTerm = e);

        // emit searchExecuted event
        service.emit(new CpeEvent(Events.searchExecuted, 'test'));

        expect(searchTerm).toEqual('test');

    });
});
