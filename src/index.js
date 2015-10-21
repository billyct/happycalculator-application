import React from 'react';
import {createStore, compose} from 'redux';
import {Provider} from 'react-redux';
import { Router, Route, Redirect} from 'react-router';

import createBrowserHistory from 'history/lib/createBrowserHistory'
let history = createBrowserHistory()

import reducers from './reducers';

import App from './containers/App';
import CalculatorPage from './containers/CalculatorPage';
import FormulaPage from './containers/FormulaPage';

import persistStateLocalStorage from 'redux-localstorage';
//import { devTools, persistState } from 'redux-devtools'
//import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';


//store.js
let store;

const finalCreateStore = compose(
  //devTools(),
  persistStateLocalStorage([
    'formulas'
  ], {
    key : 'happycalculator'
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
          <Route path='calculator' component={CalculatorPage} />
          <Route path='formulas/create' component={FormulaPage} />
          <Route path='formulas/:id' component={FormulaPage} />
        </Route>
        <Redirect from="/" to="/calculator"/>
      </Router>

    }
  </Provider>
  ,
  document.getElementById('app')
);

