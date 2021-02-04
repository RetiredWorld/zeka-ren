import DisqusJS from 'disqusjs';

const genDisqus = () => {
    return new DisqusJS({
        shortname: 'zeka-ren',
        siteName: 'zeka-ren',
        api: 'https://disqus.skk.moe/disqus/',
        apikey: 'YY8aVNwSX7yfHwsc5O3zMfNXlnysJl3vzIACudT0MBFm2fZOrtnNUo7cxT8jucB4',
        admin: 'lazzeka',
        adminLabel: '',
    });
};

export default genDisqus;
