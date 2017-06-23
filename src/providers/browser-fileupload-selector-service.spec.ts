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

  it('should return an image when a event from file picker is called', inject([BrowserFileuploadSelectorService], (browserFileuploadSelectorService: BrowserFileuploadSelectorService) => {
    let fileName = 'file.jpg';
    let fileURI = '/dev/0/';
    let file: File = new File([new Blob()], fileName);
    let event = { target: { files: [file], value: 'a' } };
    let referenceImage = new Image(fileName, fileURI, file);
    spyOn(window.URL, 'createObjectURL').and.returnValue(fileURI);
    let returnedImage = browserFileuploadSelectorService.getImageFromFilePicker(event);
    expect(returnedImage).toEqual(referenceImage);
    expect(event.target.value).toBeNull();
  }));

  it('should return an undefined object when a event from file picker with no files is called', inject([BrowserFileuploadSelectorService], (browserFileuploadSelectorService: BrowserFileuploadSelectorService) => {
    let event = { target: { files: [] } };
    let noImage = browserFileuploadSelectorService.getImageFromFilePicker(event);
    expect(noImage).toBeUndefined();
  }));

  it('should return an image when a event from file dropper called', inject([BrowserFileuploadSelectorService], (browserFileuploadSelectorService: BrowserFileuploadSelectorService) => {
    let fileName = 'file.jpg';
    let fileURI = '/dev/0/';
    let file: File = new File([new Blob()], fileName);
    let event = { dataTransfer: { files: [file] } };
    let referenceImage = new Image(fileName, fileURI, file);
    spyOn(window.URL, 'createObjectURL').and.returnValue(fileURI);
    let returnedImage = browserFileuploadSelectorService.getImageFromFileDrop(event);
    expect(returnedImage).toEqual(referenceImage);
  }));

  it('should return first image file list contains multiple files', inject([BrowserFileuploadSelectorService], (browserFileuploadSelectorService: BrowserFileuploadSelectorService) => {
    let fileName1 = 'file1.jpg';
    let fileName2 = 'file1.jpg';
    let fileURI = '/dev/0/';
    let file1: File = new File([new Blob()], fileName1);
    let file2: File = new File([new Blob()], fileName2);
    let event = { dataTransfer: { files: [file1, file2] } };
    let referenceImage = new Image(fileName1, fileURI, file1);
    spyOn(window.URL, 'createObjectURL').and.returnValue(fileURI);
    let returnedImage = browserFileuploadSelectorService.getImageFromFileDrop(event);
    expect(returnedImage).toEqual(referenceImage);
  }));

  it('should return an undefined object when a event from file picker with no files is called', inject([BrowserFileuploadSelectorService], (browserFileuploadSelectorService: BrowserFileuploadSelectorService) => {
    let event = { dataTransfer: { files: [] } };
    let noImage = browserFileuploadSelectorService.getImageFromFileDrop(event);
    expect(noImage).toBeUndefined();
  }));
});
