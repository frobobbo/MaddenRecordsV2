import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";

import './Tab5.css';

class Tab5 extends React.Component {
	
	constructor(props: any) {
		super(props);
		
		this.state = {
			players: []
		};
	}

	  componentDidMount() {
		db.collection("players")
		  .get()
		  .then(querySnapshot => {
			const data = querySnapshot.docs.map(doc => doc.data());
			console.log(data);
			this.setState({ players: data });
		  });
    }	

	render() {
		const { players: any } = this.state;

	  return (
		<IonPage>
		  <IonHeader>
			<IonToolbar>
			  <IonTitle><img src='/assets/imgs/madden20.png' alt="HeaderLogo" /></IonTitle>
			</IonToolbar>
		  </IonHeader>
		  <IonContent>
			<h2>test</h2>
		  </IonContent>
		</IonPage>
		);
	}
}

export default Tab5;