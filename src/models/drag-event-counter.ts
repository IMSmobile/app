export class DragEventCounter {
  dragEventCountMap: { [key: string]: number; } = {};

  public reset(id: string) {
    this.dragEventCountMap[id] = 0;
  }

  public inc(id: string) {
    this.dragEventCountMap[id] = this.dragEventCountMap[id] + 1 || 1;
  }

  public isFirstEvent(id: string, callback: Function) {
    if (this.dragEventCountMap[id] === 1) {
      callback();
    }
  }

  public dec(id: string) {
    this.dragEventCountMap[id] = this.dragEventCountMap[id] - 1;
  }

  public isLastEvent(id: string, callback: Function) {
    if (this.dragEventCountMap[id] === 0) {
      callback();
    }
  }
}
