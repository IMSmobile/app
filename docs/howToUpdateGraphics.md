# Udate graphics from ims mobile client
For customize the app for customers, there is a easy way to change the graphics in the mobile app. Try to keep the quantity of images low for an easier maintenance of the app. 

## Change Splashscreen
The splashscreen is the loading screen while starting the app. For changing the splashscreen, please follow these steps:
1. Replace the splash-file in /resources with a new graphic.  
  Requirements for new graphic:
   - png, psd or ai fileformat
   - resolution at least 2208px x 2208px
   - place the artwork in the middle of the picture, the borders will be croped for an optimized view for different devices
   - filename must be 'splash'
2. Start ionic transformation function in CLI:
```shell
ionic cordova resources --splash
```

Note: For platform specific splashscreen place the imagefile into the platform specific directory e.g /resources/ios or /resources/android and remove the file in the parent directory.

## Change Icon
The icon will be showed on Homescreen on the operating system.
1. Replace the icon-file in /resources with a new graphic.  
  Requirements for new graphic:
   - png, psd or ai fileformat
   - resolution at least 192px x 192px
   - filename must be 'icon'
2. Start ionic transformation function in CLI (the transformation service is provided from ionic server itself):
```shell
ionic cordova resources --icon
```
Note: For a platform specific icon view note from "Change splashscreen". Transparent background images are only recommendend with android icons.

## Change logo on loginpage
1. Replace the imagefile logo.png in src/assets/images with a new image.  
Requirements for new graphic:
   - png fileformat
   - resolution should be 192px x 192px
   - filename must be 'logo.png'

Note: For more possibilities (filetype, resolution), a change in  src/page/login/login.html is required.
