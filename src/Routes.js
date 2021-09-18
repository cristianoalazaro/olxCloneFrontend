import React from 'react';
import {Switch} from 'react-router-dom';

import RouteHandler from './components/RouteHandler';
import Home from './Pages/Home';
import About from './Pages/About';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import NotFound from './Pages/NotFound';
import AdProduto from './Pages/AdProduto'
import AddAd from './Pages/AddAd';
import Ads from './Pages/Ads';
import MyAccount from './Pages/MyAccount';

// eslint-disable-next-line import/no-anonymous-default-export
export default () =>{
    return (
        <Switch>
            <RouteHandler exact path='/' component={Home} />
            <RouteHandler exact path='/sobre' component={About} />
            <RouteHandler exact path='/signin' component={Signin} />
            <RouteHandler exact path='/signup' component={Signup} />
            <RouteHandler exact path='/ad/:id' component={AdProduto} />
            <RouteHandler exact private path='/post-an-ad' component={AddAd} />
            <RouteHandler exact path='/ads' component={Ads} />
            <RouteHandler exact private path='/my-account' component={MyAccount} />
            <RouteHandler component={NotFound} />
        </Switch>
    );
}