import React from 'react';

import SEO from '../components/public/seo';
import Header from '../components/public/header';

import { Link } from 'gatsby';

const NotFoundPage: React.FC = () => {
    return (<>
        <SEO title="404" description="页面未找到" />
        <Header title="404" />
        <p>It seems you go to wrong page.</p>
        <Link to="/">Return to Homepage.</Link>
    </>);
};

export default NotFoundPage;
