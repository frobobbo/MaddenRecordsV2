import React, {useState} from 'react';
import { IonFab, IonModal, IonButton, IonFabButton, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {add} from "ionicons/icons";
import './Tab2.css';
import GameList from '../gamelist';
import AddGame from '../AddGame';

const Tab2: React.FC = () => {
  const [current, setCurrent] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
      <IonModal isOpen={showModal}>
			<AddGame initialValue={current} clear={()=>setCurrent(null)} key="adfasdfasdf"/>
    	    <IonButton onClick={() => setShowModal(false)}>
			<IonIcon name="close" slot="icon-only"></IonIcon>
        	</IonButton>
      	</IonModal>
          <GameList doEdit={setCurrent} setShowModal={setShowModal}/>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
