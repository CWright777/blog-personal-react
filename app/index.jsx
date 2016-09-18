import "babel-polyfill";
import './style/main.scss';
import 'font-awesome/css/font-awesome.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, applyRouterMiddleware, IndexRoute, browserHistory } from 'react-router';
import useScroll from 'react-router-scroll';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import * as actionCreators from './action_creators';
import App from './containers/App.jsx';
import { BloggingContainer } from './containers/MainBlog.jsx';
import { PublishBlogPost } from './containers/PublishBlogPost.jsx';
import ArticleView from './containers/ArticleView.jsx';
import { Contact } from './components/Contact.jsx';
import configureStore from './store/configureStore';

const store = configureStore();

const routes = (
 <Route path="/" component={App}>
    <IndexRoute component={BloggingContainer}/>
    <Route path="page/:pageNum" component={BloggingContainer}/>
    <Route path="blog/:postId" component={ArticleView}/>
    <Route path="post" component={PublishBlogPost}/>
    <Route path="contact" component={Contact}/>
  </Route>
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app')
);
