import React from 'react';
import { IonText } from '@ionic/react';

import firebase from 'firebase';
import { useDocument } from 'react-firebase-hooks/firestore';

export default function GetTeamLogo({teamId, HomeAway, page}) {

    const [team, loading, error] = useDocument(
        firebase.firestore().doc("teams/" + teamId),
        {
            snapshotListenOptions: {includeMetadataChanges: true}
        }
    );
    return ( 
        <IonText className = "item-title">
            <div>{error && <strong>Error: {JSON.stringify(error)}</strong>}</div>
            <div>{loading && <span>Document: Loading...</span>}</div>
            {team && <img id={HomeAway + "TeamLogo" + page} src={"/assets/teams/" + team.data().TeamLogo + ".png"} alt="listItem" />}
        </IonText>
     );
}
