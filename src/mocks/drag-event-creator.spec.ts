export class DragEventCreator {
  createDragEvent(type: string, element?: Element): DragEvent {
    let event = new Event(type);
    event['dataTransfer'] = { dropEffect: '' };
    event['dataTransfer'] = { effectAllowed: '' };
    if (!element) {
      element = document.createElement('div');
      element.id = 'a1';
    }
    spyOnProperty(event, 'currentTarget', 'get').and.returnValue(element);
    return <DragEvent>event;
  }
}
