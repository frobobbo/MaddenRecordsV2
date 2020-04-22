import React from 'react';
import { IonText } from '@ionic/react';

import firebase from 'firebase';
import { useDocument } from 'react-firebase-hooks/firestore';

export default function GetPlayer({playerId}) {

    const [player, loading, error] = useDocument(
        firebase.firestore().doc("players/" + playerId),
        {
            snapshotListenOptions: {includeMetadataChanges: true}
        }
    );
    return ( 
        <IonText className = "item-title">
            <div>{error && <strong>Error: {JSON.stringify(error)}</strong>}</div>
            <div>{loading && <span>Document: Loading...</span>}</div>
            <div>{player && player.data().FName}</div>
        </IonText>
     );
}
