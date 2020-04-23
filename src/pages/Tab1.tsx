import React, {useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle } from '@ionic/react';
import { IonCardContent, IonItem, IonButton, IonIcon, IonFab, IonFabButton, IonModal } from '@ionic/react';
import { heart, share, add } from 'ionicons/icons';

import firebase from 'firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

import './Tab1.css';
import GetPlayer from '../components/getPlayer';
import GetTeamLogo from '../components/getTeamLogo';
import AddGame from '../AddGame';



const Tab1: React.FC = () => {

	const [current, setCurrent] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [games, loading, error] = useCollection(
        firebase.firestore().collection("games").orderBy("createdOn", "desc").limit(1),
        {
            snapshotListenOptions: {includeMetadataChanges: true}
        }
    );


  return (
    <IonPage>
      <IonHeader id="RecordsHeader">
          <div id="HeaderImage" ><img src='/assets/imgs/MaddenRecords.png' alt="HeaderLogo" height="100px" /></div>
      </IonHeader>
      <IonContent>
         <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={add} onClick={() => setShowModal(true)} />
          </IonFabButton>
        </IonFab>
		<IonModal isOpen={showModal}>
			<AddGame initialValue={current} clear={()=>setCurrent(null)} key="adfasdfasdf"/>
    	    <IonButton onClick={() => setShowModal(false)}>
			<IonIcon name="close" slot="icon-only"></IonIcon>
        	</IonButton>
      	</IonModal>
		<div>{error && <strong>Error: {JSON.stringify(error)}</strong>}</div>
            	<div>{loading && <span>Document: Loading...</span>}</div>
            	{games && games.docs.map(game => {
                  return (
					<IonCard id="MainCard" slot="fixed" key={game.id}>
					<IonCardHeader id="CardHeader">
						<IonCardTitle><div id="Header">{new Intl.DateTimeFormat("en-US", {year: "numeric",month: "long",day: "2-digit"}).format(game.data().createdOn)}</div></IonCardTitle>
					</IonCardHeader>
					<IonCardContent id="CardContent">
									<div id="LastGameCard">
										<div id="row">
											<div id="AwayPlayer"><GetPlayer playerId={game.data().awayPlayer} /></div>
											<div id="PlayerSep"></div>
											<div id="HomePlayer"><GetPlayer playerId={game.data().homePlayer} /></div>
										</div>
										<div id="row">
											<div id="AwayBlock">
												<GetTeamLogo teamId={game.data().awayTeam} HomeAway="Away" page="Main" />
											</div>
											<div id="TeamSep">@</div>
											<div id="HomeBlock">
												<GetTeamLogo teamId={game.data().homeTeam} HomeAway="Home" page="Main" />
											</div>
										</div>
										<div id="row">
											<div id="AwayScore">{game.data().awayScore}</div>
											<div id="ScoreSep"></div>
											<div id="HomeScore">{game.data().homeScore}</div>
										</div>
									</div>
					</IonCardContent>
					</IonCard>
					)}
				)}
		</IonContent>
    </IonPage>
  );
};
export default Tab1;