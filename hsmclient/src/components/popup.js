
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ReactDOM from "react-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

 
import {getDonationDataByStudent,addDonation,updateDonationData,deleteDonationData} from '../actions';

import CRUDTable, { Fields, Field, Pagination,CreateForm,
  UpdateForm,
  DeleteForm } from "react-crud-table";

class Modal extends Component {


  constructor(){

    super();
  this.state={
    popupShown:false,
    donations:[],startDate: moment()

  }
  this.handleChange = this.handleChange.bind(this);
  
  }
componenentWillMount(){

}
 
  componentDidMount(){
   this.props.getDonationDataByStudent(this.props.studentId);
     
      $(ReactDOM.findDOMNode(this)).modal('show');
    
     $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
  }
  componentWillReceiveProps(nextProps){
console.log(nextProps)
if(nextProps.newdonation!=undefined && this.state.popupShown){
   //this.state.donations

   
   this.state.donations.forEach(element => {
     if(!element.hasOwnProperty("_id")){
       element._id=nextProps.newdonation._id;
       element.donationid=nextProps.newdonation.donationid;
     }
   })
   console.log(this.state.donations)
}else{
  console.log('new ppopopop')
this.setState({popupShown:true});
  this.setState({donations:[]})
  console.log(this.state.donations)
  if(nextProps.dataByStud){
  
    let counter=0;
    nextProps.dataByStud.forEach(element => {
     counter+=1;  
      console.log(element.createddate)
      let date=element.createddate?moment(element.createddate).format('YYYY-MM-DD'):null;
           this.state.donations.push({
  donationid:element.donationid,
    createdby:element.createdby,
    donationamount:element.donationamount,
      createddate:date,
   id:counter
     })
    
    });
    this.setState({donations:this.state.donations})
    console.log(this.state.donations)
  }
}
  }

  saveChangestoService(){
    console.log('changes');

  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
  onDateChange(value) {
    alert();
    // for a date field, the value is passed into the change handler
   // this.props.onChange('', dateValue);
    this.setState({['dateCommenced']: value});
}
  render(){
   
    const styles = {
      container: { margin: "auto", width: "fit-content" }
    };
     
       console.log(this.props.dataByStud)
    let count = this.state.donations.length;
   
  console.log(this.state.donations)
    const service = {
      fetchItems: payload => {
      
       
       
        console.log(this.state.donations)
        //result = result.sort(getSorter(payload.sort));
        return Promise.resolve(this.state.donations);
      }, create: (task) => {
        console.log(task)

      
        count += 1;
        this.state.donations.push({
          ...task,
          id:count
        });
        this.props.addDonation({...task,studentid:this.props.studentId,  id:count})
       
        return Promise.resolve(task);
      }, update: (data) => {
        console.log(data)
        const task =  this.state.donations.find(t => t.donationid === data.donationid);
        console.log(this.state.donations)
        task.donationamount = data.donationamount;
        task.createdby = data.createdby;
        task.createddate=data.createddate;
        this.props.updateDonationData({...task,studentid:this.props.studentId})
      
      
        return Promise.resolve(task);
       
       
      },
      delete: (data) => {
        const task =  this.state.donations.find(t => t.donationid === data.donationid);
        this.state.donations =  this.state.donations.filter(t => t.donationid !== task.donationid);
        this.props.deleteDonationData({...task,studentid:this.props.studentId})
      console.log(  this.state.donations)
      this.setState({donations:this.state.donations})
        return Promise.resolve(task);
      }
    };
    //const DateRenderer = ({ field }) => <DatePicker  {...field} dateForm="MM/DD/YYYY" onChange={(event, value) => field.onChange(value)}/>;
    const renderDatePicker = ({field}) => {
    console.log(field)
    let date=field.value?moment(field.value).format('DD-MM-YYYY'):null
    console.log(moment(field.value))
      return(
            <input type="date" {...field} 
         
            />
      )  
      }
    console.log(service)
    return (
        <div className="modal modal-xl fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Donation</h4>
              </div>
              <div className="modal-body">
               { 

                  <CRUDTable
      caption="Donations"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
      <Field
          name="id"
          label="Id"
          hideInCreateForm
          hideInUpdateForm
          
        />
        <Field
          name="donationamount"
          label="Donation Amount"
          type="number"
          placeholder="Donation Amount"
          
        />
        <Field
          name="createdby"
          label="Collected By"
          placeholder="Collected By"
       

          
        />
        <Field
          name="createddate"
          label="Collected Date"
         render={renderDatePicker}
          placeholder="Collected Date"
          type="date"
          format="dd/MM/YYYY"
       
        />
      </Fields>
      <CreateForm
        title="Donation Creation"
        message="Create a Donation!"
        trigger="Create"
        onSubmit={task => service.create(task)}
        submitText="Create"
        validate={(values) => {
           const errors = {};
           
           if (!values.donationamount || isNaN(values.donationamount)){

            errors.donationamount = 'Please, provide Donation';
           }
          
      
    
        if (!values.createdby) {
          errors.createdby = 'Please, provide ceratedBy ';
        }
        if (!values.createddate) {
          errors.createddate = 'Please, provide date ';
        }

        return errors;
          
        }}
      
      />
        <UpdateForm
        title="Donation Update Process"
        message="Update Donation"
        trigger="Update"
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={(values) => {
          const errors = {};
          if (!values.donationamount || isNaN(values.donationamount)){

          
           errors.donationamount = 'Please, provide Donation';
         
       }

       if (!values.createdby) {
         errors.createdby = 'Please, provide ceratedBy ';
       }
       if (!values.createddate) {
        errors.createddate = 'Please, provide date ';
      }
       return errors;
         
       }}
/>
<DeleteForm
        title="Donation Delete Process"
        message="Are you sure you want to delete the donation?"
        trigger="Delete"
        onSubmit={task => service.delete(task)}
        submitText="Delete"
        validate={(values) => {
          const errors = {};
          if (!values.id) {
            errors.id = 'Please, provide id';
          }
          return errors;
        }}
      />
    </CRUDTable>
               }
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={this.saveChangestoService.bind(this)}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )
  }
 
}
function mapStateToProps({donation}) {
console.log(donation)
  return {
    dataByStud:donation.dataByStud.data,

    newdonation:donation.donation.data
  
}
}

export default connect(mapStateToProps, {getDonationDataByStudent,addDonation,updateDonationData,deleteDonationData})(Modal);







