export class CameraMock {
  DestinationType = { 'FILE_URI': 'FILE_URI' };
  EncodingType = { 'JPEG': 'JPEG' };
  MediaType = { 'PICTURE': 'PICTURE' };
  PictureSourceType = { 'CAMERA': 'CAMERA', 'PHOTOLIBRARY': 'PHOTOLIBRARY' };

  getPicture(options) {
    return new Promise((resolve, reject) => {
      let categories = ['abstract', 'animals', 'business', 'cats', 'city', 'food', 'nightlife', 'fashion', 'people', 'nature', 'sports', 'technics', 'transport'];
      let randomImageNumber = Math.floor(Math.random() * 10) + 1;
      let randomCategoryNumber = Math.floor(Math.random() * (categories.length - 1));
      let category = categories[randomCategoryNumber];
      resolve('http://lorempixel.com/800/1024/' + category + '/' + randomImageNumber);
    });
  }
}
