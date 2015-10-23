import React from 'react';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import { Router, Route, IndexRoute} from 'react-router';

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import { createHistory, useBasename } from 'history';

import {LOCAL_STORAGE_KEY} from './constants';

import reducers from './reducers';

import App from './containers/App';
import CalculatorPage from './containers/CalculatorPage';
import FormulaPage from './containers/FormulaPage';

import persistStateLocalStorage from 'redux-localstorage';
//import { devTools, persistState } from 'redux-devtools'
//import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

//only dev true show logger
const __DEV__ = true;
let logger = createLogger({
  predicate: (getState, action) => __DEV__
});

const history = useBasename(createHistory)({
  basename: '/happycalculator-application'
})

let middleware = [thunk, logger];



//store.js
let store;

const finalCreateStore = compose(
  //devTools(),
  applyMiddleware(...middleware),
  persistStateLocalStorage([
    'formulas', 'config'
  ], {
    key : LOCAL_STORAGE_KEY
  })
  //persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

store = finalCreateStore(reducers);

//<DebugPanel top right bottom>
//  <DevTools store={store} monitor={LogMonitor} />
//</DebugPanel>
//index
React.render(
  <Provider store={store}>
    {() =>
      <Router history={history}>
        <Route path='/' component={App}>
          <IndexRoute component={CalculatorPage} />
          <Route path='calculator' component={CalculatorPage} />
          <Route path='formulas/create' component={FormulaPage} />
          <Route path='formulas/:id' component={FormulaPage} />
        </Route>
      </Router>
    }
  </Provider>
  ,
  document.getElementById('app')
);

