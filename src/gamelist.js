import React from 'react';
import { IonList } from '@ionic/react';
import Game from "./game";
import firebase from 'firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

export default function GameList({doEdit}){
    const [value, loading ] = useCollection(
        firebase.firestore().collection("games").orderBy("createdOn"),
        {
            snapShotListenOptions:{includeMetadataChanges: true}
        }
    );
    const closeSlidingItems = () => {
        var list = document.getElementById("list");
        list.closeSlidingItems();
    };
    const doDelete = id => {
        firebase.firestore().collection("games").doc(id).delete();
    };

    return (
        <>
            <h3>Games</h3>
            <IonList id="list">
                {value && value.docs.map(doc => {
                    return (
                        !loading && (
                            <Game doc={doc}
                            doEdit = {i => {
                                closeSlidingItems();
                                doEdit(i);
                            }}
                            doDelete = {i => {
                                closeSlidingItems();
                                doDelete(i);
                            }}
                        key = {doc.id}
                            ></Game>
                        )
                    );
                })}
            </IonList>
        </>
    );
}