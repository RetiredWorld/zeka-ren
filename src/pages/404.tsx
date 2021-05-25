import React from 'react';

import { Link } from 'gatsby';


const NotFoundPage: React.FC = () => {
    return (<>
        <p>It seems you go to wrong page.</p>
        <Link to="/">Click here to return to Homepage.</Link>
    </>);
};

export default NotFoundPage;
