import { Filter } from './filter';

export class EntriesPoint {
    filters: Filter[];

    constructor(filters: Filter[]) {
        this.filters = filters;
    }

    getLinkHref(filterId: number): string {
        for (let filter of this.filters) {
            if (filter.id === filterId.toString()) {
                return filter.dataHref;
            }
        }
        throw new TypeError('No filterId: ' + filterId + ' found');
    }
}
