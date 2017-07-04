import { ErrorResponse } from './response/error-response';
import { MetadataField } from './../models/metadata-field';
import { MetadataTableFields } from './../models/metadata-table-fields';
import { ModelFieldsPointResponse } from './response/model-fields-point-response';
import { ModelTables } from './../models/model-tables';
import { ModelTablesPointResponse } from './response/model-tables-point-response';
import { ModelArchivesPointResponse } from './response/model-archives-point-response';
import { ModelLink } from './../models/model-link';
import { ModelArchives } from './../models/model-archives';
import { QueryBuilderService } from './../providers/query-builder-service';
import { QueryFragment } from './../models/query-fragment';
import { Response, ResponseOptions, RequestMethod, ResponseType } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { EntryPointResponse } from './response//entry-point-response';
import { LicensePointResponse } from './response//license-point-response';
import { LocationResponse } from './response//location-response';
import { TokenResponse } from './response//token-response';
import { EntriesResponse } from './response/entries-response';
import { ArchiveEntryResponse } from './response/archive-entry-response';
import { ArchiveTableEntry } from '../models/archive-table-entry';
import { ArchiveEntry } from '../models/archive-entry';
import { Token } from '../models/token';
import { Link } from '../models/link';
import { Credential } from '../models/credential';
import { Filter } from '../models/filter';
import { EntriesPoint } from '../models/entries-point';
import { ParentImageEntriesResponse } from './response/parent-image-entries-response';
import { Entries } from '../models/entries';
import { Entry } from '../models/entry';
import { Pagination } from '../models/pagination';

export class ImsBackendMock extends MockBackend {

  public baseUrl: string = 'http://restserver:9000';
  public segmentName: string = 'Ims Mobile Rest Segement';
  public credential: Credential = new Credential(this.baseUrl, 'admin', 'admin', this.segmentName);
  public unauthorizedResponse: ErrorResponse = new ErrorResponse(new ResponseOptions({
    body: 'HTTP ERROR: 401',
    status: 401,
    statusText: 'Unauthorized',
    type: ResponseType.Error
  }));
  public entryPointUrl: string = this.baseUrl + '/rest';
  public licenseUrl: string = this.entryPointUrl + '/license';
  public infoUrl: string = this.entryPointUrl + '/info';
  public entriesUrl: string = this.entryPointUrl + '/entries';
  public modelsUrl: string = this.entryPointUrl + '/models';
  public tokensUrl: string = this.licenseUrl + '/tokens';
  public tokenLoadingUrl: string = this.tokensUrl + '/ABCDE';
  public filterId: number = 40;
  public filterResourceUrl: string = this.entriesUrl + '/' + this.filterId;
  public version: string = 'V17Q1';
  public versionResponse:any = { 'version': this.version };
  public tokenName: string = 'EDFC';
  public tokenExpirationDate: string = '2015-10-28T16:45:12Z';
  public token: Token = new Token(this.tokenName, this.tokenExpirationDate);
  public modelArchiveName: string = 'workflow_db1';
  public policeFilter: Filter = new Filter(this.filterResourceUrl, this.filterId.toString(), 'IMS_Mobile_Client', this.modelArchiveName);
  public medicineFilter: Filter = new Filter(this.entriesUrl + '/42', '41', 'IMS_Mobile_Client', 'medref');
  public notAppFilter: Filter = new Filter(this.entriesUrl + '/42', '42', 'Wrong_Filter_Name', 'any_archive');
  public filterTable: Filter[] = [this.policeFilter, this.medicineFilter, this.notAppFilter];
  public containerRequestUrl: string = this.filterResourceUrl + '/Bild/uploads';
  public parentImageEntriesUrl: string = this.filterResourceUrl + '/Fall';
  public query: QueryFragment[] = [new QueryFragment('testkey', 'testvalue')];
  public queryBuilder: QueryBuilderService = new QueryBuilderService();
  public parentImageEntriesUrlWithQuery: string = this.parentImageEntriesUrl + this.queryBuilder.generate(this.query);
  public archiveEntry: ArchiveEntry = new ArchiveEntry('workflow db1', [new ArchiveTableEntry('Art'), new ArchiveTableEntry('Fall', this.parentImageEntriesUrl), new ArchiveTableEntry('Bild', null, null, this.containerRequestUrl)]);
  public uploadContainerUrl: string = this.containerRequestUrl + '/XYZ';
  public imageLocationUrl: string = this.filterResourceUrl + 'Bild/123';
  public parentImageEntriesNextPageUrl: string = this.parentImageEntriesUrlWithQuery + '&start=20&pageSize=20';
  public parentImageEntriesNextNextPageUrl: string = this.parentImageEntriesUrlWithQuery + '&start=40&pageSize=20';
  public paretImageEntriesPagination: Pagination = new Pagination({ nextPage: this.parentImageEntriesNextPageUrl });
  public parentImageEntries: Entries = new Entries(this.paretImageEntriesPagination, [new Entry().set('IdFall', '1'), new Entry().set('IdFall', '2')]);
  public parentImageEntriesNextPage: Entries = new Entries(new Pagination({ nextPage: this.parentImageEntriesNextNextPageUrl }), [new Entry().set('IdFall', '21'), new Entry().set('IdFall', '22')]);
  public modelTablesUrl: string = this.modelsUrl + '/workflow_db1';
  public modelArchives: ModelArchives = new ModelArchives([new ModelLink(this.modelTablesUrl, this.modelArchiveName)]);
  public modelTableFieldsUrl: string = this.modelTablesUrl + '/Fall';
  public modelImageTableName: string = 'Bild';
  public modelImageTableFieldsUrl: string = this.modelTablesUrl + '/Bild';
  public modelTables: ModelTables = new ModelTables(this.modelArchiveName, [new ModelLink(this.modelTableFieldsUrl, 'Fall'), new ModelLink(this.modelImageTableFieldsUrl, this.modelImageTableName)]);
  public modelFieldIdentifierName: string = 'BILDNAME';
  public modelFieldParentreferenceName: string = 'IDFall';
  public modelFieldIdentifier: MetadataField = new MetadataField(this.modelFieldIdentifierName, 'STRING', false, false, true, true, 10);
  public modelFieldParentreference: MetadataField = new MetadataField(this.modelFieldParentreferenceName, 'STRING', false, false, true, true, 10);
  public modelFieldOptionalString: MetadataField = new MetadataField('OptionalString', 'STRING', false, false, true, false, 10);
  public modelFields: MetadataTableFields = new MetadataTableFields(this.modelImageTableName, this.modelFieldIdentifierName, this.modelFieldParentreferenceName, [this.modelFieldIdentifier, this.modelFieldParentreference, this.modelFieldOptionalString]);

