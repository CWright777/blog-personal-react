import "babel-polyfill";
import './style/main.scss';
import 'font-awesome/css/font-awesome.css'
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, useRouterHistory, applyRouterMiddleware} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import useScroll from 'react-router-scroll';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducer';
import * as actionCreators from './action_creators';
import App from './components/App.jsx';
import { BloggingContainer } from './components/Blog.jsx';
import { PostingAreaContainer } from './components/PostingArea.jsx'
import { ArticleContainer } from './components/ArticleView.jsx'
import { Contact } from './components/Contact.jsx'

const appHistory = useRouterHistory(createBrowserHistory)();
const loggerMiddleware = createLogger()

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

const routes = <Route component={App} >
  <Route path="/" component={BloggingContainer}/>
  <Route path="/blog/:pageNum" component={BloggingContainer}/>
  <Route path="/post" component={PostingAreaContainer}/>
  <Route path="/blog/:postId" component={ArticleContainer}/>
  <Route path="/contact" component={Contact}/>
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={appHistory} render={applyRouterMiddleware(useScroll())}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
