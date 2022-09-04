import React ,{ lazy, Suspense, useState,useEffect} from "react";


import { createBrowserHistory } from 'history';
import { Router, Redirect, Route, Switch } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Header from "./components/Header";
import Progress from "./components/Progress";
const MarketingLazy = lazy(()=>import('./components/MarketingApp'))
const AuthenticationLazy = lazy(()=>import('./components/AuthenticationApp'))
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});
const history = createBrowserHistory();
export default () => {

  const [isSignedIn,setIsSignIn] = useState(false);
  
  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header 
            isSignedIn={isSignedIn}
            onSignOut={()=>setIsSignIn(false)}
          />
            <Suspense fallback={<Progress/>}>
              <Switch>
                <Route path='/auth'>
                  <AuthenticationLazy 
                    onSignIn={()=>setIsSignIn(true)}
                  />
                </Route>
                <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DashboardLazy />
              </Route>
                <Route path='/' component={MarketingLazy}/>
              </Switch>
            </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
