import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactDOM from "react-dom";
import {reduxForm, Field} from 'redux-form';
import {tryConnect, getUserProfile, updateUserProfile,getDonationData} from '../actions';
import CenterCard363 from './centerCard363';
import ReactTable from "react-table";
import * as Moment from "moment";
import Modal from "./popup";


class Account extends Component {
  constructor(){
    super();
    this.state = {
      editting: false,
      showModal:false,
      studentId:''
       
      
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
      
          {this.props.data && this.renderDonationGrid()}
        </div>
        </div>
      </CenterCard363>
    );
  }
  
  
  onrowclick(e){
    
    console.log(e)
  }
  handleHideModal(){
 
    this.setState({showModal:false})
    this.props.getDonationData();
  
    
  }
  renderDonationGrid(){
    console.log(this.props.data)
    let {data} = this.props;
    
   
      return (
        <div>
          {this.state.showModal ? <Modal studentId={this.state.studentId} handleHideModal={this.handleHideModal.bind(this)}/> :null}
          
          <ReactTable
            data={data}
            getTrProps={(state, rowInfo) => {
              return {
                onClick: (e) => {
                  console.log(e);
                  console.log(rowInfo.row._original);
                 this.setState({studentId:rowInfo.row._original.id})
this.setState({showModal:true})
               
                }
               
              }
            }}
            columns={[
             
              {
                Header: "Student Name",
                accessor: "name"
              },
              {
                Header: "Father Name",
                accessor: "fatherName"
              },
              {
                Header: "DOB",
                id:"dob",
                accessor: d => {
                  return Moment(d.dob)
                    .local()
                    .format("DD-MM-YYYY")
                }
              },{
                Header: "Caste",
                accessor: "caste.name"
              },
              {
                Header: 'Scholarship',
                accessor: "scholarship"
              },
              {
                Header: 'Donation Amount',
                accessor: "donationamount"
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