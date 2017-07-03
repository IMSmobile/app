import { DataTransferMock } from './data-transfer-mock';
export class DragEventMock implements DragEvent {

  dataTransfer: DataTransfer = new DataTransferMock();
  altKey: boolean;
  button: number;
  buttons: number;
  clientX: number;
  clientY: number;
  ctrlKey: boolean;
  fromElement: Element;
  layerX: number;
  layerY: number;
  metaKey: boolean;
  movementX: number;
  movementY: number;
  offsetX: number;
  offsetY: number;
  pageX: number;
  pageY: number;
  relatedTarget: EventTarget;
  screenX: number;
  screenY: number;
  shiftKey: boolean;
  toElement: Element;
  which: number;
  x: number;
  y: number;
  detail: number;
  view: Window;
  bubbles: boolean;
  cancelBubble: boolean;
  cancelable: boolean;
  currentTarget: EventTarget;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  returnValue: boolean;
  srcElement: Element;
  target: EventTarget;
  timeStamp: number;
  type: string;
  scoped: boolean;
  AT_TARGET: number;
  BUBBLING_PHASE: number;
  CAPTURING_PHASE: number;

  constructor(type: string, currentTarget?: Element) {
    this.type = type;
    if (!currentTarget) {
      currentTarget = document.createElement('div');
      currentTarget.id = 'a1';
    }
    this.dataTransfer.dropEffect = 'adasd';
    this.currentTarget = currentTarget;
  }

  initDragEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, ctrlKeyArg: boolean, altKeyArg: boolean, shiftKeyArg: boolean, metaKeyArg: boolean, buttonArg: number, relatedTargetArg: EventTarget, dataTransferArg: DataTransfer): void {
    // nothing to do;
  }
  msConvertURL(file: File, targetType: string, targetURL?: string): void {
    // nothing to do
  }

  getModifierState(keyArg: string): boolean {
    return false;
  }
  initMouseEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, ctrlKeyArg: boolean, altKeyArg: boolean, shiftKeyArg: boolean, metaKeyArg: boolean, buttonArg: number, relatedTargetArg: EventTarget): void {
    // nothing to do
  }

  initUIEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number): void {
    // nothing to do
  }

  initEvent(eventTypeArg: string, canBubbleArg: boolean, cancelableArg: boolean): void {
    // nothing to do
  }
  preventDefault(): void {
    // nothing to do
  }
  stopImmediatePropagation(): void {
    // nothing to do
  }
  stopPropagation(): void {
    // nothing to do
  }
  deepPath(): EventTarget[] {
    return null;
  }

}
