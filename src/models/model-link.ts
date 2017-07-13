export class ModelLink {
  public readonly dataHref: string;
  public readonly name: string;

  constructor(dataHref: string, name: string) {
    this.dataHref = dataHref;
    this.name = name;
  }
}
