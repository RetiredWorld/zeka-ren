import React, { Dispatch, useEffect, useState } from 'react';

import SteamComponent from '../components/page/steam/steam-component';
import { IMetaInfo } from '../layout/meta';

const STEAM_ALL_URL = 'https://steaminfo.mmx223223.workers.dev';
const STEAM_RECENT_URL = 'https://steaminfo.mmx223223.workers.dev?type=recent';

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

    return (<div className="my-steam">
            <div className="my-steam__intro">
                <p>最近({(recentGames.length === 0)?'加载中':recentGames.length})</p>
            </div>
            <div className="my-steam-part my-steam-recently">
                {recentGames.map(game=>{
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
