import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {tryConnect, getUserProfile, updateUserProfile,getDonationData} from '../actions';
import CenterCard363 from './centerCard363';
import ReactTable from "react-table";


class Account extends Component {
  constructor(){
    super();
    this.state = {
      editting: false
    
       
      
    }
  }
  componentWillMount() {
    this.props.tryConnect();
    this.props.getUserProfile();
    this.props.getDonationData();
  }
 
  render() {
    
    return (
      <CenterCard363>
        <div className='card border-secondary'>
        <h4 className="card-header">
          Donation
        </h4>
        <div className='card-body'>
      
          {this.renderDonationGrid()}
        </div>
        </div>
      </CenterCard363>
    );
  }
  
  
  
 
  renderDonationGrid(){
    let {data} = this.props;
    
   
    
      return (
        <div>
          <ReactTable
            data={data}
            columns={[
              {
                Header: "Id",
                accessor: "id"
              },
              {
                Header: "Name",
                accessor: "name"
              },
              {
                Header: 'StudentId',
                accessor: "studentId"
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
          <br />
         
        </div>
      );
  }
}

function mapStateToProps({auth, user, donation}) {

  return {
    data:donation.data.data
  
}
}


export default connect(mapStateToProps, {tryConnect, getUserProfile, getDonationData})(Account);