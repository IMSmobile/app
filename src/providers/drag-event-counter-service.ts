import { Injectable } from '@angular/core';
import { DragEventInvalidStateError } from './../models/errors/drag-event-invalid-state-error';

@Injectable()
export class DragEventCounterService {
  private dragEventCountMap: { [key: string]: number; } = {};

  public reset(id: string): void {
    this.dragEventCountMap[id] = 0;
  }

  public inc(id: string): void {
    this.ensureInitialisation(id);
    this.dragEventCountMap[id] = this.dragEventCountMap[id] + 1;
  }

  public callIfFirstEvent(id: string, callback: Function): void {
    if (this.dragEventCountMap[id] === 1) {
      callback();
    }
  }

  public dec(id: string): void {
    this.checkDecAllowed(id);
    this.dragEventCountMap[id] = this.dragEventCountMap[id] - 1;
  }

  public callIfLastEvent(id: string, callback: Function): void {
    if (this.dragEventCountMap[id] === 0) {
      callback();
    }
  }

  private ensureInitialisation(id: string): void {
    if (!(id in this.dragEventCountMap)) {
      this.dragEventCountMap[id] = 0;
    }
  }

  private checkDecAllowed(id: string): void {
    if (!(id in this.dragEventCountMap) || this.dragEventCountMap[id] === 0) {
      throw new DragEventInvalidStateError(`Drag Event dec mit Wert: ${this.dragEventCountMap[id]} aufgerufen`);
    }
  }
}
