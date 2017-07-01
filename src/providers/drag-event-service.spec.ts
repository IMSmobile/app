import { Renderer2 } from '@angular/core';
import { DragEventCreator } from './../mocks/drag-event-creator.spec';
import { DragEventService } from './drag-event-service';
import { TestBed, async } from '@angular/core/testing';

describe('Provider: DragEventService', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            providers: [
                Renderer2,
            ],
            imports: []
        }).compileComponents();
    }));

    it('should prevent standard action for dragstart', () => {
        let service = new DragEventService();
        let event = new DragEventCreator().createDragEvent('dragstart');
        spyOn(event, 'preventDefault').and.returnValue(null);
        spyOn(event, 'stopPropagation').and.returnValue(null);
        service.handleDragEvent(<DragEvent>event, null, null, null);
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should prevent standard action for dragover', () => {
        let service = new DragEventService();
        let event = new DragEventCreator().createDragEvent('dragover');
        spyOn(event, 'preventDefault').and.returnValue(null);
        spyOn(event, 'stopPropagation').and.returnValue(null);
        service.handleDragEvent(<DragEvent>event, null, null, null);
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should prevent standard action for dragenter', () => {
        let service = new DragEventService();
        let event = new DragEventCreator().createDragEvent('dragenter');
        spyOn(event, 'preventDefault').and.returnValue(null);
        spyOn(event, 'stopPropagation').and.returnValue(null);
        service.handleDragEvent(<DragEvent>event, () => { }, null, null);
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should prevent standard action for dragleave', () => {
        let service = new DragEventService();
        let event = new DragEventCreator().createDragEvent('dragleave');
        spyOn(event, 'preventDefault').and.returnValue(null);
        spyOn(event, 'stopPropagation').and.returnValue(null);
        service.handleDragEvent(<DragEvent>event, null, () => { }, null);
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should prevent standard action for dragexit', () => {
        let service = new DragEventService();
        let event = new DragEventCreator().createDragEvent('dragexit');
        spyOn(event, 'preventDefault').and.returnValue(null);
        spyOn(event, 'stopPropagation').and.returnValue(null);
        service.handleDragEvent(<DragEvent>event, null, null, null);
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should execute enterFunction on first dragenter', () => {
        let service = new DragEventService();
        let event = new DragEventCreator().createDragEvent('dragenter');
        let functionExecuted = false;
        service.handleDragEvent(<DragEvent>event, () => functionExecuted = true, null, null);
        expect(functionExecuted).toBeTruthy();
    });

    it('should set copy pointer on dragenter function', () => {
        let service = new DragEventService();
        let event = new DragEventCreator().createDragEvent('dragenter');
        service.handleDragEvent(event, () => { }, null, null);
        expect(event['dataTransfer'].dropEffect).toEqual('copy');
    });

    it('should execute leaveFunction on leave', () => {
        let service = new DragEventService();
        let enterEvent = new DragEventCreator().createDragEvent('dragenter');
        let leaveEvent = new DragEventCreator().createDragEvent('dragleave');
        let functionExecuted = false;
        service.handleDragEvent(enterEvent, () => { }, null, null);
        expect(functionExecuted).toBeFalsy();
        service.handleDragEvent(leaveEvent, null, () => functionExecuted = true, null);
        expect(functionExecuted).toBeTruthy();
    });

    it('should not execute leaveFunction if element not leaved', () => {
        let service = new DragEventService();
        let enterEvent = new DragEventCreator().createDragEvent('dragenter');
        let leaveEvent = new DragEventCreator().createDragEvent('dragleave');
        let functionExecuted = false;
        service.handleDragEvent(enterEvent, () => { }, null, null);
        service.handleDragEvent(enterEvent, () => { }, null, null);
        service.handleDragEvent(leaveEvent, null, () => functionExecuted = true, null);
        expect(functionExecuted).toBeFalsy();
    });

    it('should execute drop function on drop', () => {
        let service = new DragEventService();
        let event = new DragEventCreator().createDragEvent('drop');
        let functionExecuted = false;
        service.handleDragEvent(event, null, null, () => functionExecuted = true);
    });

    it('should reset counter  on drop', () => {
        let service = new DragEventService();
        let event = new DragEventCreator().createDragEvent('drop');
        let functionExecuted = false;
        spyOn(service.dragEventCounter, 'reset').and.callThrough();
        service.handleDragEvent(event, null, null, () => functionExecuted = true);
        expect(service.dragEventCounter.reset).toHaveBeenCalledTimes(1);
    });
});
