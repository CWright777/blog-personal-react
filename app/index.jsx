import './main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducer';
import * as actionCreators from './action_creators';
import App from './components/App.jsx';
import { BloggingContainer } from './components/Blog.jsx';
import { PostingArea} from './components/PostingArea.jsx'

const loggerMiddleware = createLogger()

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

const routes = <Route component={App}>
  <Route path="/" component={BloggingContainer}/>
  <Route path="/post" component={PostingArea}/>
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
