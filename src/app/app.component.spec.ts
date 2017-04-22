import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MobileClient } from './app.component';

describe('MobileApp Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MobileClient],
      imports: [
        IonicModule.forRoot(MobileClient)
      ],
      providers: [
        StatusBar,
        SplashScreen
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileClient);
    component = fixture.componentInstance;
  });

  it ('should be created', () => {
    expect(component instanceof MobileClient).toBe(true);
  });

});
