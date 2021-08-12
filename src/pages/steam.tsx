import React, { Dispatch, useEffect, useState } from 'react';

import SteamComponent from '../components/page/steam/steam-component';
import { IMetaInfo } from '../layout/meta';

const STEAM_ALL_URL = 'https://api.zeka.cloud/steam/';
const STEAM_RECENT_URL = 'https://api.zeka.cloud/steam/?type=recent';

const fetchData = (url: string, setter: Dispatch<ISteamData>) => {
    fetch(url, {
        method: 'GET',
        mode: 'cors',
    }).then(response => response.json()).then((data: ISteamData) => {
        setter(data);
    }).catch(e=>{
        console.log(e);
    });
};

const initData: ISteamData = {
    response: {
        games: [],
    },
};

export const steamMetaInfo: IMetaInfo = {
    reg: /\/steam/,
    genInfo() {

        return {
            title: 'Steam Games',
            description: 'Zeka 在 Steam 上的游戏',
            navTitle: 'Steam',
        };
    },
};

const SteamPage: React.FC = () => {

    const [ data, setData ] = useState<ISteamData>(initData);
    const [ recentData, recentSetData ] = useState<ISteamData>(initData);
    const games = data.response.games;
    const recentGames = recentData.response.games;

    useEffect( ()=>{
        fetchData(STEAM_ALL_URL, setData);
    }, []);

    useEffect( ()=>{
        fetchData(STEAM_RECENT_URL, recentSetData);
    }, []);

    let recentStatus = <p>最近（加载中）</p>;

    if (recentGames) {
        if (recentGames.length !== 0) {
            recentStatus = <p>最近（{recentGames.length}）</p>;
        }
    } else {
        recentStatus = <p>最近没有在玩游戏</p>;
    }


    return (<div className="my-steam">
            <div className="my-steam__intro">
                {recentStatus}
            </div>
            <div className="my-steam-part my-steam-recently">
                {recentGames?.map(game=>{
                    return (<SteamComponent key={game.appid} appId={game.appid} name={game.name} time={game.playtime_forever} recentTime={game.playtime_2weeks} />);
                })}
            </div>
            <div className="my-steam__intro">
                <p>库存({(games.length === 0)?'加载中':games.length})</p>
            </div>
            <div className="my-steam-part my-steam-all">
                {games.map(game=>{
                    return (<SteamComponent key={game.appid} appId={game.appid} name={game.name} time={game.playtime_forever} />);
                })}
            </div>
        </div>);
};

export default SteamPage;

interface ISteamData {
    response:{
        games: ISteamItem[]
    }
}

interface ISteamItem {
    appid: number
    name: string
    playtime_2weeks?: number
    playtime_forever: number
}
