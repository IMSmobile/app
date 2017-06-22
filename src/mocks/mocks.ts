/* tslint:disable */
// IONIC:
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

export class AlertMock {

  public create(): any {
    let rtn: Object = {};
    rtn['present'] = (() => true);
    return rtn;
  }

  // function actually on the AlertClass (not AlertController), but using these interchangably for now
  public dismiss(): Promise<{}> {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }
}

export class ToastMock {

  public create(): any {
    let rtn: Object = {};
    rtn['present'] = (() => true);
    return rtn;
  }
}

export class ConfigMock {

  public get(): any {
    return '';
  }

  public getBoolean(): boolean {
    return true;
  }

  public getNumber(): number {
    return 1;
  }

  public setTransition(): void {
    return;
  }
}

export class FormMock {
  public register(): any {
    return true;
  }
}

export class NavMock {

  public pop(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }

  public push(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }

  public getActive(): any {
    return {
      'instance': {
        'model': 'something',
      },
    };
  }

  public setRoot(): any {
    return true;
  }

  public popToRoot(): any {
    return true;
  }
}

export class PlatformMock {
  public ready(): Promise<{ String }> {
    return new Promise((resolve) => {
      resolve('READY');
    });
  }

  public registerBackButtonAction(fn: Function, priority?: number): Function {
    return (() => true);
  }

  public hasFocus(ele: HTMLElement): boolean {
    return true;
  }

  public doc(): HTMLDocument {
    return document;
  }

  public is(): boolean {
    return false;
  }

  public getElementComputedStyle(container: any): any {
    return {
      paddingLeft: '10',
      paddingTop: '10',
      paddingRight: '10',
      paddingBottom: '10',
    };
  }

  public onResize(callback: any) {
    return callback;
  }

  public registerListener(ele: any, eventName: string, callback: any): Function {
    return (() => true);
  }

  public win(): Window {
    return window;
  }

  public raf(callback: any): number {
    return 1;
  }

  public timeout(callback: any, timer: number): any {
    return setTimeout(callback, timer);
  }

  public cancelTimeout(id: any) {
    // do nothing
  }

  public getActiveElement(): any {
    return document['activeElement'];
  }
}

export class SplashMock {

  public hide() {
    return Promise.resolve(true);
  }
}

export class StatusMock {

  public styleDefault() {
    return Promise.resolve(true);
  }
}

export class StorageMock {
  store = {};

  public ready(): Promise<{}> {
    return new Promise((resolve: Function) => {
      resolve({});
    });
  }

  public get(key: string): Promise<string> {
    return Promise.resolve(this.store[key]);
  }

  public set(key: string, value: string): Promise<{}> {
    this.store[key] = value;
    return Promise.resolve({});
  }

  public remove(key: string): Promise<{}> {
    return new Promise((resolve: Function) => {
      resolve({ key: key });
    });
  }

  public query(): Promise<{ res: { rows: Array<{}> } }> {
    return new Promise((resolve) => {
      resolve({
        res: {
          rows: [{}]
        }
      });
    });
  }
}

export class MenuMock {
  public close(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

export class AppMock {
  public getActiveNav(): NavMock {
    return new NavMock();
  }
}

export class NavParamsMock {
  static returnParam = null;
  public get(key): any {
    if (NavParamsMock.returnParam) {
      return NavParamsMock.returnParam
    }
    return 'default';
  }
  static setParams(value) {
    NavParamsMock.returnParam = value;
  }
}

export class LoadingMock {

  public create(): any {
    return this;
  }

  public present() {

  }

  public dismiss() {

  }
}
export class PopoverControllerMock {

  public create(): any {
    return this;
  }

  public present() {

  }

  public dismiss() {

  }
}

export class ViewControllerMock {
  public _setHeader(): any {
    return {}
  }
  public _setIONContent(): any {
    return {}
  }
  public _setIONContentRef(): any {
    return {}
  }
  public dismiss() {
  }
}


export class InfiniteScrollMock {
  public enable(enable: boolean) {
  }
  public complete() {
  }
}

/* tslint:enable */
