import { Credential } from './credential';
import { ImsHeaders } from './ims-headers';
import { Token } from './token';

export class ImsFileUploadHeaders extends ImsHeaders {

  constructor(credential: Credential, token: Token, fileName: string) {
    super(credential, token);
    this.set('Content-Type', 'application/octet-stream');
    this.set('Content-Disposition', 'attachment; filename="' + fileName + '"');
  }
}
