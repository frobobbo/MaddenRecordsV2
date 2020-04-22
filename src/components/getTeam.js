import React from 'react';
import { IonText } from '@ionic/react';

import firebase from 'firebase/app';
import { useDocument } from 'react-firebase-hooks/firestore';

export default function GetTeam({teamId}) {

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
            <div>{team && team.data().TeamName}</div>
            {team && console.log(team.data())}

        </IonText>
     );
}
