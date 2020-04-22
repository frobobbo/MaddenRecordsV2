import React, {useState} from 'react';
import { IonContent, IonHeader, IonPage, IonCard,  IonCardHeader, IonCardTitle, IonCardContent, IonTitle, IonToolbar } from '@ionic/react';
import './Add.css';
import AddGame from '../AddGame';

const Add: React.FC = () => {
  const [current, setCurrent] = useState(null);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><img src='/assets/imgs/madden20.png' alt="HeaderLogo" /></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonCard id="MainCard">
		  <IonCardHeader>
			<IonCardTitle><div id="Header">New Game</div></IonCardTitle>
		  </IonCardHeader>
		  <IonCardContent>
          <AddGame initialValue={current} clear={()=>setCurrent(null)} key="adfasdfasdf"/>
          </IonCardContent>
          </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Add;  