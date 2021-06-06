import React, { InputHTMLAttributes, useRef } from 'react';

import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faLink, faArchive, faCat, faWifi } from '@fortawesome/free-solid-svg-icons';
import { faSteam } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface INavItemProps {
  icon: IconProp,
  link: string,
  text: string,
  inputRef: React.MutableRefObject<HTMLInputElement>,
}

const NavItem: React.FC<INavItemProps> = ({ icon, link, text, inputRef}) => {
  return (<li><Link onClick={() => {
    inputRef.current.click();
  }}  to={link}><span className="icon"><FontAwesomeIcon icon={icon} /></span>{text}</Link></li>);
}

const Nav: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (<nav className="my-nav">
    <input ref={inputRef} id="menu" name="menu" type="checkbox" className="my-nav-toggle" />
    <label id="sb-eslint" className="my-nav-avatar" htmlFor="menu"></label>
    <label id="sb-eslint2" className="my-nav-mask" htmlFor="menu"></label>
    <ul className="my-nav-menu">
      <NavItem icon={faHome} link="/" text="首页" inputRef={inputRef}/>
      <NavItem icon={faLink} link="/about" text="关于" inputRef={inputRef}/>
      <NavItem icon={faCat} link="/friends" text="朋友" inputRef={inputRef}/>
      <NavItem icon={faArchive} link="/archive" text="归档" inputRef={inputRef}/>
      <NavItem icon={faSteam} link="/steam" text="蒸汽" inputRef={inputRef}/>
      <li><a className='rss' target='_blank'  title='zeka 的 flag 订阅' href="/rss.xml"><span className="icon"><FontAwesomeIcon icon={faWifi} /></span>订阅</a></li>
    </ul>
  </nav>);
};

export default Nav;
