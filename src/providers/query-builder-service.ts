import { QueryFragment } from './../models/queryFragment';
export class QueryBuilderService {

  public generate(queryFragments: QueryFragment[]): string {
    let query = '?';
    queryFragments.map((queryFragment) => {
      query = query.concat(queryFragment.key, '=', queryFragment.value, '&');
    });
    return query.slice(0, -1);
  }

}
