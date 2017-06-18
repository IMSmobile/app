import { ImsHeaders } from './ims-headers';
import { Credential } from './credential';
import { Token } from './token';

export class ImsFileUploadHeaders extends ImsHeaders {

 constructor(credential: Credential, token: Token, fileName: string) {
    super(credential, token);
    this.set('Content-Type', 'application/octet-stream');
    this.set('Content-Disposition', 'attachment; filename=' + fileName);
  }
}
