import React from 'react';
import { graphql } from 'gatsby';

import { IMetaInfo } from '../layout/meta';

interface IAboutProps {
    file: {
        childMarkdownRemark: {
            html: string
        }
    }
}

const AboutContent: React.FC<{
    content: string
}> = ({ content }) => {

    return (<div className="my-about-wrap" dangerouslySetInnerHTML={{
        __html: content,
    }}>
    </div>);
};

export const aboutMetaData: IMetaInfo = {
    reg: /\/about/,
    genInfo() {
        return {
            title: '关于',
            navTitle: '关于',
            description: '关于 Zeka 的记事本',
        };
    },
};

const About: React.FC<{
    data: IAboutProps
}> = ({ data }) => {
    return (<AboutContent content={data.file.childMarkdownRemark.html}/>);
};

export default About;

export const AboutQuery = graphql`query About {
  file(sourceInstanceName: {eq: "about"}) {
    childMarkdownRemark {
      html
    }
  }
}`;
