import './style/main.scss';
import 'font-awesome/css/font-awesome.css'
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, useRouterHistory} from 'react-router';
import { createHashHistory } from 'history'
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducer';
import * as actionCreators from './action_creators';
import App from './components/App.jsx';
import { BloggingContainer } from './components/Blog.jsx';
import { PostingAreaContainer } from './components/PostingArea.jsx'

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })
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
  <Route path="/post" component={PostingAreaContainer}/>
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={appHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
