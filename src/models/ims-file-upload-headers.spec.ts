import { Credential } from './credential';
import { ImsFileUploadHeaders } from './ims-file-upload-headers';

describe('Model: ImsFileUploadHeader', () => {

  it('Should quote filename', () => {
    const fileName = 'file with space.jpg';
    const image = new ImsFileUploadHeaders(new Credential('', '', ''), null, fileName);
    expect(image.get('Content-Disposition')).toEqual('attachment; filename="file with space.jpg"');
  });
});
