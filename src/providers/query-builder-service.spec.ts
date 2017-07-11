import { async, inject, TestBed } from '@angular/core/testing';
import { QueryFragment } from './../models/query-fragment';
import { QueryBuilderService } from './query-builder-service';

describe('Provider: QueryBuilderService', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [],
      providers: [QueryBuilderService],
      imports: []
    }).compileComponents();
  }));

  it('Create a query string from 1 query fragment', inject([QueryBuilderService], (queryBuilderService: QueryBuilderService) => {
    const queryFragment1 = new QueryFragment('key', 'value');
    expect(queryBuilderService.generate([queryFragment1])).toEqual('?key=value');
  }));

  it('Create a query string from 2 query fragments', inject([QueryBuilderService], (queryBuilderService: QueryBuilderService) => {
    const queryFragment1 = new QueryFragment('key1', 'value1');
    const queryFragment2 = new QueryFragment('key2', 'value2');
    expect(queryBuilderService.generate([queryFragment1, queryFragment2])).toEqual('?key1=value1&key2=value2');
  }));

  it('Create a empty query string without query fragments', inject([QueryBuilderService], (queryBuilderService: QueryBuilderService) => {
    expect(queryBuilderService.generate([])).toEqual('');
  }));

});
