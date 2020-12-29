import React from "react";

import SEO from "../components/public/seo"
import InfoConsumer, { IInfoContext } from "../layout/context";

export interface IEmptyPage extends IInfoContext {

}

export const Empty: React.FC<IEmptyPage> = (props) => {

    return (<InfoConsumer>
        {context => {
            context.setInfo({
                title: props.title,
                navTitle: props.navTitle,
                description: props.description,
            });
            return (<>
                <SEO title={props.title} description={props.description} />
                {props.children}
                </>);
        }}
    </InfoConsumer>);
};

export default Empty;
