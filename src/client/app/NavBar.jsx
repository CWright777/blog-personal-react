import React from 'react';

const divStyle = {
  width: '300em',
  backgroundColor: 'black',
}

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {likesCount : 0};
    this.onLike = this.onLike.bind(this);
  }

  onLike () {
    let newLikesCount = this.state.likesCount + 1;
    this.setState({likesCount: newLikesCount});
  }

  render() {
    return (
      <div style={divStyle}>
        d
      </div>
    );
  }

}

export default NavBar;
