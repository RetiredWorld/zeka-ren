import React, { Suspense } from 'react';

import { graphql, StaticQuery } from 'gatsby';

import { IAudioItem, IAudioQuery } from '../../types/query/audio';

const ReactAplayer = React.lazy(() => {
    return import('react-aplayer');
});

const MyAplayer: React.FC<{audio: IAudioItem[]}> = ({ audio }) => {

    const onInit = () => {
        (document.querySelector('.aplayer-info') as HTMLElement).style.display = 'inherit';
    };

    const props = {
        theme: '#F57F17',
        fixed: true,
        listFolded: false,
        mini: true,
        audio,
    };
    return (<ReactAplayer
            {...props}
            onInit={onInit}
        />);
};

const APlayer: React.FC = () => {

    // @ts-ignore
    return (<StaticQuery query={graphql`query AudioAll {
  audioJson {
    audio {
      artist
      cover
      name
      theme
      url
    }
  }
}`} render={(data: IAudioQuery)=>{
        const isSSR = typeof window === 'undefined';
    return  !isSSR && (
                <Suspense fallback={<div className="temp-aplayer"/>}>
                    <MyAplayer audio={data.audioJson.audio} />
                </Suspense>
            );
        }}>
        </StaticQuery>);
};

export default APlayer;
