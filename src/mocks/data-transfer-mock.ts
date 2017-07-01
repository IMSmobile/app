export class DataTransferMock implements DataTransfer {
  dropEffect: string;
  effectAllowed: string;
  files: FileList;
  items: DataTransferItemList;
  types: string[];

  clearData(format?: string): boolean {
    throw new Error('Method not implemented.');
  }
  getData(format: string): string {
    throw new Error('Method not implemented.');
  }
  setData(format: string, data: string): boolean {
    throw new Error('Method not implemented.');
  }
  setDragImage(image: Element, x: number, y: number): void {
    throw new Error('Method not implemented.');
  }

}
