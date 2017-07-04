import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Info } from '../models/info';
import { Credential } from './../models/credential';
import { ImsHeaders } from '../models/ims-headers';
import { EntryPoint } from '../models/entry-point';
import { LicensePoint } from '../models/license-point';
import { EntriesPoint } from '../models/entries-point';
import { Token } from '../models/token';
import { ArchiveEntry } from '../models/archive-entry';
import { ArchiveTableEntry } from '../models/archive-table-entry';
import { Link } from '../models/link';
import { Filter } from '../models/filter';
import { ModelArchives } from './../models/model-archives';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class ImsService {

  constructor(public http: Http) {

  }

  getTokensUrl(credential: Credential): Observable<string> {
    return this.getLicensePoint(credential).map(licensePoint => licensePoint.sessions.dataHref);
  }

  getEntriesFilterUrl(credential: Credential, filterId: number): Observable<string> {
    return this.getEntriesTable(credential).map(entriesPoint => entriesPoint.filters.find(this.findFilterLinkById, filterId).dataHref);
  }

  getInfo(credential: Credential): Observable<Info> {
    return this.getEntryPointLink(credential, 'info').flatMap(infoUrl => {
      return this.get(credential, infoUrl).map(response => {
        return response.json();
      });
    });
  }

  getEntriesTable(credential: Credential): Observable<EntriesPoint> {
    return this.getEntryPointLink(credential, 'entries').flatMap(entriesUrl => {
      return this.get(credential, entriesUrl).map(response => {
        let data = response.json();
        return new EntriesPoint(data.filters);
      });
    });
  }

  getUploadsLink(credential: Credential, filterId: number, token: Token): Observable<string> {
    return this.getArchiveEntry(credential, filterId, token).map(entry => entry.tables.find(this.findImageTable).uploadHref);
  }

  getParentImageEntriesLink(credential: Credential, filterId: number, token: Token): Observable<string> {
    return this.getArchiveEntry(credential, filterId, token).map(entry => this.findParentImageTable(entry).dataHref);
  }

  getArchiveEntry(credential: Credential, filterId: number, token: Token): Observable<ArchiveEntry> {
    return this.getEntriesFilterUrl(credential, filterId).flatMap(filterUrl => {
      return this.http.get(filterUrl, { headers: new ImsHeaders(credential, token) }).map(response => response.json());
    });
  }

  getLicensePoint(credential: Credential): Observable<LicensePoint> {
    return this.getEntryPointLink(credential, 'license').flatMap(licenseUrl => {
      return this.get(credential, licenseUrl).map(response => response.json());
    });
  }

  getEntryPointLink(credential: Credential, linkConstant: string): Observable<string> {
    return this.getEntryPoint(credential).map(entryPoint => entryPoint.links.find(this.findEntryPointLinkByName, linkConstant).dataHref);
  }

  getEntryPoint(credential: Credential): Observable<EntryPoint> {
    return this.get(credential, credential.server + '/rest').map(response => response.json());
  }

  get(credential: Credential, url: string): Observable<Response> {
    let headers = new ImsHeaders(credential);
    return this.http.get(url, { headers: headers });
  }

  getModelArchives(credential: Credential): Observable<ModelArchives> {
    return this.getEntryPointLink(credential, 'models').flatMap(entriesUrl => {
      return this.get(credential, entriesUrl).map(response => response.json());
    });
  }
  private findImageTable(tableEntry: ArchiveTableEntry): boolean {
    return tableEntry.uploadHref !== null;
  }

  private findParentImageTable(archiveEntry: ArchiveEntry): ArchiveTableEntry {
    return archiveEntry.tables[(archiveEntry.tables.length - 2)];
  }

  private findEntryPointLinkByName(this: string, link: Link): boolean {
    return link.link === this;
  }

  private findFilterLinkById(this: number, filter: Filter): boolean {
    return filter.id === this.toString();
  }
}
