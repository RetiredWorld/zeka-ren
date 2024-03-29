import React from 'react';

import { useRef, useState } from 'react';
import { Link } from 'gatsby';

export interface HeaderProp {
    title: string
}

function yearPastPercent(): number{
    const year = new Date().getFullYear();
    const tDay = ( year%4==0 && year%100!=0 || year%400==0 )? 366 : 365;
    const n1 = Date.parse((new Date(year,0,0)).toDateString());
    const n2 = Date.parse((new Date()).toDateString());
    const pDay = (n2-n1)/(1000 * 60 * 60 * 24);
    return 100 - Math.ceil(pDay/tDay*10000)/100;
}

const Header: React.FC<HeaderProp> = (prop) => {
    const headerRef = useRef<HTMLHeadingElement>(null);
    const [ percent ] = useState(yearPastPercent());

    return (<header className="my-header">
            <h1 ref={headerRef} className="my-header-title" time-str={`今年还剩 ${percent.toFixed(2)}%`} style={{
                [ '--time-percent' as any]: (percent / 100).toFixed(2),
            }}><Link className="my-header__link" to="/">Zeka 的记事本</Link></h1>
            <span className="my-header-sub">{prop.title}</span>
    </header>);
};

export default Header;
