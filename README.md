https://enappd.com/blog/camera-and-gallery-in-ionic-react-app-using-capacitor/110/











This post is for Ionic React framework, using Capacitor. In this post you’ll learn how to pick/use images using Camera and Photo gallery.

If you are looking for Camera functionality in 

Ionic Angular app — Please check this blog
React Native app — Please check this blog
Ionic React app / Capacitor app — Continue reading 😄
As you can see from above, there are several options available for Hybrid app development these days, and it is easy to get confused between them. This post is focussed on Ionic framework with ReactJS as the front-end framework, and Capacitor as runtime and build environment.

Code for this tutorial is available on Github repo ionic-react-camera-demo
Let’s see a brief intro to each of the included frameworks

What is Ionic ?
You probably already know about Ionic, but I’m putting it here just for the sake of beginners. Ionic is a complete open-source SDK for hybrid mobile app development created by Max Lynch, Ben Sperry and Adam Bradley of Drifty Co. in 2013. 

Ionic provides tools and services for developing hybrid mobile apps using Web technologies like CSS, HTML5, and Sass. Apps can be built with these Web technologies and then distributed through native app stores to be installed on devices by leveraging Cordova environment.

It is important to note the contribution of Cordova in this. Ionic is only a UI wrapper made up of HTML, CSS and JS. So, by default, Ionic cannot run as an app in an iOS or Android device. Cordova is the build environment that containerizes (sort of) this Ionic web app and converts it into a device installable app, along with providing this app access to native APIs like Camera etc.

So, in other words — If you create Native apps in Android, you code in Java. If you create Native apps in iOS, you code in Obj-C or Swift. Both of these are powerful but complex languages. With Cordova (and Ionic) you can write a single piece of code for your app that can run on both iOS and Android (and windows!), that too with the simplicity of HTML, CSS, and JS.

What is Capacitor ?
Now you have some idea of Cordova — Cordova helps build Ionic web app into a device installable app. But there are some limitations of Cordova, which Capacitor tries to overcome with a new App workflow. 

Capacitor is a cross-platform app runtime that makes it easy to build web apps that run natively on iOS, Android, Electron, and the web. Ionic people call these apps “Native Progressive Web Apps” and they represent the next evolution beyond Hybrid apps.

Capacitor is very similar to Cordova, but with some key differences in the app workflow
Let’s check the differences between Cordova and Capacitor

Capacitor considers each platform project a source asset instead of a build time asset. That means, Capacitor wants you to keep the platform source code in the repository. On the other hand, Cordova always assumes that you will generate the platform code on build time
Because of the above, Capacitor does not use config.xml or a similar custom configuration for platform settings. Instead, configuration changes are made by editing AndroidManifest.xml for Android and Info.plist for Xcode
Capacitor does not “run on device” or emulate through the command line. Instead, such operations occur through the platform-specific IDE. So you cannot run an Ionic-capacitor app using a command like ionic run ios . You will have to run iOS apps using Xcode, and Android apps using Android studio
Since platform code is not a source asset, you can directly change the native code using Xcode or Android Studio. This give more flexibility to developers
Capacitor does not copy plugin source code to your app before building. Instead, all plugins are built as Frameworks (on iOS) and Libraries (on Android) and installed using the leading dependency management tool for each platform (CocoaPods and Gradle/Maven, respectively)
In essence, Capacitor is like a fresh, more flexible version of Corodva.

Plugins
Cordova and Ionic Native plugins can be used in Capacitor environment. However, there are certain Cordova plugins which are known to be incompatible with Capacitor.

Other than that, Capacitor also doesn’t support plugin installation with variables. Those changes have to be done manually in the native code.

Why Ionic React ?
(Read carefully)

Since Ionic 4, Ionic has become framework agnostic. Now you can create Ionic apps in Angular, React, Vue or even in plain JS. This gives Ionic great flexibility to be used by all kinds of developers.

It is important to note that Ionic React apps are only supported by Capacitor build environment. 

