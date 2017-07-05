import { Renderer2 } from '@angular/core';
import { DragEventCounter } from './../models/drag-event-counter';
export class DragEventService {

  dragEventCounter: DragEventCounter = new DragEventCounter();

  public preventEventsOnBody(renderer: Renderer2) {
    renderer.listen('body', 'dragenter', event => this.preventDefaultDragAction(event));
    renderer.listen('body', 'dragover', event => this.preventDefaultDragAction(event));
    renderer.listen('body', 'drop', event => this.preventDefaultDragAction(event));
  }

  public handleDragEvent(event: DragEvent, enterFunction: Function, leaveFunction: Function, dropFunction: Function) {
    this.preventDefaultDragAction(event);
    switch (event.type) {
      case 'dragstart': this.dragstart(event); break;
      case 'dragover': this.dragover(event); break;
      case 'dragenter': this.dragenter(event, enterFunction); break;
      case 'dragleave': this.dragleave(event, leaveFunction); break;
      case 'drop' : this.drop(event, dropFunction); break;
      default: throw new Error('Invalid drag event type: ' + event.type);
    }
  }

  private dragstart(event: DragEvent) {
    event.dataTransfer.effectAllowed = 'copyMove';
  }

  private dragover(event: DragEvent) {
    event.dataTransfer.dropEffect = 'copy';
  }

  private dragenter(event: DragEvent, enterFunction: Function) {
    const element: Element = (event.currentTarget as Element);
    this.dragEventCounter.inc(element.id);
    this.dragEventCounter.callIfFirstEvent(element.id, enterFunction);
    event.dataTransfer.dropEffect = 'copy';
  }

  private dragleave(event: DragEvent, leaveFunction: Function) {
    const element: Element = (event.currentTarget as Element);
    this.dragEventCounter.dec(element.id);
    this.dragEventCounter.callIfLastEvent(element.id, leaveFunction);
  }

  private drop(event: DragEvent, dropFunction: Function) {
    const element: Element = (event.currentTarget as Element);
    this.dragEventCounter.reset(element.id);
    dropFunction();
  }

  private preventDefaultDragAction(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

}
