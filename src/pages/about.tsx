import React from "react";
import { graphql } from 'gatsby';

import Empty from "../template/empty";

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

const About: React.FC<{
    data: IAboutProps
}> = ({ data }) => {
    return (<Empty title="关于" navTitle="关于">
        (<AboutContent content={data.file.childMarkdownRemark.html}/>);
    </Empty>);
};

export default About;

export const AboutQuery = graphql`query About {
  file(sourceInstanceName: {eq: "about"}) {
    childMarkdownRemark {
      html
    }
  }
}`;
