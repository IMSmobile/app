import { Link } from './link';

export class EntryPoint {
    links:Link[];

    constructor(links: Link[]) {
        this.links = links;
    }

    getLinkHref(linkName: string): string {
        for (let link of this.links) {
            if (link.link === linkName) {
                return link.dataHref;
            }
        }
        throw new TypeError('No linkName: ' + linkName + ' found');
    }
}
