import { Renderer2 } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { DragEventMock } from './../mocks/drag-event-mock';
import { DragEventService } from './drag-event-service';

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
        const service = new DragEventService();
        const event = new DragEventMock('dragstart');
        spyOn(event, 'preventDefault').and.returnValue(undefined);
        spyOn(event, 'stopPropagation').and.returnValue(undefined);
        service.handleDragEvent(event, undefined, undefined, undefined);
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should prevent standard action for dragover', () => {
        const service = new DragEventService();
        const event = new DragEventMock('dragover');
        spyOn(event, 'preventDefault').and.returnValue(undefined);
        spyOn(event, 'stopPropagation').and.returnValue(undefined);
        service.handleDragEvent(event, undefined, undefined, undefined);
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should prevent standard action for dragenter', () => {
        const service = new DragEventService();
        const event = new DragEventMock('dragenter');
        spyOn(event, 'preventDefault').and.returnValue(undefined);
        spyOn(event, 'stopPropagation').and.returnValue(undefined);
        service.handleDragEvent(event, () => { }, undefined, undefined);
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should prevent standard action for dragleave', () => {
        const service = new DragEventService();
        const event = new DragEventMock('dragleave');
        spyOn(event, 'preventDefault').and.returnValue(undefined);
        spyOn(event, 'stopPropagation').and.returnValue(undefined);
        service.handleDragEvent(event, undefined, () => { }, undefined);
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should execute enterFunction on first dragenter', () => {
        const service = new DragEventService();
        const event = new DragEventMock('dragenter');
        let functionExecuted = false;
        service.handleDragEvent(event, () => functionExecuted = true, undefined, undefined);
        expect(functionExecuted).toBeTruthy();
    });

    it('should set copy pointer on dragenter function', () => {
        const service = new DragEventService();
        const event = new DragEventMock('dragenter');
        service.handleDragEvent(event, () => { }, undefined, undefined);
        expect(event.dataTransfer.dropEffect).toEqual('copy');
    });

    it('should execute leaveFunction on leave', () => {
        const service = new DragEventService();
        const enterEvent = new DragEventMock('dragenter');
        const leaveEvent = new DragEventMock('dragleave');
        let functionExecuted = false;
        service.handleDragEvent(enterEvent, () => { }, undefined, undefined);
        expect(functionExecuted).toBeFalsy();
        service.handleDragEvent(leaveEvent, undefined, () => functionExecuted = true, undefined);
        expect(functionExecuted).toBeTruthy();
    });

    it('should not execute leaveFunction if element not left', () => {
        const service = new DragEventService();
        const enterEvent = new DragEventMock('dragenter');
        const leaveEvent = new DragEventMock('dragleave');
        let functionExecuted = false;
        service.handleDragEvent(enterEvent, () => { }, undefined, undefined);
        service.handleDragEvent(enterEvent, () => { }, undefined, undefined);
        service.handleDragEvent(leaveEvent, undefined, () => functionExecuted = true, undefined);
        expect(functionExecuted).toBeFalsy();
    });

    it('should execute drop function on drop', () => {
        const service = new DragEventService();
        const event = new DragEventMock('drop');
        let functionExecuted = false;
        service.handleDragEvent(event, undefined, undefined, () => functionExecuted = true);
    });

    it('should reset counter  on drop', () => {
        const service = new DragEventService();
        const event = new DragEventMock('drop');
        let functionExecuted = false;
        spyOn(service.dragEventCounter, 'reset').and.callThrough();
        service.handleDragEvent(event, undefined, undefined, () => functionExecuted = true);
        expect(service.dragEventCounter.reset).toHaveBeenCalledTimes(1);
    });
});
