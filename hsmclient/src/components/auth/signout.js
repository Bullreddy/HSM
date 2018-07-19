import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
    componentWillMount() {
        this.props.signUserOut();
        
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default connect(null, actions)(Signout)