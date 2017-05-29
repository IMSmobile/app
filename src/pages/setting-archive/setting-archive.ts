import { AlertService } from './../../providers/alert-service';
import { Filter } from './../../models/filter';
import { Observable } from 'rxjs/Observable';
import { LoadingService } from './../../providers/loading-service';
import { AuthService } from './../../providers/auth-service';
import { ImsService } from './../../providers/ims-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-setting-archive',
  templateUrl: 'setting-archive.html',
})
export class SettingArchivePage {

  filters: Filter[] = [];
  filterName: string = 'IMS_Mobile_Client';


  constructor(public navCtrl: NavController, public navParams: NavParams, public imsService: ImsService, public authService: AuthService, public loadingService: LoadingService, public alertService: AlertService) {
  }

  ionViewDidLoad() {
    let filtersObservable: Observable<Filter[]> = this.imsService.getEntriesTable(this.authService.currentCredential).map(entriesPoint => entriesPoint.filters.filter(filter => filter.name === this.filterName));
    this.loadingService.subscribeWithLoading(filtersObservable, filters => this.filters = filters, err => this.alertService.showError('Beim Laden der Filter ist ein Fehler aufgetreten'));
  }

}
