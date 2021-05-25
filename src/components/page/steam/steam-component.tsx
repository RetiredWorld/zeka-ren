import React, { createRef } from 'react';

const STEAM_BASE_URL = 'https://steamcommunity.com/app';
const STEAM_IMAGE_URL = 'https://steamcdn-a.akamaihd.net/steam/apps';

const getSteamUrl = (appId: string | number): string => {

    return `${STEAM_BASE_URL}/${appId}`;
};

const getSteamImageUrl = (appId: string | number): string => {

    return `${STEAM_IMAGE_URL}/${appId}/header.jpg`;
};

const num2time = (numTime: string | number): ITime => {
    let t: number;
    const myTime: ITime = {
        hour: -1,
        minute: -1,
    };

    if (typeof numTime === 'string') {
        t = parseInt(numTime);
    } else {
        t = numTime;
    }

    if (t < 60) {
        myTime.minute = t;
    } else {
        myTime.hour = Math.floor(t / 60);
        myTime.minute = t % 60;
    }
    return myTime;
};

const SteamComponent: React.FC<ISteamComponentProp> = ({ appId, name, time, recentTime = null }) => {

    const myTime = num2time(time);
    const myRecentTime = num2time(recentTime);
    let recentTimer: JSX.Element;
    let timer: JSX.Element;
    const url = getSteamUrl(appId);
    const imgSrc = getSteamImageUrl(appId);

    if (myTime.hour === -1) {
        timer = (<p>总时间： {myTime.minute}m</p>);
    } else {
        timer = (<p>总时间： {myTime.hour}h{myTime.minute}m</p>);
    }

    if (recentTime !== null) {
        if (myRecentTime.hour === -1) {
            recentTimer = (<p>近期时间： {myRecentTime.minute}m</p>);
        } else {
            recentTimer = (<p>近期时间： {myRecentTime.hour}h{myRecentTime.minute}m</p>);
        }
    }

    const imgRef = createRef<HTMLImageElement>();
    const imgEle = (<img ref={imgRef} src={ imgSrc } onError={()=>{
        imgRef.current.src = '/static/images/fail.jpg';
    }} alt={ appId.toString() } />);

    return (
        <div className="my-steam-cp card">
            <a target="_blank" rel="noopener noreferrer" href={ url }>
                <div className="my-steam-logo">
                    { imgEle }
                </div>
                <div className="my-steam-info">
                    <h2>{ name }</h2>
                    {recentTimer}
                    {timer}
                </div>
            </a>
        </div>
    );
};

export default SteamComponent;

interface ITime {
    hour: number
    minute: number
}

export interface ISteamComponentProp {
    appId: number | string
    name: string
    time: string | number
    recentTime?: string | number | null
}
