import React from 'react';
import { Header } from '../components/Header.jsx';
import MainBlog from '../containers/MainBlog';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false
    };

    this.openModal = () => {this.setState({modalIsOpen: true})}
    this.closeModal = () => {this.setState({modalIsOpen: false})}
    //this.afterOpenModal = () => this.refs.subtitle.style.color = '#f00';
  }

  render() {
    return (
      <div style={{minHeight: '100%'}}>
        <Header 
          openModal={this.openModal}
          closeModal={this.closeModal}
          modalIsOpen={this.state.modalIsOpen}
        />
        {this.props.children}
      </div>
    )
  }
}
