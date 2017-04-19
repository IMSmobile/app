import { Camera } from '@ionic-native/camera';
import { MockCamera } from '../providers/test/mock-camera';

export const CameraProvider = [
  { provide: Camera, useClass: (document.URL.includes('https://') || document.URL.includes('http://')) ? MockCamera : Camera },
];
