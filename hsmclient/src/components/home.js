import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
class Home extends Component {
  componentWillMount() {
    if (this.props.authenticated){
      window.location = '/#donation';
    }else{
      window.location = '/#signin';
    }
    
}
  render() {
    return (
      <div>
      <h1>Home</h1>
      </div>
    );
  }
}
function mapStateToProps({auth}){
  return {
      authenticated: auth.authenticated
  }
}
export default connect(mapStateToProps, actions)(Home)