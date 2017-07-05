import { ImsFileTypeError } from './../models/errors/ims-file-type-error';
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

  it('should return an image when an event from file picker is called', inject([BrowserFileuploadSelectorService], (browserFileuploadSelectorService: BrowserFileuploadSelectorService) => {
    const fileName = 'file.jpg';
    const fileURI = '/dev/0/';
    const file: File = new File([new Blob()], fileName, {type: browserFileuploadSelectorService.allowedFileTypes[0]});
    const event = { target: { files: [file], value: 'a' } };
    const referenceImage = new Image(fileName, fileURI, file);
    spyOn(window.URL, 'createObjectURL').and.returnValue(fileURI);
    const returnedImage = browserFileuploadSelectorService.getImageFromFilePicker(event);
    expect(returnedImage).toEqual(referenceImage);
    expect(event.target.value).toBeNull();
  }));

  it('should not return anything when file list has no files', inject([BrowserFileuploadSelectorService], (browserFileuploadSelectorService: BrowserFileuploadSelectorService) => {
    const fileList: FileList = Object.setPrototypeOf([], FileList);
    const noImage = browserFileuploadSelectorService.getImageFromFileList(fileList);
    expect(noImage).toBeUndefined();
  }));

  it('should throw ims file type error when file type is not allowed', inject([BrowserFileuploadSelectorService], (browserFileuploadSelectorService: BrowserFileuploadSelectorService) => {
    const fileList: FileList = Object.setPrototypeOf([], FileList);
    const fileName = 'invalid.txt';
    const file: File = new File([new Blob()], fileName, {type: 'text/plain'});
    fileList[0] = file;
    expect(() => browserFileuploadSelectorService.getImageFromFileList(fileList)).toThrowError(ImsFileTypeError);
  }));

  it('should return an image when an event from file dropper called', inject([BrowserFileuploadSelectorService], (browserFileuploadSelectorService: BrowserFileuploadSelectorService) => {
    const fileName = 'file.jpg';
    const fileURI = '/dev/0/';
    const file: File = new File([new Blob()], fileName, {type: browserFileuploadSelectorService.allowedFileTypes[0]});
    const event = { dataTransfer: { files: [file] } };
    const referenceImage = new Image(fileName, fileURI, file);
    spyOn(window.URL, 'createObjectURL').and.returnValue(fileURI);
    const returnedImage = browserFileuploadSelectorService.getImageFromFileDrop(event);
    expect(returnedImage).toEqual(referenceImage);
  }));

  it('should return first image file when list contains multiple files', inject([BrowserFileuploadSelectorService], (browserFileuploadSelectorService: BrowserFileuploadSelectorService) => {
    const fileName1 = 'file1.jpg';
    const fileName2 = 'file1.jpg';
    const fileURI = '/dev/0/';
    const file1: File = new File([new Blob()], fileName1, {type: browserFileuploadSelectorService.allowedFileTypes[0]});
    const file2: File = new File([new Blob()], fileName2, {type: browserFileuploadSelectorService.allowedFileTypes[0]});
    const event = { dataTransfer: { files: [file1, file2] } };
    const referenceImage = new Image(fileName1, fileURI, file1);
    spyOn(window.URL, 'createObjectURL').and.returnValue(fileURI);
    const returnedImage = browserFileuploadSelectorService.getImageFromFileDrop(event);
    expect(returnedImage).toEqual(referenceImage);
  }));

  it('should return an undefined object when an event from file picker with no files is called', inject([BrowserFileuploadSelectorService], (browserFileuploadSelectorService: BrowserFileuploadSelectorService) => {
    const event = { dataTransfer: { files: [] } };
    const noImage = browserFileuploadSelectorService.getImageFromFileDrop(event);
    expect(noImage).toBeUndefined();
  }));
});
