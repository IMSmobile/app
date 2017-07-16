import { Renderer2 } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { DragEventMock } from './../mocks/drag-event-mock';
import { DragEventCounterService } from './drag-event-counter-service';
import { DragEventService } from './drag-event-service';

describe('Provider: DragEventService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        Renderer2, DragEventService, DragEventCounterService
      ],
      imports: []
    });
  }));

  it('should prevent standard action for dragstart', inject([DragEventService], (service: DragEventService) => {
    const event = new DragEventMock('dragstart');
    spyOn(event, 'preventDefault').and.returnValue(undefined);
    spyOn(event, 'stopPropagation').and.returnValue(undefined);
    service.handleDragEvent(event, undefined, undefined, undefined);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
  }));

  it('should prevent standard action for dragover', inject([DragEventService], (service: DragEventService) => {
    const event = new DragEventMock('dragover');
    spyOn(event, 'preventDefault').and.returnValue(undefined);
    spyOn(event, 'stopPropagation').and.returnValue(undefined);
    service.handleDragEvent(event, undefined, undefined, undefined);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
  }));

  it('should prevent standard action for dragenter', inject([DragEventService], (service: DragEventService) => {
    const event = new DragEventMock('dragenter');
    spyOn(event, 'preventDefault').and.returnValue(undefined);
    spyOn(event, 'stopPropagation').and.returnValue(undefined);
    service.handleDragEvent(event, () => { }, undefined, undefined);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
  }));

  it('should prevent standard action for dragleave', inject([DragEventService], (service: DragEventService) => {
    service.handleDragEvent(new DragEventMock('dragenter'), () => { }, undefined, undefined);
    const event = new DragEventMock('dragleave');
    spyOn(event, 'preventDefault').and.returnValue(undefined);
    spyOn(event, 'stopPropagation').and.returnValue(undefined);
    service.handleDragEvent(event, undefined, () => { }, undefined);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
  }));

  it('should execute enterFunction on first dragenter', inject([DragEventService], (service: DragEventService) => {
    const event = new DragEventMock('dragenter');
    let functionExecuted = false;
    service.handleDragEvent(event, () => functionExecuted = true, undefined, undefined);
    expect(functionExecuted).toBeTruthy();
  }));

  it('should set copy pointer on dragenter function', inject([DragEventService], (service: DragEventService) => {
    const event = new DragEventMock('dragenter');
    service.handleDragEvent(event, () => { }, undefined, undefined);
    expect(event.dataTransfer.dropEffect).toEqual('copy');
  }));

  it('should execute leaveFunction on leave', inject([DragEventService], (service: DragEventService) => {
    const enterEvent = new DragEventMock('dragenter');
    const leaveEvent = new DragEventMock('dragleave');
    let functionExecuted = false;
    service.handleDragEvent(enterEvent, () => { }, undefined, undefined);
    expect(functionExecuted).toBeFalsy();
    service.handleDragEvent(leaveEvent, undefined, () => functionExecuted = true, undefined);
    expect(functionExecuted).toBeTruthy();
  }));

  it('should not execute leaveFunction if element not left', inject([DragEventService], (service: DragEventService) => {
    const enterEvent = new DragEventMock('dragenter');
    const leaveEvent = new DragEventMock('dragleave');
    let functionExecuted = false;
    service.handleDragEvent(enterEvent, () => { }, undefined, undefined);
    service.handleDragEvent(enterEvent, () => { }, undefined, undefined);
    service.handleDragEvent(leaveEvent, undefined, () => functionExecuted = true, undefined);
    expect(functionExecuted).toBeFalsy();
  }));

  it('should execute drop function on drop', inject([DragEventService], (service: DragEventService) => {
    const event = new DragEventMock('drop');
    let functionExecuted = false;
    service.handleDragEvent(event, undefined, undefined, () => functionExecuted = true);
  }));

  it('should reset counter  on drop', inject([DragEventService], (service: DragEventService) => {
    const event = new DragEventMock('drop');
    let functionExecuted = false;
    spyOn(service.dragEventCounterService, 'reset').and.callThrough();
    service.handleDragEvent(event, undefined, undefined, () => functionExecuted = true);
    expect(service.dragEventCounterService.reset).toHaveBeenCalledTimes(1);
  }));
});
