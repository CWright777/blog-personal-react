import React from 'react';
import {render} from 'react-dom';
import NavBar from './NavBar.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
        <NavBar />
      </div>
    );
  }
}
render(<App/>, document.getElementById('app'));
