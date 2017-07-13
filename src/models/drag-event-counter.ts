export class DragEventCounter {
  public dragEventCountMap: { [key: string]: number; } = {};

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
    this.ensureInitialisation(id);
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
}
