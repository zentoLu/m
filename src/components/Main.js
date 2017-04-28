import React from 'react';
import Home from './Home';
import { Router, Route, IndexRoute, hashHistory }  from 'react-router';
import About from './pages/about';
import Topics from './pages/topics';
import Product from './pages/product';
import Material from './pages/material';
import Sign from './pages/sign';
import Approve from './pages/approve';
import SealNotSuccess from './pages/sealNotSuccess';
import OverDue from './pages/OverDue';
import Contract from './pages/Contract';

class AppComponent extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Home}>
                    <IndexRoute component={About} />
                    <Route path="/about" component={About}/>
                    <Route path="/topics" component={Topics}/>
                    <Route path="/product" component={Product}/>
                    <Route path="/material(/:id)" component={Material}/>
                    <Route path="/sign" component={Sign}/>
                    <Route path="/approve" component={Approve}/>
                    <Route path="/sealNotSuccess" component={SealNotSuccess}/>
                    <Route path="/overdue" component={OverDue}/>
                    <Route path="/contract" component={Contract}/>
                </Route>
            </Router>
        )
    }
}

export default AppComponent