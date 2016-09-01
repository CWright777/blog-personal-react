import React from 'react';
import Header from './Header.jsx';
import MainBlog from '../containers/MainBlog';
import * as actionCreators from '../action_creators';
import { connect } from 'react-redux';

export default class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

//export default connect(mapStateToProps)(App)
