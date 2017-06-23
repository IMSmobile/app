##How to update graphics from ims mobile app
For customize the app for customers, there is a easy way to change the graphics in the mobile app. Try to keep the quantity of images low for an easier maintenance of the app. 

### Change Splashscreen
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
