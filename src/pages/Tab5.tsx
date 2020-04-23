import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonListHeader, IonItem, IonLabel } from '@ionic/react';

import './Tab5.css';

const Tab5: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><img src='/assets/imgs/madden20.png' alt="HeaderLogo" /></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

		<IonList lines="full">
			<IonListHeader>
			  Games
			</IonListHeader>

			<IonItem>
			<img id="TeamLogo1" src="/assets/teams/DET.png" alt="listItem" />
			  <IonLabel id={50<52 ? 'teamLLabel' : 'teamWLabel'}>
				<h2>Brett</h2>
				<h2>50</h2>
			  </IonLabel>
			  <IonLabel id={50>52 ? 'teamLLabel' : 'teamWLabel'}>
				<h2>Scott</h2>
				<h2>52</h2>
			  </IonLabel>
				<img id="TeamLogo2" src="/assets/teams/CIN.png" alt="listItem" />
			</IonItem>

			<IonItem>
			<img id="TeamLogo1" src="/assets/teams/PIT.png" alt="listItem" />
			  <IonLabel id="team1Label">
				<h2>Brett</h2>
				<h2>50</h2>
			  </IonLabel>
			  <IonLabel id="team2Label">
				<h2>Scott</h2>
				<h2>52</h2>
			  </IonLabel>
				<img id="TeamLogo2" src="/assets/teams/SF.png" alt="listItem" />
			</IonItem>

			<IonItem>
			<img id="TeamLogo1" src="/assets/teams/SEA.png" alt="listItem" />
			  <IonLabel id="team1Label">
				<h2>Brett</h2>
				<h2>50</h2>
			  </IonLabel>
			  <IonLabel id="team2Label">
				<h2>Scott</h2>
				<h2>52</h2>
			  </IonLabel>
				<img id="TeamLogo2" src="/assets/teams/DEN.png" alt="listItem" />
			</IonItem>
		  </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Tab5;
