export class Image {
  name: string;
  data: Blob;

  constructor(name: string, data: Blob) {
    this.name = name;
    this.data = data;
  }
}
