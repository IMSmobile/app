import { Credential } from './credential';
import { ImsFileUploadHeaders } from './ims-file-upload-headers';


describe('Model: ImsFileUploadHeader', () => {


  it('Should quote filename', () => {
    let fileName = 'file with space.jpg';
    let image = new ImsFileUploadHeaders(new Credential('', '', ''), null, fileName);
    expect(image.get('Content-Disposition')).toEqual('attachment; filename="file with space.jpg"');
  });
});
