export class DragEventCounter {
  dragEventCountMap: { [key: string]: number; } = {};

  public reset(id: string) {
    this.dragEventCountMap[id] = 0;
  }

  public inc(id: string) {
    this.ensureInitialisation(id);
    this.dragEventCountMap[id] = this.dragEventCountMap[id] + 1;
  }

  public callIfFirstEvent(id: string, callback: Function) {
    if (this.dragEventCountMap[id] === 1) {
      callback();
    }
  }

  public dec(id: string) {
    this.ensureInitialisation(id);
    this.dragEventCountMap[id] = this.dragEventCountMap[id] - 1;
  }

  public callIfLastEvent(id: string, callback: Function) {
    if (this.dragEventCountMap[id] === 0) {
      callback();
    }
  }

  private ensureInitialisation(id: string) {
    if (!this.dragEventCountMap[id]) {
      this.dragEventCountMap[id] = 0;
    }
  }
}
