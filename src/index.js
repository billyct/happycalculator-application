import React from 'react';
import {createStore, compose} from 'redux';
import {Provider} from 'react-redux';
import { Router, Route } from 'react-router';

import reducers from './reducers';

import App from './containers/App';
import CalculatorPage from './containers/CalculatorPage';

import { devTools, persistState } from 'redux-devtools'
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';


//store.js
let store;

const finalCreateStore = compose(
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

store = finalCreateStore(reducers);

//<DebugPanel top right bottom>
//  <DevTools store={store} monitor={LogMonitor} />
//</DebugPanel>
//index
React.render(
  <div>
    <Provider store={store}>
      {() =>
        <Router>
          <Route path='/' component={CalculatorPage}>
            <Route path='calculator' component={CalculatorPage} />
          </Route>
        </Router>

      }
    </Provider>

  </div>
  ,
  document.getElementById('app')
);

