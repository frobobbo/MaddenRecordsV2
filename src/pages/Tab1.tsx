import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle } from '@ionic/react';
import { IonCardContent, IonItem, IonButton, IonIcon, IonFab, IonFabButton, IonThumbnail } from '@ionic/react';
import { heart, share, add } from 'ionicons/icons';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { FirestoreProvider, FirestoreDocument, FirestoreCollection } from "@react-firebase/firestore";
import ReactJson from "react-json-view";

import './Tab1.css';

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

//import ExploreContainer from '../components/ExploreContainer';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><img src='/assets/imgs/madden20.png' alt="HeaderLogo" /></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
         <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
		
        <IonCard id="MainCard" slot="fixed">
		  <IonCardHeader>
			<IonCardTitle><div id="Header">Last Game: 4/15/2020</div></IonCardTitle>
		  </IonCardHeader>
		  <IonCardContent>
  
		  
  		<FirestoreProvider {...config} firebase={firebase}>
			<FirestoreCollection path="/games/" limit={1}>

			  {d => {
				return !d.isLoading ? (
					d.value.map((game: any, i: any) => {
						return (
						<div>
							<div id="row">
								<div id="AwayPlayer">{game.AwayPlayer}</div>
								<div id="HomePlayer">{game.HomePlayer}</div>
							</div>
							<div id="row">
								<div id="AwayBlock">
									<img id="AwayTeamLogo" src="/assets/teams/DET.png" alt="icon" />
								</div>
								<div id="HomeBlock">
									<img id="HomeTeamLogo" src="/assets/teams/GB.png" alt="icon" />
								</div>
							</div>
							<div id="row">
								<div id="AwayScore">{game.AwayScore}</div>
								<div id="HomeScore">{game.HomeScore}</div>
							</div>
						</div>
						);
			  })): (
				  "Loading"
				);
			  }}


			</FirestoreCollection>
		</FirestoreProvider>
							<p>
							  Here’s a small text description for the card component. 
							  Nothing more, nothing less.
							</p>
			<IonItem>
			  <IonButton fill="solid">Action</IonButton>
			  <IonIcon icon={heart} slot="end"></IonIcon>
			  <IonIcon icon={share} slot="end"></IonIcon>
			</IonItem>
		  </IonCardContent>
		</IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
