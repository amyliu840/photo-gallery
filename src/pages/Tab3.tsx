import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import './Tab3.css';
import { usePhotoGallery, Photo } from '../hooks/usePhotoGallery';


const Tab3: React.FC = () => {
  const { deletePhoto, photos, takePhoto } = usePhotoGallery();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent style={{position: 'relative'}}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton shape="round" fill="outline" color="dark" 
          style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}
          onClick={() => takePhoto()}>Scan QR Code</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
