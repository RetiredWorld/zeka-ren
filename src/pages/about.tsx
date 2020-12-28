import React from "react";
import { graphql } from 'gatsby';

import SEO from "../components/public/seo";
import Header from "../components/public/header";

interface IAboutProps {
    markdownRemark: {
        html: string
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
    return (<>
        <SEO title="关于" />
        <Header title="关于" />
        <AboutContent content={data.markdownRemark.html}/>
    </>);
};

export default About;

export const AboutQuery = graphql`query About {
  markdownRemark(frontmatter: {title: {eq: "about.md"}}) {
    html
  }
}
`;
