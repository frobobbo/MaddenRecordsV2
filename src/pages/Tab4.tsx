import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import ReactJson from "react-json-view";
import config from '../firebaseConfig';

import { FirestoreProvider, FirestoreCollection } from "@react-firebase/firestore";
import './Tab4.css';

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