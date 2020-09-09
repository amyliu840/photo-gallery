import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import './Tab1.css';
import { usePhotoGallery, Photo } from '../hooks/usePhotoGallery';

const API_SERVER = 'https://be-app-hiring-bixinf-test.22ad.bi-x.openshiftapps.com';
const API_USER = 'admin';
const API_PASSWORD = 'secret';

type Props = { serverStatus: string; };

function Tab1() {
  const [serverStatus, setServerStatus] = useState<String>('');
  const { deletePhoto, photos, takePhoto } = usePhotoGallery();

  const checkServerStatus = () => {
    return fetch(`${API_SERVER}/api/v1.0/status`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setServerStatus(data.status.toUpperCase())
      });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent style={{position: 'relative'}}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton shape="round" fill="outline" color="dark" 
          style={{position: 'absolute', left: '50%', top: '30%', transform: 'translate(-50%, -50%)'}}
          onClick={checkServerStatus}>Check Server Status</IonButton>
        <p style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}
          >Server: {serverStatus}</p>
        {
          serverStatus === 'OK' && <IonButton shape="round" fill="outline" color="dark" 
            style={{position: 'absolute', left: '50%', top: '70%', transform: 'translate(-50%, -50%)'}}
            onClick={takePhoto}>Take photo & upload it</IonButton>     
        } 
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
