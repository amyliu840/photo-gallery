import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import './ScanQrCode.css';

const ScanQrCode: React.FC = () => {

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
          >Scan QR Code</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ScanQrCode;
