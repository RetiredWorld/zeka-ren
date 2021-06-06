import React from 'react';

const ThemeScriptInjector = () => {
  const code = `
    window.MyTheme = {
      themeBackground: {
        'dark': 'url(/static/images/bg.jpg),#151515',
        'light': 'url(/static/images/bg-pink.png),pink'
      },
      backgroundEle: document.getElementById('background')
    };

      function getInitialColorMode() {
          const hour = (new Date()).getHours();
          if (hour > 6 && hour < 18) {
            return 'light';
          } else {
            return 'dark';
          }
       } 
                                       
        const colorMode = getInitialColorMode();
        window.MyTheme.backgroundEle.style.background = window.MyTheme.themeBackground[colorMode];
        if (colorMode === 'light') {
          window.MyTheme.themeMode = 'light';
          document.body.classList.add('pink-theme');
        } else {
          window.MyTheme.themeMode = 'dark';
        }
  `;

  return (<>
      <div className="my-background" id="background" />
      <script key={'ThemeScriptInjector'} dangerouslySetInnerHTML={{ __html: code }} />
    </>
  );
};

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<ThemeScriptInjector/>);
};
