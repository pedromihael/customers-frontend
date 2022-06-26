import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import GlobalTheme from './base/global';
import CostumersProvider from './state/contexts/CostumersContext';
import MaterialThemeProvider from './state/contexts/MaterialThemeContext';
import ActionsProvider from './state/contexts/ActionsContext';
import { Home as MaterialHome } from './layout/pages/material/Home';

function App() {
  return (
    <>
      <ActionsProvider>
        <CostumersProvider>
          <GlobalTheme />
          <ReactTooltip />
          <MaterialThemeProvider>
            <Router>
              <Switch>
                <Route exact path="/">
                  <MaterialHome />
                </Route>
              </Switch>
            </Router>
          </MaterialThemeProvider>
        </CostumersProvider>
      </ActionsProvider>
    </>
  );
}

export default App;
