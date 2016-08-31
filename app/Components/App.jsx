import React from 'react';
import Header from './Header.jsx';
import * as actionCreators from '../action_creators';

export default class App extends React.Component {
  render() {
    return this.props.children
  }
}
