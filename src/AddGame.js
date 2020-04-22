import React, { useState, useEffect} from 'react';
import { IonButton, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption  } from '@ionic/react';
import firebase from 'firebase/app';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

export default function AddGame({initialValue, clear}) {
    console.log("Line 7 - Initial Value: " + initialValue);

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
        console.log("Line 64 - in useEffect()");
        if(!loading && initialValue && value.exists) {
            setHomePlayer(value.data().homePlayer);
            setHomeTeam(value.data().homeTeam);
            setAwayPlayer(value.data().awayPlayer);
            setAwayTeam(value.data().awayTeam);
            setHomeScore(value.data().homeScore); 
            setAwayScore(value.data().awayScore);
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

        if (fieldvalue) {
            var selectedPlayer = e.detail.value;
            var childNode1 = e.srcElement.childNodes[1].value;
            var childNode2 = e.srcElement.childNodes[2].value;
            if (HomeAway === "home") {
                setHomePlayer(selectedPlayer);
                if (selectedPlayer === childNode1){
                    setAwayPlayer(childNode2);
                } else {
                    setAwayPlayer(childNode1);
                }
            } else {
                setAwayPlayer(selectedPlayer);
                if (selectedPlayer === childNode1){
                    setHomePlayer(childNode2);
                } else {
                    setHomePlayer(childNode1);
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
                {teams && teams.docs.map(t => {
                    return (
                        !tloading && (
                            <IonSelectOption value={t.id} key={t.id}>{t.data().TeamName}</IonSelectOption>
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

        </>
    );
}
