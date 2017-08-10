# Update graphics in Mobile Client
This document describes how to change graphics for the Mobile Client. Try to keep the quantity of images low for an easier maintenance of the app. 

**Important prerequisite:** ensure both cordova platforms are installed:
```shell
ionic platform add android
ionic platform add ios
```

## Change Splash Screen
The splash screen is the loading screen that appears during app startup. To change the splash screen, follow these steps:
1. Replace the splash-file in /resources with a new graphic.  
  Requirements for new graphic:
   - `png`, `psd` or `ai` file format
   - resolution at least 2732px x 2732px
   - place the artwork in the middle of the picture, the borders will be cropped for an optimized view for different devices
   - filename must be 'splash'
2. Start ionic transformation function in CLI:

```shell
ionic cordova resources --splash
```

Note: For platform specific splash screen, place the image file into the platform specific directory e.g `/resources/ios` or `/resources/android` and remove the file in the parent directory.

## Update App Icon
The icon will be showed on the home screen of the operating system.
1. Replace the icon.png in /resources/ios and /resources/android folder with a new graphic.  
  Requirements for new graphic:
   - `png`, `psd` or `ai` file format
   - resolution at least 192px x 192px
   - filename must be 'icon'
2. Start ionic transformation function in CLI (the transformation service is provided from ionic server itself):

```shell
ionic cordova resources --icon
```
Note: For a platform specific icon view, note from "Change splash screen". Transparent background images are only recommended with android icons.

## Update logo in loginpage
1. Replace the imagefile logo.png in src/assets/images with a new image.  
Requirements for new graphic:
   - `png` file format
   - resolution should be 192px x 192px
   - filename must be 'logo.png'

Note: For more possibilities (filetype, resolution), a change in  `src/page/login/login.html` is required.
