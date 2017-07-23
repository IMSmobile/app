/* tslint:disable:max-file-line-count */
import { RequestMethod, Response, ResponseOptions, ResponseType } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ArchiveEntry } from '../models/archive-entry';
import { ArchiveTableEntry } from '../models/archive-table-entry';
import { Credential } from '../models/credential';
import { Entries } from '../models/entries';
import { EntriesPoint } from '../models/entries-point';
import { Entry } from '../models/entry';
import { Filter } from '../models/filter';
import { Link } from '../models/link';
import { Pagination } from '../models/pagination';
import { Token } from '../models/token';
import { Keyword } from './../models/keyword';
import { KeywordCatalogue } from './../models/keyword-catalogue';
import { MetadataField } from './../models/metadata-field';
import { MetadataTableFields } from './../models/metadata-table-fields';
import { ModelArchives } from './../models/model-archives';
import { ModelLink } from './../models/model-link';
import { ModelTables } from './../models/model-tables';
import { QueryFragment } from './../models/query-fragment';
import { QueryBuilderService } from './../providers/query-builder-service';
import { EntryPointResponse } from './response//entry-point-response';
import { ArchiveEntryResponse } from './response/archive-entry-response';
import { EntriesResponse } from './response/entries-response';
import { ErrorResponse } from './response/error-response';
import { KeywordCatalogsResponse } from './response/keyword-catalogs-response';
import { LicensePointResponse } from './response/license-point-response';
import { LocationResponse } from './response/location-response';
import { ModelArchivesPointResponse } from './response/model-archives-point-response';
import { ModelFieldsPointResponse } from './response/model-fields-point-response';
import { ModelTablesPointResponse } from './response/model-tables-point-response';
import { ParentImageEntriesResponse } from './response/parent-image-entries-response';
import { TokenResponse } from './response/token-response';

export class ImsBackendMock extends MockBackend {

