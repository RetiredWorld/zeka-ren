import React from 'react';

import SEO from '../components/public/seo';
import Header from '../components/public/header';

import { homepageMetaInfo } from '../template/homepage';
import { archiveMetaInfo } from '../template/archive';
import { steamMetaInfo } from '../pages/steam';
import { friendsMetaInfo } from '../pages/friends';
import { aboutMetaData } from '../pages/about';

interface IMetaInfoValue {
  title: string,
  navTitle: string,
  description?: string,
}

export interface IMetaInfo {
  reg: RegExp | RegExp[],
  genInfo(key: string, child: any): IMetaInfoValue,
}

const metaInfoList: IMetaInfo[] = [];

metaInfoList.push(homepageMetaInfo);
metaInfoList.push(archiveMetaInfo);
metaInfoList.push(friendsMetaInfo);
metaInfoList.push(aboutMetaData);
metaInfoList.push(steamMetaInfo);

// default value
metaInfoList.push({
  reg: /.*/g,
  genInfo(): IMetaInfoValue {
    return {
      title: '404',
      navTitle: '404',
    };
  },
});

export interface IURI {
  props: {
    location: {
      pathname: string
    }
  }
}

const Meta: React.FC<{children: IURI}> = (children) => {
  let SEOElement: React.ReactElement;
  let HeaderElement: React.ReactElement;

  const child = children.children;
  const pathname = child.props.location.pathname;

  for (const meta of metaInfoList) {
    let isTrue = false;
    if (Array.isArray(meta.reg)) {
      for (const metaReg of meta.reg) {
        if (metaReg.test(pathname)) {
          isTrue = true;
          break;
        }
      }
    } else {
      if (meta.reg.test(pathname)) {
        isTrue = true;
      }
    }

    if (!isTrue) continue;

    const metaInfo = meta.genInfo(pathname, child);
    SEOElement = (<SEO title={metaInfo.title} description={metaInfo.description}/>);
    HeaderElement = (<Header title={metaInfo.navTitle}/>);
    break;
  }
  return (<>
    {SEOElement}
    {HeaderElement}
  </>);
};

export default Meta;
