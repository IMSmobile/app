import { Credential } from '../../model/credential';
import { ImageEntry } from '../../model/imageEntry';
import { Token } from '../../model/token';
import { ArchiveEntry } from '../../model/archiveEntry';
import { Image } from '../../model/image';
import { Observable } from 'rxjs/Observable';
import { Response, ResponseOptions, Headers } from '@angular/http';
import { FileUploadResult } from '@ionic-native/transfer';
import 'rxjs/add/observable/throw';





export class MockUploadService {
    mockErrorMessage: string;
    transfer: any;
    http: any;
    tokenService: any;
    imsService: any;

    uploadImage(credential: Credential, filterId: number, imageEntry: ImageEntry, image: Image): Observable<Response> {
        if (this.mockErrorMessage) {
            return Observable.throw(new Error(this.mockErrorMessage));
        } else {
            return Observable.of(new Response(new ResponseOptions({ headers: new Headers({ 'status': 200 }) })));
        }
    }

    mockError(message: string) {
        this.mockErrorMessage = message;
    }


    createContainerLocation(credential: Credential, filterId: number, token: Token): Observable<string> {
        return null;
    }

    getArchiveEntry(credential: Credential, filterId: number, token: Token): Observable<ArchiveEntry> {
        return null;
    }

    postToContainer(credential: Credential, url: string, token: Token, image: Image): Observable<FileUploadResult> {
        return null;
    }

    createImageEntry(credential: Credential, url: string, token: Token, imageEntry: ImageEntry): Observable<Response> {
        return null;
    }
}
