export class Image {
  public readonly name: string;
  public readonly fileURI: string;
  public readonly file?: File;

  constructor(name: string, fileURI: string, file?: File) {
    this.name = name;
    this.fileURI = fileURI;
    this.file = file;
  }
}
