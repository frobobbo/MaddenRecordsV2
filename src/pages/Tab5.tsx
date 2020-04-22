import React, {useState} from 'react';
import { IonFab, IonFabButton, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {add} from "ionicons/icons";
import './Tab5.css';
import GameList from '../gamelist';
import AddGame from '../AddGame';

const Tab5: React.FC = () => {
  const [current, setCurrent] = useState(null);
  return (
    <IonPage>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setCurrent}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      <IonHeader>
        <IonToolbar>
          <IonTitle><img src='/assets/imgs/madden20.png' alt="HeaderLogo" /></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {!current && <GameList doEdit={setCurrent}/> }
        {current && <AddGame initialValue={current} clear={()=>setCurrent(null)} key="adfasdfasdf"/>} 
      </IonContent>
    </IonPage>
  );
};

export default Tab5;