Same is not true for Ionic Angular apps —  Ionic Angular apps are supported by both Cordova and Capacitor build environments. 

Hence, if you want to build apps in Ionic React, you need to use Capacitor to build the app on device. 

But …

… To build camera / Photo gallery functionality, you can either opt to 

Install a Cordova plugin for Camera, or 
Use Capacitor core camera functionality
I know if can get confusing as 4 frameworks are crossing their paths here. Bottom line for this post — Ionic + React + Capacitor + Camera (using Capacitor core functionality)

Structure of post
I will go step-by-step so everyone can benefit

Create a basic Ionic-react app
Attach Capacitor to your Ionic-react app
Implement Capacitor Camera functionality
Build app on Android, and Test
Explore Camera options
What about Camera in a Web App ?
Let’s get started with Ionic React Camera app ! 

Step 1 — Create a basic Ionic-React app
First you need to make sure you have the latest Ionic CLI. This will ensure you are using everything latest (Duh ! ) . Ensure latest Ionic CLI installation using

$ npm install -g ionic@latest
Creating a basic Ionic-React app is not much different or difficult from creating a basic Ionic-Angular app. Start a basic blank starter using

$ ionic start IonicReactCamera blank --type=react
You see what just happened. The --type=react told the CLI to create a React app, not an Angular app !! 

Run the app in browser using (yes you guessed it right)

$ ionic serve
You won’t see much in the homepage created in the starter. Let’s modify this page to include a floating button and a placeholder for our selected image


Home page of ionic-react camera starter
Home page of ionic-react camera starter
The code for this layout isn’t very complex

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import React, { Component } from 'react';
const INITIAL_STATE = {
  photo: '',
};
export class Home extends Component {
  state: any = {};
  props: any = {};
  constructor(props: any) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  takePicture() {  }

  render() {
    const { photo } = this.state;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Ionic Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonImg style={{ 'border': '1px solid black', 'minHeight': '100px' }} src={photo} ></IonImg>
          <IonFab color="primary" vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton color="primary" onClick={() => this.takePicture()}>
              <IonIcon name="add" />
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage >
    );
  };
}
export default Home;
view rawHome.tsx hosted with ❤ by GitHub
Step 2 — Attach Capacitor to your Ionic-React app
Capacitor can be attached to an existing Ionic app as well. To attach Capacitor to your existing Ionic app, run 

$ ionic integrations enable capacitor
This will attach Capacitor to your Ionic app. After this, you have to init the Capacitor app with 

$ npx cap init
It will ask you the app ID, which is the domain identifier of your app (ex: com.example.app)

Before building the app for Android, let’s first add the code for Camera functionality

Step 3 — Implement Capacitor camera functionality
Similar to a Cordova plugin, Capacitor camera functionality also allows both Camera and Gallery functionalities. Once you implement the Camera function using Capacitor, it will automatically ask you for Camera / Gallery option. 

Import Camera in your app/page with this

import { Plugins, CameraResultType } from '@capacitor/core';
const { Camera } = Plugins;
There are few plugins in-built in Capacitor/core . You can access these by simply importing.

Implement camera capture or gallery selection method like this

async takePicture() {
const image = await Camera.getPhoto({
quality: 90,
allowEditing: false,
resultType: CameraResultType.Uri
});
var imageUrl = image.webPath;
// Can be set to the src of an image now
this.setState({
photo: imageUrl
})
}
Then you can call takePicture function from the floating button click using 

<IonFabButton color="primary" onClick={() => this.takePicture()}>
That’s it ! Camera integrated ! Lol, don’t worry we’ll test it as well.

Step 4 — Build app on Android, and test
Before adding a platform to Capacitor, you need to build the app once. Build the app using 

$ ionic build
Now add Android platform (or iOS)

$ npx cap add android
This should add Android platform to your project. Note, you cannot run the project directly on the phone using CLI in Capacitor. You will have to open the project in Android Studio and run using the Android Studio IDE. Open the project in Android Studio using

$ npx cap open android
Now run the app in your device using Android Studio, and you get this ! (Sample from my One Plus 6T, Android P)

