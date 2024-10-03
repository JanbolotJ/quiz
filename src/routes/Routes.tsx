

import React from 'react';
import Loading from '../helpers/loading/Loading';
import { Routes as Switch, Route} from "react-router-dom";
import { Apps } from '../services/path';
import { AppsPages } from '../pages/Lazy';

export default function Routes() {
  return (
    <React.Fragment>
        <React.Suspense fallback={<Loading />}>
          <Switch>
              <Route path={Apps.main} element={<AppsPages.Main />}/>
              <Route path={Apps.quuiz} element={<AppsPages.Quiz />}/>
              <Route path={Apps.results} element={<AppsPages.Results />}/>
          </Switch>
        </React.Suspense>
    </React.Fragment>
  )
};
