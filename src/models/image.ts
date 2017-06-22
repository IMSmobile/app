export class Image {
  name: string;
  fileURI: string;
  file?: File;

  constructor(name: string, fileURI: string, file?: File) {
    this.name = name;
    this.fileURI = fileURI;
    this.file = file;
  }
}
