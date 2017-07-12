export class Link {
  public readonly dataHref: string;
  public readonly link: string;
  public readonly description: string;

  constructor(link: string, dataHref: string, description: string = null) {
    this.link = link;
    this.dataHref = dataHref;
    this.description = description;
  }
}
