import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Footer: React.FC = () => {

    return <footer className="footer my-footer">
        <div className="content has-text-centered">
            <p>
                Made with <FontAwesomeIcon icon={faHeart} /> by Zeka, 2020.
                <br />
                Powered by <a href="https://www.gatsbyjs.com/">Gatsbyjs</a>
                <br />
                <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>
            </p>
        </div>
    </footer>;
};

export default Footer;
