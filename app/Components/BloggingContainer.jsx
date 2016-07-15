import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import Blog from './Blog'

export const Blogging = React.createClass({
  render: function(){
    return <div>
      <blog {...this.props} />
    </div>
  }
});

const mapStateToProps = function(state){
  return {
    data: state.data,
  }
}
