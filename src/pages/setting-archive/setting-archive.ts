import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ImsLoadingError } from './../../models/errors/ims-loading-error';
import { Filter } from './../../models/filter';
import { AuthService } from './../../providers/auth-service';
import { ImsService } from './../../providers/ims-service';
import { LoadingService } from './../../providers/loading-service';
import { EntriesPage } from './../entries/entries';
import { LoginPage } from './../login/login';

@Component({
  selector: 'page-setting-archive',
  templateUrl: 'setting-archive.html',
})
export class SettingArchivePage {

  filters: Filter[] = [];
  filterName: string = 'IMS_Mobile_Client';
  noValidFilters: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public imsService: ImsService, public authService: AuthService, public loadingService: LoadingService) {
  }

  ionViewDidLoad(): void {
    const filtersObservable: Observable<Filter[]> = this.imsService.getEntriesTable(this.authService.currentCredential).map(entriesPoint => entriesPoint.filters.filter(filter => filter.name === this.filterName));
    this.loadingService.subscribeWithLoading(filtersObservable, filters => this.initFilter(filters), err => { throw new ImsLoadingError('Filter', err); });
  }

  initFilter(filters: Filter[]): void {
    this.filters = filters;
    this.noValidFilters = filters.length === 0;
  }

  selectFilter(filter: Filter): void {
    this.authService.setArchive(filter);
    this.navCtrl.setRoot(EntriesPage);
  }

  logout(): void {
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}
