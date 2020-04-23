import React, { useState, useEffect} from 'react';
import { IonHeader, IonToolbar, IonButton, IonTitle, IonInput, IonItem, IonContent, IonLabel, IonSelect, IonSelectOption  } from '@ionic/react';
import firebase from 'firebase/app';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

export default function AddGame({initialValue, clear}) {

    const [homePlayer, setHomePlayer] = useState("");
    const [awayPlayer, setAwayPlayer] = useState("");
    const [homeTeam, setHomeTeam] = useState("");
    const [awayTeam, setAwayTeam] = useState("");
    const [homeScore, setHomeScore] = useState("");
    const [awayScore, setAwayScore] = useState("");

    const [value, loading ] = useDocument(
        firebase.firestore().doc("games/" + initialValue),
        {
            snapshotListenOptions: {includeMetadataChanges: true}
        }
    );

    useEffect(() => {
        if(!loading && initialValue && value.exists) {
            setHomePlayer(value.data().homePlayer);
            setHomeTeam(value.data().homeTeam);
            setHomeScore(value.data().homeScore); 
            setAwayPlayer(value.data().awayPlayer);
            
            setAwayScore(value.data().awayScore);
            setTimeout( () => {
                setAwayTeam(value.data().awayTeam);
                console.log("AwayTeam: " + value.data().awayTeam)
             },150);
        } 
    },
    [loading, initialValue, value ]);

    const [players, ploading ] = useCollection(
        firebase.firestore().collection("players"),
        {
            snapShotListenOptions:{includeMetadataChanges: true}
        }
    );

    const [teams, tloading ] = useCollection(
        firebase.firestore().collection("teams"),
        {
            snapShotListenOptions:{includeMetadataChanges: true}
        }
    );

    function setUniquePlayer(e, fieldvalue, HomeAway) {

//childNode0 LocalName: ion-select-option
//childNode1 LocalName: ion-select-option
//childNode2 LocalName: input

        if (fieldvalue && e) {
            console.log("True");
            var selectedPlayer = e.detail.value;
            var childNodes = [];

            var i =0;
            var nodes = e.srcElement.childNodes;
            nodes.forEach(val => {
                if(val.localName === "ion-select-option") {
                    childNodes[i] = val.value;
                    i++;
                }
               });

            console.log(e);
            console.log("selectedPlayer: " + selectedPlayer);
            console.log("ChildNode Count: " + childNodes.length)
            console.log("childNode0: " + childNodes[0]);
            console.log("childNode1: " + childNodes[1]);

            if (HomeAway === "home") {
                setHomePlayer(selectedPlayer);
                if (selectedPlayer === childNodes[0]){
                    setAwayPlayer(childNodes[1]);
                } else {
                    setAwayPlayer(childNodes[0]);
                }
            } else {
                setAwayPlayer(selectedPlayer);
                if (selectedPlayer === childNodes[0]){
                    setHomePlayer(childNodes[1]);
                } else {
                    setHomePlayer(childNodes[0]);
                }
            }
        }
    };

    const onSave = async() => {
        let collectionRef = firebase.firestore().collection("games");
        if(initialValue) {
            await (collectionRef).doc(initialValue).set(
                {homePlayer: homePlayer, 
                    awayPlayer: awayPlayer, 
                    homeTeam: homeTeam, 
                    awayTeam: awayTeam, 
                    homeScore: homeScore, 
                    awayScore: awayScore, 
                    createdOn: new Date().getTime()}, {merge:true} );
                setHomePlayer("");
                setAwayPlayer("");
                setHomeTeam("");
                setAwayTeam("");
                setHomeScore("");
                setAwayScore("");
                clear();
                window.location = '/tab1';
        }
        else {
            await collectionRef.add(
                {homePlayer: homePlayer, 
                    awayPlayer: awayPlayer, 
                    homeTeam: homeTeam, 
                    awayTeam: awayTeam, 
                    homeScore: homeScore, 
                    awayScore: awayScore, 
                    createdOn: new Date().getTime()});
                setHomePlayer("");
                setAwayPlayer("");
                setHomeTeam("");
                setAwayTeam("");
                setHomeScore("");
                setAwayScore("");
                clear();
                window.location = '/tab1';
        }
    };

//    value && console.log(value);

    return (
        <>
        <IonHeader class="ion-no-border">
        <IonToolbar>
            <IonTitle>{initialValue ? 'Edit' : 'New'} Game</IonTitle>
        </IonToolbar>
        </IonHeader>

        <IonContent fullscreen="true">
            <IonItem key="HomePlayerItemKey">
                <IonLabel position="floating">Home Player</IonLabel>
                <IonSelect id="homePlayerSelect" value={homePlayer} placeholder="Select Home Player" interface="action-sheet" onIonChange={e => setUniquePlayer(e, e.detail.value, "home")}>
                {players && players.docs.map(p => {
                    return (
                        !ploading && (
                            <IonSelectOption value={p.id} key={p.id}>{p.data().FName}</IonSelectOption>
                         )
                    );
                })}
                </IonSelect>
            </IonItem>
            <IonItem key="HomeTeamItemKey">
                <IonLabel position="floating">Home Team</IonLabel>
                <IonSelect id="homeTeamSelect" value={homeTeam} placeholder="Select Home Team" interface="action-sheet" onIonChange={e => setHomeTeam(e.detail.value)}>
                {teams && teams.docs.map(t => {
                    return (
                        !tloading && (
                            <IonSelectOption value={t.id} key={t.id}>{t.data().TeamName}</IonSelectOption>
                         )
                    );
                })}
                </IonSelect>
            </IonItem>
            <IonItem key="HomeScoreItemKey">
                <IonLabel position="floating">Home Score</IonLabel>
                <IonInput value={homeScore} type="tel" onInput={e => setHomeScore(e.target.value)} />
            </IonItem>
            <IonItem key="AwayPlayerItemKey">
                <IonLabel position="floating">Away Player</IonLabel>
                <IonSelect id="awayPlayerSelect" value={awayPlayer} placeholder="Select Away Player" interface="action-sheet" onIonChange={e => setUniquePlayer(e, e.detail.value, "away")}>
                {players && players.docs.map(p => {
                    return (
                        !ploading && (
                            <IonSelectOption value={p.id} key={p.id}>{p.data().FName}</IonSelectOption>
                         )
                    );
                })}
                </IonSelect>
            </IonItem>
            <IonItem key="AwayTeamItemKey">
                <IonLabel position="floating">Away Team</IonLabel>
                <IonSelect value={awayTeam} placeholder="Select Away Team" interface="action-sheet" onIonChange={e => setAwayTeam(e.detail.value)}>
                {teams && teams.docs.map(t2 => {
                    return (
                        !tloading && (
                            <IonSelectOption value={t2.id} key={t2.id}>{t2.data().TeamName}</IonSelectOption>
                         )
                    );
                })}
                </IonSelect>
            </IonItem>
            <IonItem key="AwayScoreItemKey">
                <IonLabel position="floating">Away Score</IonLabel>
                <IonInput value={awayScore} type="tel" onInput={e => setAwayScore(e.target.value)} />
            </IonItem>
            <IonButton onClick={onSave}>
                Save                
            </IonButton>
            <IonButton onClick={() => {
                setHomePlayer("");
                setAwayPlayer("");
                setHomeTeam("");
                setAwayTeam("");
                setHomeScore("");
                setAwayScore("");
                clear();
            }}>
                Cancel
            </IonButton>

        </IonContent>
        </>
    );
}
