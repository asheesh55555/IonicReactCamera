import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
  IonFab,
  IonFabButton,
  IonIcon
} from "@ionic/react";
import React, { Component } from "react";
import { Plugins, CameraResultType } from "@capacitor/core";
import { Camera, CameraOptions } from '@ionic-enterprise/camera/lib';
// const { Camera } = Plugins;
const INITIAL_STATE = {
  photo: ""
};

export class Home extends Component {
  state: any = {};
  props: any = {};
  constructor(props: any) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  // async takePicture() {
  //   const image = await Camera.getPhoto({
  //     quality: 90,
  //     allowEditing: false,
  //     resultType: CameraResultType.Uri
  //   });
  //   var imageUrl = image.webPath;
  //   // Can be set to the src of an image now
  //   this.setState({
  //     photo: imageUrl
  //   });
  // }

  async takePicture() {
    console.log("nikunj0 " );
      const options = {
          quality: 100,
          destinationType: Camera.DestinationType.FILE_URI,
          encodingType: Camera.EncodingType.JPEG,
          mediaType: Camera.MediaType.PICTURE
        }
        
        Camera.getPicture(options).then((imageData) => {
         // imageData is either a base64 encoded string or a file URI
         // If it's base64 (DATA_URL):
         
         let base64Image = 'data:image/jpeg;base64,' + imageData;
         console.log("nikunj1 ", base64Image );
         return base64Image;
        }, (err) => {
          console.log("nikunj2 ",err );
        });
  
      //takePhoto1();
    }

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
          <IonImg
            style={{ border: "1px solid black", minHeight: "100px" }}
            src={photo}
          ></IonImg>
          <IonFab
            color="primary"
            vertical="bottom"
            horizontal="center"
            slot="fixed"
          >
            <IonFabButton color="primary" onClick={() => this.takePicture()}>
              <IonIcon name="add" />
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    );
  }
}
export default Home;
