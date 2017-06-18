import { Observable } from 'rxjs/Observable';
import { PictureRequesterService } from './picture-requester.service';
import { Image } from './../models/image';
import { TestBed, inject, async } from '@angular/core/testing';
import { CameraService } from './camera-service';
import { Camera } from '@ionic-native/camera';

describe('Provider: PictureRequesterService', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [],

      providers: [
        PictureRequesterService,
        CameraService,
        Camera,
      ],
      imports: []
    }).compileComponents();
  }));

  it('returns gallery picture from camera', inject([PictureRequesterService, CameraService], (pictureRequesterService: PictureRequesterService, cameraService: CameraService) => {
    let testImage = new Image('picture', '/my/picture.jpg');
    spyOn(cameraService, 'getGalleryPicture').and.returnValue(Observable.of(testImage));
    pictureRequesterService.requestPicture().subscribe(
      img => expect(img).toEqual(testImage),
      err => fail('should load correct image')
    );
  }));
});
