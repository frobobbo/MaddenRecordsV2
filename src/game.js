import React from 'react';
import { IonItem, IonLabel, IonText, IonItemSliding, IonItemOption, IonItemOptions, IonIcon } from '@ionic/react';
import { document, trash } from 'ionicons/icons';
import GetTeam from './components/getTeam';
import GetPlayer from './components/getPlayer';
import GetTeamLogo from './components/getTeamLogo';

export default function Game({doEdit, doDelete, doc}) {
    let data = doc.data();

    return (
        <IonItemSliding>
            <IonItem>
                <IonLabel class = "ion-text-wrap">
                    <IonText className = "item-title">
                       <GetPlayer playerId={data.homePlayer}/>
                    </IonText>
                    <IonText className = "item-title">
                        <GetTeam teamId={data.homeTeam}/>
                    </IonText>
                    <GetTeamLogo teamId={data.homeTeam} HomeAway="Home" page="GameList"/>
                    <IonText className="item-sub-title">
                        <div>{new Date(data.createdOn) + ""}</div>
                    </IonText>
                    <IonText className="item-id">
                        {doc.id}
                    </IonText>
                </IonLabel>
                <div></div>
            </IonItem>
            <IonItemOptions>
                <IonItemOption onClick={()=> { doEdit(doc.id); }}>
                    <IonIcon slot="icon-only" icon={document}></IonIcon>
                </IonItemOption>
                <IonItemOption color="danger" onClick={()=> doDelete(doc.id) }>
                    <IonIcon slot="icon-only" icon={trash}></IonIcon>
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    );
}