Select photo from Camera

Capture image from Camera in Ionic React App using Capacitor
Capture image from Camera in Ionic React App using Capacitor
Select photo from Gallery
Selecting image from Gallery can be done with same code


Select image from gallery in Ionic React App using Capacitor
Select image from gallery in Ionic React App using Capacitor
🎉🎉🎉 Congrats ! You just implemented Camera and Gallery functionality using Capacitor, in Ionic React App ! 

Step 5 — How about Camera in a web app ? 
As per the development philosophy of Capacitor goes, it is focused entirely on enabling modern web apps to run on all major platforms with ease. That also includes web-app. So let’s see whether our camera app can run on a web-browser as well

Let’s run the app in browser using ionic serve . You’ll probably see an error like this

TypeError: cameraModal.componentOnReady is not a function
Some Capacitor plugins, including the Camera, provide the web-based functionality and UI via the Ionic PWA Elements library. It’s a separate dependency, so install it using the Terminal first

$ npm install @ionic/pwa-elements 
Now import the package in your camera page (or app), and initialize after app is bootstrapped

import { defineCustomElements } from '@ionic/pwa-elements/loader';
and I’ll initialize it in the constructor 

constructor(props: any) {
super(props);
...
defineCustomElements(window);
}
Now run the app in browser using ionic serve and you’ll be able to capture images using your web-cam (Chrome browser)


Capture photo from camera in Ionic React web-App using Capacitor
Capture photo from camera in Ionic React web-App using Capacitor
Step 6 — Explore Camera options 
In the above example, we used minimum Camera options and got away with it. There are many more Camera options you can use to customize user’s experience of clicking/selecting images. Here’s the list of all the options

interface CameraOptions {
  // Whether to allow the user to crop or make small edits (platform specific)
  allowEditing ?: boolean;
  // Whether to automatically rotate the image "up" to correct for orientation in portrait mode Default: true
  correctOrientation ?: boolean;
  // iOS only: The default camera direction. By default the rear camera. Default: CameraDirection.Rear
  direction ?: ;
  // The height of the saved image
  height ?: number;
  // iOS only: The presentation style of the Camera. Defaults to fullscreen.
  presentationStyle ?: any;
  // The quality of image to return as JPEG, from 0-100
  quality ?: number;
  // How the data should be returned. Currently, only 'Base64', 'DataUrl' or 'Uri' is supported
  resultType : ;
  // Whether to save the photo to the gallery/photostream
  saveToGallery ?: boolean;
  // The source to get the photo from. By default this prompts the user to select either the photo album or take a photo. Default: CameraSource.Prompt
  source ?: ;
  // The width of the saved image
  width ?: number;
}
view rawCapacitor Camera Options hosted with ❤ by GitHub
You can find out more about the Capacitor Camera API in the official documentation

Conclusion
In this post, you learnt how to implement Camera and Photo Gallery functionality in your Ionic React apps using Capacitor. We also tested the functionality on Android and web-browser. 

Code for this tutorial is available on Github repo ionic-react-camera-demo
Next Steps
Now that you have learned the implementation of In-app purchase in Ionic React app, you can also try following blogs for Ionic Angular apps

Ionic 4 Payment Gateways — Stripe | PayPal | Apple Pay | RazorPay
Ionic 4 Charts with — Google Charts| HighCharts | d3.js | Chart.js
Ionic 4 Social Logins — Facebook | Google | Twitter
Ionic 4 Authentications — Via Email | Anonymous
Ionic 4 Features — Geolocation | QR Code reader| Pedometer
Media in Ionic 4 — Audio | Video | Image Picker | Image Cropper
Ionic 4 Essentials — Native Storage | Translations | RTL
Ionic 4 messaging — Firebase Push | Reading SMS
Ionic 4 with Firebase — Basics | Hosting and DB | Cloud functions
Ionic Angular Full App Starter
If you need a base to start your next Ionic 4 Angular app, you can make your next awesome app using Ionic 4 Full App