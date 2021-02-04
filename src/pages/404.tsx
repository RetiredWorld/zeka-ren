import React from 'react';

import SEO from '../components/public/seo';
import Header from '../components/public/header';

import { Link } from 'gatsby';

const NotFoundPage: React.FC = () => {
    return (<>
        <SEO title="404" />
        <Header title="404" />
        <Link to="/">返回首页</Link>
    </>);
};

export default NotFoundPage;
