import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonImg } from '@ionic/react';
import './Tab1.css';
import { useCamera } from '@ionic/react-hooks/camera';
import { base64FromPath } from '@ionic/react-hooks/filesystem';
import { CameraResultType, CameraSource } from "@capacitor/core";

const API_SERVER = 'https://be-app-hiring-bixinf-test.22ad.bi-x.openshiftapps.com';
const API_USER = 'admin';
const API_PASSWORD = 'secret';

type Props = { serverStatus: string; };

function Tab1() {
  const [serverStatus, setServerStatus] = useState<String>('');
  const [fileName, setFileName] = useState<String>('');
  const { getPhoto } = useCamera();

  const checkServerStatus = () => {
    return fetch(`${API_SERVER}/api/v1.0/status`)
      .then(response => response.json())
      .then(data => {
        setServerStatus(data.status.toUpperCase())
      });
  }

  const takePhoto = async () => {
    const cameraPhoto = await getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    let base64Data = await base64FromPath(cameraPhoto.webPath!);
    async function postPhoto(url = '', data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
          'Authorization': 'Basic ' + btoa(API_USER + ":" + API_PASSWORD),
          'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
      });
      return response.json();
    }    
    
    postPhoto(`${API_SERVER}/api/v1.0/ranking`, { picture: base64Data })
      .then(data => {
        setFileName(data.file); 
    });

  }

  return (
    <IonPage>
      <IonContent style={{position: 'relative'}}>
        { fileName ? <IonGrid>
            <IonRow>
              <IonImg src={`${API_SERVER}/api/v1.0/image/${fileName}`} />
            </IonRow>
          </IonGrid>  
          : <>
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
          </>   
        } 
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
