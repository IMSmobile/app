export class Link {
  dataHref: string;
  link: string;
  description?: string;

  constructor(link: string, dataHref: string, description?: string) {
    this.link = link;
    this.dataHref = dataHref;
    this.description = description;
  }
}
