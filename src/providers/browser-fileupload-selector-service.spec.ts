import { inject, TestBed } from '@angular/core/testing';
import { ImsFileTypeError } from './../models/errors/ims-file-type-error';
import { Image } from './../models/image';
import { BrowserFileuploadSelectorService } from './browser-fileupload-selector-service';

describe('Provider: BrowserFileuploadSelectorService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        BrowserFileuploadSelectorService
      ],
      imports: []
    });
  });

  it('should return an image when an event from file picker is called', inject([BrowserFileuploadSelectorService], (browserFileuploadSelectorService: BrowserFileuploadSelectorService) => {
    const fileName = 'file.jpg';
    const fileURI = '/dev/0/';
    const file: File = new File([new Blob()], fileName, {type: browserFileuploadSelectorService.allowedFileTypes[0]});
    const event = { target: { files: [file], value: 'a' } };
    const referenceImage = new Image(fileName, fileURI, file);
    spyOn(window.URL, 'createObjectURL').and.returnValue(fileURI);
    const returnedImage = browserFileuploadSelectorService.getImagesFromFilePicker(event)[0];
    expect(returnedImage).toEqual(referenceImage);
    expect(event.target.value).toEqual('');
  }));

  it('should not return anything when file list has no files', inject([BrowserFileuploadSelectorService], (browserFileuploadSelectorService: BrowserFileuploadSelectorService) => {
    const fileList: FileList = Object.setPrototypeOf([], FileList);
    const emptyImageList = browserFileuploadSelectorService.getImagesFromFileList(fileList);
    expect(emptyImageList.length).toEqual(0);
  }));

  it('should throw ims file type error when file type is not allowed', inject([BrowserFileuploadSelectorService], (browserFileuploadSelectorService: BrowserFileuploadSelectorService) => {
    const fileList: FileList = Object.setPrototypeOf([], FileList);
    const fileName = 'invalid.txt';
    const file: File = new File([new Blob()], fileName, {type: 'text/plain'});
    fileList[0] = file;
    expect(() => browserFileuploadSelectorService.getImagesFromFileList(fileList)).toThrowError(ImsFileTypeError);
  }));

  it('should return an image when an event from file dropper called', inject([BrowserFileuploadSelectorService], (browserFileuploadSelectorService: BrowserFileuploadSelectorService) => {
    const fileName = 'file.jpg';
    const fileURI = '/dev/0/';
    const file: File = new File([new Blob()], fileName, {type: browserFileuploadSelectorService.allowedFileTypes[0]});
    const event = { dataTransfer: { files: [file] } };
    const referenceImage = new Image(fileName, fileURI, file);
    spyOn(window.URL, 'createObjectURL').and.returnValue(fileURI);
    const returnedImage = browserFileuploadSelectorService.getImagesFromFileDrop(event)[0];
    expect(returnedImage).toEqual(referenceImage);
  }));

  it('should return list of images when list contains multiple files', inject([BrowserFileuploadSelectorService], (browserFileuploadSelectorService: BrowserFileuploadSelectorService) => {
    const fileName1 = 'file1.jpg';
    const fileName2 = 'file1.jpg';
    const fileURI = '/dev/0/';
    const file1: File = new File([new Blob()], fileName1, {type: browserFileuploadSelectorService.allowedFileTypes[0]});
    const file2: File = new File([new Blob()], fileName2, {type: browserFileuploadSelectorService.allowedFileTypes[0]});
    const event = { dataTransfer: { files: [file1, file2] } };
    const referenceImage1 = new Image(fileName1, fileURI, file1);
    const referenceImage2 = new Image(fileName2, fileURI, file2);
    spyOn(window.URL, 'createObjectURL').and.returnValue(fileURI);
    const returnedImage = browserFileuploadSelectorService.getImagesFromFileDrop(event);
    expect(returnedImage[0]).toEqual(referenceImage1);
    expect(returnedImage[1]).toEqual(referenceImage2);
  }));

  it('should return an undefined object when an event from file picker with no files is called', inject([BrowserFileuploadSelectorService], (browserFileuploadSelectorService: BrowserFileuploadSelectorService) => {
    const event = { dataTransfer: { files: [] } };
    const emptyImageList = browserFileuploadSelectorService.getImagesFromFileDrop(event);
    expect(emptyImageList.length).toEqual(0);
  }));
});
