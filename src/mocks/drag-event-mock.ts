import { DataTransferMock } from './data-transfer-mock';
export class DragEventMock implements DragEvent {

  public dataTransfer: DataTransfer = new DataTransferMock();
  public altKey: boolean;
  public button: number;
  public buttons: number;
  public clientX: number;
  public clientY: number;
  public ctrlKey: boolean;
  public fromElement: Element;
  public layerX: number;
  public layerY: number;
  public metaKey: boolean;
  public movementX: number;
  public movementY: number;
  public offsetX: number;
  public offsetY: number;
  public pageX: number;
  public pageY: number;
  public relatedTarget: EventTarget;
  public screenX: number;
  public screenY: number;
  public shiftKey: boolean;
  public toElement: Element;
  public which: number;
  public x: number;
  public y: number;
  public detail: number;
  public view: Window;
  public bubbles: boolean;
  public cancelBubble: boolean;
  public cancelable: boolean;
  public currentTarget: EventTarget;
  public defaultPrevented: boolean;
  public eventPhase: number;
  public isTrusted: boolean;
  public returnValue: boolean;
  public srcElement: Element;
  public target: EventTarget;
  public timeStamp: number;
  public type: string;
  public scoped: boolean;
  public AT_TARGET: number;
  public BUBBLING_PHASE: number;
  public CAPTURING_PHASE: number;

  constructor(type: string, currentTarget?: Element) {
    this.type = type;
    if (currentTarget === undefined) {
      currentTarget = document.createElement('div');
      currentTarget.id = 'a1';
    }
    this.dataTransfer.dropEffect = 'adasd';
    this.currentTarget = currentTarget;
  }

  public initDragEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, ctrlKeyArg: boolean, altKeyArg: boolean, shiftKeyArg: boolean, metaKeyArg: boolean, buttonArg: number, relatedTargetArg: EventTarget, dataTransferArg: DataTransfer): void {
    // nothing to do;
  }

  public msConvertURL(file: File, targetType: string, targetURL?: string): void {
    // nothing to do
  }

  public getModifierState(keyArg: string): boolean {
    return false;
  }

  public initMouseEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, ctrlKeyArg: boolean, altKeyArg: boolean, shiftKeyArg: boolean, metaKeyArg: boolean, buttonArg: number, relatedTargetArg: EventTarget): void {
    // nothing to do
  }

  public initUIEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number): void {
    // nothing to do
  }

  public initEvent(eventTypeArg: string, canBubbleArg: boolean, cancelableArg: boolean): void {
    // nothing to do
  }

  public preventDefault(): void {
    // nothing to do
  }

  public stopImmediatePropagation(): void {
    // nothing to do
  }

  public stopPropagation(): void {
    // nothing to do
  }
  public deepPath(): EventTarget[] {
    return undefined;
  }

}
