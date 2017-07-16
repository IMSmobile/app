import { TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MobileClient } from './app.component';

describe('MobileApp Component', () => {
  let fixture;
  let component;

  beforeEach(() => {
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileClient);
    component = fixture.componentInstance;
  });

  it ('should be created', () => {
    expect(component instanceof MobileClient).toBe(true);
  });

});
