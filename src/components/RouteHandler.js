import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import {isLogged} from '../helpers/AuthHandler';

export default ({ children, ...rest }) => {
    let log = isLogged();
    let authorized = (rest.private && !isLogged) ? false : true;

    return (
        <Route
            {...rest}
            render={() => 
            authorized ? children : <Redirect to='/signin' /> }
        />
    )
}