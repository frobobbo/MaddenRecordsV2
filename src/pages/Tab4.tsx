import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import ReactJson from "react-json-view";

import { FirestoreProvider, FirestoreCollection } from "@react-firebase/firestore";
import './Tab4.css';

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

const Tab4: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><img src='/assets/imgs/madden20.png' alt="HeaderLogo" /></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
			<FirestoreProvider {...config} firebase={firebase}>
				<FirestoreCollection path="/players/" limit={2}>
				  {d => {
					return !d.isLoading ? (
					  <ReactJson src={d} />
					) : (
					  "Loading"
					);
				  }}
				</FirestoreCollection>
			</FirestoreProvider>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;