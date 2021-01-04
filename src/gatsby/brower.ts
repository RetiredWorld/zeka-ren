require('prismjs/themes/prism-solarizedlight.css');
require('katex/dist/katex.min.css');
require('remark-admonitions/styles/classic.css');
require('react-photo-view/dist/index.css');
require('disqusjs/dist/disqusjs.css');
require('../assets/sass/main.scss');

// trigger an immediate page refresh when an update is found
export const onServiceWorkerUpdateReady = () => {
    document.getElementById('my-message').classList.remove('is-invisible')
};


