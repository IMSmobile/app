import { BrowserFileuploadSelectorService } from './browser-fileupload-selector-service';
import { Image } from './../models/image';
import { TestBed, inject, async } from '@angular/core/testing';

describe('Provider: BrowserFileuploadSelectorService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        BrowserFileuploadSelectorService
      ],
      imports: []
    }).compileComponents();
  }));

  it('should return an image when a event with files is called', inject([BrowserFileuploadSelectorService], (browserFileuploadSelectorService: BrowserFileuploadSelectorService) => {
    let fileName = 'file.jpg';
    let fileURI = '/dev/0/';
    let file: File = new File([new Blob()], fileName);
    let event = { target: { files: [file], value: 'a' } };
    let referenceImage = new Image(fileName, fileURI, file);
    spyOn(window.URL, 'createObjectURL').and.returnValue(fileURI);
    let returnedImage = browserFileuploadSelectorService.getImageFromFileList(event);
    expect(returnedImage).toEqual(referenceImage);
    expect(event.target.value).toBeNull();
  }));

  it('should return an undefined object when a event with no files is called', inject([BrowserFileuploadSelectorService], (browserFileuploadSelectorService: BrowserFileuploadSelectorService) => {
    let event = { target: { files: [] } };
    let noImage = browserFileuploadSelectorService.getImageFromFileList(event);
    expect(noImage).toBeUndefined();
  }));
});
