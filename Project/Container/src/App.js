import React ,{ lazy, Suspense, useState} from "react";



import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Header from "./components/Header";
import Progress from "./components/Progress";
const MarketingLazy = lazy(()=>import('./components/MarketingApp'))
const AuthenticationLazy = lazy(()=>import('./components/AuthenticationApp'))

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default () => {

  const [isSignedIn,setIsSignIn] = useState(false);

  return (
    <BrowserRouter>
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
                <Route path='/' component={MarketingLazy}/>
              </Switch>
            </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
