import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import { ArchiveEntry } from '../models/archive-entry';
import { ArchiveTableEntry } from '../models/archive-table-entry';
import { EntriesPoint } from '../models/entries-point';
import { EntryPoint } from '../models/entry-point';
import { Filter } from '../models/filter';
import { ImsHeaders } from '../models/ims-headers';
import { LicensePoint } from '../models/license-point';
import { Link } from '../models/link';
import { Token } from '../models/token';
import { ModelArchives } from './../models/model-archives';
import { AuthService } from './auth-service';

@Injectable()
export class ImsService {

  private readonly parentImageTableOffset: number = 1;

  constructor(public http: Http, public authService: AuthService) { }

  public getTokensUrl(): Observable<string> {
    return this.getLicensePoint().map(licensePoint => licensePoint.sessions.dataHref);
  }

  public getEntriesFilterUrl(filterId: number): Observable<string> {
    return this.getEntriesTable().map(entriesPoint => entriesPoint.filters.find(this.findFilterLinkById, filterId).dataHref);
  }

  public getEntriesTable(): Observable<EntriesPoint> {
    return this.getEntryPointLink('entries').flatMap(entriesUrl =>
      this.get(entriesUrl).map(response => {
        const data = response.json();
        return new EntriesPoint(data.filters);
      }));
  }

  public getUploadsLink(filterId: number, token: Token): Observable<string> {
    return this.getArchiveEntry(filterId, token).map(entry => entry.tables.find(this.findImageTable).uploadHref);
  }

  public getParentImageEntriesLink(filterId: number, token: Token): Observable<string> {
    return this.getArchiveEntry(filterId, token).map(entry => this.findParentImageTable(entry).dataHref);
  }

  public getEntryPointLink(linkConstant: string): Observable<string> {
    return this.getEntryPoint().map(entryPoint => entryPoint.links.find(this.findEntryPointLinkByName, linkConstant).dataHref);
  }

  public get(url: string): Observable<Response> {
    const headers = new ImsHeaders(this.authService.currentCredential);
    return this.http.get(url, { headers: headers });
  }

  public getModelArchives(): Observable<ModelArchives> {
    return this.getEntryPointLink('models').flatMap(entriesUrl =>
      this.get(entriesUrl).map(response => response.json()));
  }

  private getArchiveEntry(filterId: number, token: Token): Observable<ArchiveEntry> {
    return this.getEntriesFilterUrl(filterId).flatMap(filterUrl =>
      this.http.get(filterUrl, { headers: new ImsHeaders(this.authService.currentCredential, token) }).map(response => response.json()));
  }

  private getLicensePoint(): Observable<LicensePoint> {
    return this.getEntryPointLink('license').flatMap(licenseUrl =>
      this.get(licenseUrl).map(response => response.json()));
  }

  private getEntryPoint(): Observable<EntryPoint> {
    return this.get(this.authService.currentCredential.server + this.authService.restPath).map(response => response.json());
  }

  private findImageTable(tableEntry: ArchiveTableEntry): boolean {
    return 'uploadHref' in tableEntry && tableEntry.uploadHref !== undefined;
  }

  private findParentImageTable(archiveEntry: ArchiveEntry): ArchiveTableEntry {
    return archiveEntry.tables[(archiveEntry.tables.length - this.parentImageTableOffset - 1)];
  }

  private findEntryPointLinkByName(this: string, link: Link): boolean {
    return link.link === this;
  }

  private findFilterLinkById(this: number, filter: Filter): boolean {
    return filter.id === this.toString();
  }
}
