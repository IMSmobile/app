import { Link } from './link';

export class EntryPoint {
    links: Link[];

    constructor(links: Link[]) {
        this.links = links;
    }
}
