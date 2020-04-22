import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle } from '@ionic/react';
import { IonCardContent, IonItem, IonButton, IonIcon, IonFab, IonFabButton } from '@ionic/react';
import { heart, share, add } from 'ionicons/icons';

import firebase from 'firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

import './Tab1.css';
import GetPlayer from '../components/getPlayer';
import GetTeamLogo from '../components/getTeamLogo';


const Tab1: React.FC = () => {

	const [games, loading, error] = useCollection(
        firebase.firestore().collection("games").orderBy("createdOn", "desc").limit(1),
        {
            snapshotListenOptions: {includeMetadataChanges: true}
        }
    );


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><img src='/assets/imgs/madden20.png' alt="HeaderLogo" /></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
         <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton href="/Add">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
		<div>{error && <strong>Error: {JSON.stringify(error)}</strong>}</div>
            	<div>{loading && <span>Document: Loading...</span>}</div>
            	{games && games.docs.map(game => {
                  return (
					<IonCard id="MainCard" slot="fixed" key={game.id}>
					<IonCardHeader>
						<IonCardTitle><div id="Header">Last Game: {new Intl.DateTimeFormat("en-US", {year: "numeric",month: "long",day: "2-digit"}).format(game.data().createdOn)}</div></IonCardTitle>
					</IonCardHeader>
					<IonCardContent>
									<div>
										<div id="row">
											<div id="AwayPlayer"><GetPlayer playerId={game.data().awayPlayer} /></div>
											<div id="HomePlayer"><GetPlayer playerId={game.data().homePlayer} /></div>
										</div>
										<div id="row">
											<div id="AwayBlock">
												<GetTeamLogo teamId={game.data().awayTeam} HomeAway="Away" page="Main" />
											</div>
											<div id="HomeBlock">
												<GetTeamLogo teamId={game.data().homeTeam} HomeAway="Home" page="Main" />
											</div>
										</div>
										<div id="row">
											<div id="AwayScore">{game.data().awayScore}</div>
											<div id="HomeScore">{game.data().homeScore}</div>
										</div>
									</div>
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
					)}
				)}
		</IonContent>
    </IonPage>
  );
};
export default Tab1;