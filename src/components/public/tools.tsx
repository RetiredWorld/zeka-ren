import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { LayoutContextConsumer } from '../../layout/context';

export type IThemeMode = 'light' | 'dark';

type IconName = typeof faSun | typeof faMoon;

const Tools: React.FC = () => {

    const [ hasMounted, setHasMounted ] = useState<boolean>(false);
    const [ iconName, setIconName ] = useState<IconName>(typeof MyTheme === 'undefined' ? faSun : (MyTheme.themeMode === 'light') ? faMoon : faSun);
    useEffect(() => {
      setHasMounted(true);
    }, []);
    if (!hasMounted) return null;


    return <LayoutContextConsumer>
        {({ theme }) => {
            function themeHandler() {
                if (theme.themeMode === 'light') {
                    theme.setThemeMode('dark');
                    document.body.classList.remove('pink-theme');
                    MyTheme.backgroundEle.style.background = typeof MyTheme === 'undefined' ? 'white' : MyTheme.themeBackground['dark'];
                    setIconName(faSun);
                } else {
                    theme.setThemeMode('light');
                    document.body.classList.add('pink-theme');
                    MyTheme.backgroundEle.style.background = typeof MyTheme === 'undefined' ? 'white' : MyTheme.themeBackground['light'];
                    setIconName(faMoon);
                }
            }
            return (<div className="side-tool-wrap">
                <div className="side-tool-main is-invisible-mobile" onClick={themeHandler}>
                    <div className="side-tool-main__text"><FontAwesomeIcon icon={iconName} /></div>
                </div>
            </div>);
        }}
    </LayoutContextConsumer>

};

export default Tools;
