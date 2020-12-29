import React from "react";

import { Link } from "gatsby";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faHome, faLink, faArchive, faCat, faWifi } from '@fortawesome/free-solid-svg-icons'
import { faSteam } from "@fortawesome/free-brands-svg-icons"

const Nav: React.FC = () => {

    return (<nav className="my-nav">
            <input id="menu" name="menu" type="checkbox" className="my-nav-toggle" />
            <label  id="sb-eslint" className="my-nav-avatar" htmlFor="menu"></label>
            <label id="sb-eslint2" className="my-nav-mask" htmlFor="menu"></label>
            <ul className="my-nav-menu">
                <li><Link to="/"><span className="icon"><FontAwesomeIcon icon={faHome} /></span>首页</Link></li>
                <li><Link to="/about"><span className="icon"><FontAwesomeIcon icon={faLink} /></span>关于</Link></li>
                <li><Link to="/friends"><span className="icon"><FontAwesomeIcon icon={faCat} /></span>友链</Link></li>
                <li><Link to="/archive"><span className="icon"><FontAwesomeIcon icon={faArchive} /></span>归档</Link></li>
                <li><Link to="/steam"><span className="icon"><FontAwesomeIcon icon={faSteam} /></span>Steam</Link></li>
                <li><a className='rss' target='_blank'  title='zeka 的 flag 订阅' href="/rss.xml"><span className="icon"><FontAwesomeIcon icon={faWifi} /></span>订阅</a></li>
            </ul>
        </nav>);
};

export default Nav;
