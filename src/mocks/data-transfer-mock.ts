export class DataTransferMock implements DataTransfer {
  public dropEffect: string;
  public effectAllowed: string;
  public files: FileList;
  public items: DataTransferItemList;
  public types: string[];

  public clearData(format?: string): boolean {
    throw new Error('Method not implemented.');
  }
  public getData(format: string): string {
    throw new Error('Method not implemented.');
  }
  public setData(format: string, data: string): boolean {
    throw new Error('Method not implemented.');
  }
  public setDragImage(image: Element, x: number, y: number): void {
    throw new Error('Method not implemented.');
  }

}
