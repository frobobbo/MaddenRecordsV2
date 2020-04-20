import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonListHeader, IonItem, IonAvatar, IonLabel } from '@ionic/react';

import * as firebase from 'firebase';
import 'firebase/firestore';

import { FirestoreProvider, FirestoreCollection } from "@react-firebase/firestore";

import './Tab2.css';

// Firebase Config
const config = {
    apiKey: "AIzaSyAnLok7gkB-Gsgqsz38BK8rFrQj-RZhFOA",
    authDomain: "maddenrecords-47d61.firebaseapp.com",
    databaseURL: "https://maddenrecords-47d61.firebaseio.com",
    projectId: "maddenrecords-47d61",
    storageBucket: "maddenrecords-47d61.appspot.com",
    messagingSenderId: "608505473555",
    appId: "1:608505473555:web:50552e677eeb697b3bade6",
    measurementId: "G-42DC5T8RVF"
};


const Tab2: React.FC = () => {
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

		  <IonList>
			<IonListHeader>
			  Games
			</IonListHeader>
			  
	
			<FirestoreProvider {...config} firebase={firebase}>
				<FirestoreCollection path="/players/" limit={1}>
				  {d => {
					return !d.isLoading ? (
						d.value.map((player: any, i: any) => {
							return (
							<IonItem>
							  <IonAvatar slot="start">
								<img src="/assets/imgs/avatar-han.png" alt="listItem" />
							  </IonAvatar>
							<IonLabel>
								<h2>{player.FName}</h2>
								<h2>{player.LName}</h2>
							</IonLabel>
							</IonItem>
							);
				  })): (
					  "Loading"
					);
				  }}
				</FirestoreCollection>
			</FirestoreProvider>
		  </IonList>
		 
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