  public parentImageTableName: string = 'Fall';
  public parentImageModelFieldIdentifierName: string = 'FALL_NR';
  public parentImageModelFieldParentReferenceName: string = 'IDArt';
  public parentImageModelFieldParentreference: MetadataField = new MetadataField(this.parentImageModelFieldParentReferenceName, 'STRING', false, false, true, true, 10);
  public parentImageModelFieldIdentifier: MetadataField = new MetadataField(this.parentImageModelFieldIdentifierName, 'STRING', false, false, true, true, 10);
  public parentImageModelFieldOptionalString: MetadataField = new MetadataField('OptionalString', 'STRING', false, false, true, false, 10);
  public parentImageModelFields: MetadataTableFields = new MetadataTableFields(this.parentImageTableName, this.parentImageModelFieldIdentifierName, this.parentImageModelFieldParentReferenceName, [this.parentImageModelFieldIdentifier, this.parentImageModelFieldParentreference, this.parentImageModelFieldOptionalString]);

  constructor() {
    super();
    this.connections.subscribe((connection) => {
      if (!connection.request.url.startsWith(this.baseUrl)) {
        connection.mockError(new Error('Wrong Url'));
      } else if (connection.request.headers.get('authorization') !== ('Basic ' + btoa(this.credential.username + ':' + this.credential.password))) {
        connection.mockError(this.unauthorizedResponse);
      } else if (connection.request.url.endsWith(this.entryPointUrl) && connection.request.method === RequestMethod.Get) {
        connection.mockRespond(new EntryPointResponse([new Link('license', this.licenseUrl), new Link('info', this.infoUrl), new Link('entries', this.entriesUrl), new Link('models', this.modelsUrl)]));
      } else if (connection.request.url.endsWith(this.licenseUrl) && connection.request.method === RequestMethod.Get) {
        connection.mockRespond(new LicensePointResponse(null, new Link('tokens', this.tokensUrl)));
      } else if (connection.request.url.endsWith(this.modelsUrl) && connection.request.method === RequestMethod.Get) {
        connection.mockRespond(new ModelArchivesPointResponse(this.modelArchives));
      } else if (connection.request.url.endsWith(this.modelTablesUrl) && connection.request.method === RequestMethod.Get) {
        connection.mockRespond(new ModelTablesPointResponse(this.modelTables));
      } else if (connection.request.url.endsWith(this.modelImageTableFieldsUrl) && connection.request.method === RequestMethod.Get) {
        connection.mockRespond(new ModelFieldsPointResponse(this.modelFields));
      } else if (connection.request.url.endsWith(this.modelTableFieldsUrl) && connection.request.method === RequestMethod.Get) {
        connection.mockRespond(new ModelFieldsPointResponse(this.parentImageModelFields));
      } else if (connection.request.url.endsWith(this.tokensUrl) && connection.request.method === RequestMethod.Post) {
        connection.mockRespond(new LocationResponse(this.tokenLoadingUrl));
      } else if (connection.request.url.endsWith(this.tokenLoadingUrl) && connection.request.method === RequestMethod.Get) {
        connection.mockRespond(new TokenResponse(this.token));
      } else if (connection.request.url.endsWith(this.entriesUrl) && connection.request.method === RequestMethod.Get) {
        connection.mockRespond(new EntriesResponse(new EntriesPoint(this.filterTable)));
      } else if (connection.request.url.endsWith(this.filterResourceUrl) && connection.request.method === RequestMethod.Get) {
        connection.mockRespond(new ArchiveEntryResponse(this.archiveEntry));
      } else if (connection.request.url.endsWith(this.containerRequestUrl) && connection.request.method === RequestMethod.Post) {
        connection.mockRespond(new LocationResponse(this.uploadContainerUrl));
      } else if (connection.request.url.endsWith(this.uploadContainerUrl) && connection.request.method === RequestMethod.Post) {
        connection.mockRespond(new LocationResponse(this.imageLocationUrl));
      } else if (connection.request.url.endsWith(this.parentImageEntriesUrlWithQuery) && connection.request.method === RequestMethod.Get) {
        connection.mockRespond(new ParentImageEntriesResponse(this.parentImageEntries));
      } else if (connection.request.url.endsWith(this.parentImageEntriesNextPageUrl) && connection.request.method === RequestMethod.Get) {
        connection.mockRespond(new ParentImageEntriesResponse(this.parentImageEntriesNextPage));
      } else if (connection.request.url.endsWith(this.infoUrl) && connection.request.method === RequestMethod.Get) {
        connection.mockRespond(new Response(new ResponseOptions({
          body: this.versionResponse
        })));
      } else {
        connection.mockError(new Error('No handling for: ' + connection.request.url));
      }
    });
  }
}
