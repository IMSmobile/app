import { ImsError } from './ims-error';
export class DragEventInvalidStateError extends ImsError {

  constructor(message: string) {
    super('Drag Event', message);
    Object.setPrototypeOf(this, DragEventInvalidStateError.prototype);
  }
}
