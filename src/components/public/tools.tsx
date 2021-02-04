import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronDown, faWrench, faChevronUp } from '@fortawesome/free-solid-svg-icons';

function scroll2Position(isTop=false){
    if (isTop){
        window.scrollTo(0, 0);
    } else {
        window.scrollTo(0, document.body.scrollHeight);
    }
}

function getPercent() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.offsetHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = (scrollTop) / (docHeight - winHeight);

    return Math.round(scrollPercent * 100);
}

const Tools: React.FC = () => {

    const [ isActive, setIsActive ] = useState(false);
    const [ percent, setPercent ] = useState(0);

    useEffect(()=>{
        const scrollEvt = () => {
            const percent = getPercent();
            setPercent((isNaN(percent))?0: percent);
        };

        window.addEventListener('scroll', scrollEvt, { passive: true });
        return ()=>{
            window.removeEventListener('scroll', scrollEvt);
        };
    });

    return (<div className="side-tool-wrap">
        <div className="side-tool-main" onClick={()=>{setIsActive(!isActive);}}>
            <div className="is-invisible-tablet side-tool-main__text"><FontAwesomeIcon icon={faWrench} /></div>
            <div className="is-invisible-mobile  side-tool-main__text">{percent}%</div>
            <div className={`side-tool-items ${isActive?'active': null}`}>
                <span className="side-tool-item" onClick={()=>scroll2Position(true)}>
                    <FontAwesomeIcon icon={faChevronUp} />
                </span>
                <span className="side-tool-item">
                    <FontAwesomeIcon icon={faSearch} />
                </span>
                <span className="side-tool-item" onClick={()=>scroll2Position(false)}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </span>
            </div>
        </div>
    </div>);
};

export default Tools;