  public baseUrl: string = 'http://restserver:9000';
  public segmentName: string = 'Ims Mobile Rest Segement';
  public credential: Credential = new Credential(this.baseUrl, 'admin', 'admin', this.segmentName);
  public unauthorizedResponse: ErrorResponse = new ErrorResponse(new ResponseOptions({
    body: 'HTTP ERROR: 401 UNAUTHORIZED',
    status: 401,
    statusText: 'Unauthorized',
    type: ResponseType.Error
  }));
  public notFoundResponse: ErrorResponse = new ErrorResponse(new ResponseOptions({
    body: 'HTTP ERROR: 404 NOT FOUND',
    status: 404,
    statusText: 'Not Found',
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
  public filterResourceUrl: string = `${this.entriesUrl}/${this.filterId}`;
  public version: string = 'V17Q1';
  // tslint:disable-next-line:no-any
  public versionResponse: any = { version: this.version };
  public tokenName: string = 'EDFC';
  public tokenExpirationDate: string = '2015-10-28T16:45:12Z';
  public token: Token = new Token(this.tokenName, this.tokenExpirationDate);
  public modelArchiveName: string = 'workflow_db1';
  public policeFilter: Filter = new Filter(this.filterResourceUrl, this.filterId.toString(), 'IMS_Mobile_Client', this.modelArchiveName);
  public medicineFilter: Filter = new Filter(this.entriesUrl + '/41', '41', 'IMS_Mobile_Client', 'medref');
  public notAppFilter: Filter = new Filter(this.entriesUrl + '/42', '42', 'Wrong_Filter_Name', 'any_archive');
  public filterTable: Filter[] = [this.policeFilter, this.medicineFilter, this.notAppFilter];
  public containerRequestUrl: string = this.filterResourceUrl + '/Bild/uploads';
  public parentImageEntriesUrl: string = this.filterResourceUrl + '/Fall';
  public query: QueryFragment[] = [new QueryFragment('testkey', 'testvalue')];
  public queryBuilder: QueryBuilderService = new QueryBuilderService();
  public parentImageEntriesUrlWithQuery: string = this.parentImageEntriesUrl + this.queryBuilder.generate(this.query);
  public archiveEntry: ArchiveEntry = new ArchiveEntry('workflow db1', [new ArchiveTableEntry('Art'), new ArchiveTableEntry('Fall', this.parentImageEntriesUrl), new ArchiveTableEntry('Bild', undefined, undefined, this.containerRequestUrl)]);
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
  public modelFieldDefaultLength: number = 10;
  public modelFieldKeywordHref: string = this.entryPointUrl + '/keywordcatalogs/1';
  public modelFieldIdentifier: MetadataField = new MetadataField(this.modelFieldIdentifierName, 'STRING', false, false, true, true, this.modelFieldDefaultLength);
  public modelFieldParentreference: MetadataField = new MetadataField(this.modelFieldParentreferenceName, 'STRING', false, false, true, true, this.modelFieldDefaultLength);
  public modelFieldOptionalString: MetadataField = new MetadataField('OptionalString', 'STRING', false, false, true, false, this.modelFieldDefaultLength, this.modelFieldKeywordHref);
  public modelFields: MetadataTableFields = new MetadataTableFields(this.modelImageTableName, this.modelFieldIdentifierName, this.modelFieldParentreferenceName, [this.modelFieldIdentifier, this.modelFieldParentreference, this.modelFieldOptionalString]);

  public parentImageTableName: string = 'Fall';
  public parentImageModelFieldIdentifierName: string = 'FALL_NR';
  public parentImageModelFieldParentReferenceName: string = 'IDArt';
  public parentImageModelFieldParentreference: MetadataField = new MetadataField(this.parentImageModelFieldParentReferenceName, 'STRING', false, false, true, true, this.modelFieldDefaultLength);
  public parentImageModelFieldIdentifier: MetadataField = new MetadataField(this.parentImageModelFieldIdentifierName, 'STRING', false, false, true, true, this.modelFieldDefaultLength);
  public parentImageModelFieldOptionalString: MetadataField = new MetadataField('OptionalString', 'STRING', false, false, true, false, this.modelFieldDefaultLength);
  public parentImageModelFields: MetadataTableFields = new MetadataTableFields(this.parentImageTableName, this.parentImageModelFieldIdentifierName, this.parentImageModelFieldParentReferenceName, [this.parentImageModelFieldIdentifier, this.parentImageModelFieldParentreference, this.parentImageModelFieldOptionalString]);
  public keywordLeaf: Keyword = new Keyword('leaf');
  public keywordParent: Keyword = new Keyword('keywordparent', [this.keywordLeaf]);
  public keywordCatalogue: KeywordCatalogue = new KeywordCatalogue('1', 'Test KeywordCatalogue', [this.keywordParent]);

  constructor() {
    super();
    this.connections.subscribe((connection) => {
      if (!connection.request.url.startsWith(this.baseUrl)) {
        connection.mockError(this.notFoundResponse);
      } else if (connection.request.headers.get('authorization') !== ('Basic ' + btoa(`${this.credential.username}:${this.credential.password}`))) {
        connection.mockError(this.unauthorizedResponse);
      } else {
        const urlFragments = connection.request.url.replace(this.baseUrl + '/', '').split(/[\/\?&]/);
        this.handleRequest(connection, urlFragments, this.generateMockStruct());
      }
    });
  }

  // tslint:disable-next-line:no-any
  public generateMockStruct(): any {
    return {
      rest: {
        [RequestMethod.Get]: new EntryPointResponse([new Link('license', this.licenseUrl), new Link('info', this.infoUrl), new Link('entries', this.entriesUrl), new Link('models', this.modelsUrl)]),
        license: {
          [RequestMethod.Get]: new LicensePointResponse(undefined, new Link('tokens', this.tokensUrl)),
          tokens: {
            [RequestMethod.Post]: new LocationResponse(this.tokenLoadingUrl),
            ABCDE: {
              [RequestMethod.Get]: new TokenResponse(this.token)
            }
          }
        },
        info: {
          [RequestMethod.Get]: new Response(new ResponseOptions({ body: this.versionResponse }))
        },
        entries: {
          [RequestMethod.Get]: new EntriesResponse(new EntriesPoint(this.filterTable)),
          [this.filterId]: {
            [RequestMethod.Get]: new ArchiveEntryResponse(this.archiveEntry),
            Fall: {
              'testkey=testvalue': {
                [RequestMethod.Get]: new ParentImageEntriesResponse(this.parentImageEntries),
                'start=20': {
                  'pageSize=20': {
                    [RequestMethod.Get]: new ParentImageEntriesResponse(this.parentImageEntriesNextPage)
                  }
                }
              }
            },
            Bild: {
              uploads: {
                [RequestMethod.Post]: new LocationResponse(this.uploadContainerUrl),
                XYZ: {
                  [RequestMethod.Post]: new LocationResponse(this.imageLocationUrl),
                }
              }
            }
          }
        },
        keywordcatalogs: {
          1: {
            [RequestMethod.Get]: new KeywordCatalogsResponse(this.keywordCatalogue)
          }
        },
        models: {
          [RequestMethod.Get]: new ModelArchivesPointResponse(this.modelArchives),
          workflow_db1: {
            [RequestMethod.Get]: new ModelTablesPointResponse(this.modelTables),
            Fall: {
              [RequestMethod.Get]: new ModelFieldsPointResponse(this.parentImageModelFields),
            },
            Bild: {
              [RequestMethod.Get]: new ModelFieldsPointResponse(this.modelFields)
            }
          }
        }
      }
    };
  }

  // tslint:disable-next-line:no-any
  public handleRequest(connection: any, urlFragments: string[], mockStructFragment: any): void {
    if (urlFragments.length === 0) {
      if (connection.request.method in mockStructFragment) {
        connection.mockRespond(mockStructFragment[connection.request.method]);
      } else {
        connection.mockError(new Error(`RequestMethod ${connection.request.method} not supported at ${connection.request.url}`));
      }
    } else {
      const fragment = urlFragments.shift();
      if (fragment in mockStructFragment) {
        this.handleRequest(connection, urlFragments, mockStructFragment[fragment]);
      } else {
        connection.mockError(new Error(`No handling for: ${connection.request.url}`));
      }
    }
  }
}
