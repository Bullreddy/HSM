import axios from 'axios';
import { 
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    TRY_CONNECT,
    GET_USER_PROFILE,
    UPDATE_USER_PROFILE_GOOD,
    UPDATE_USER_PROFILE_FAIL ,
    GET_DONATIONS,
    GET_DONATION_PER_STUDENT,
    ADD_DONATION,
    UPDATE_DONATION,
    DELETE_DONATION
} from './types';
const ROOT_URL = 'http://localhost:8000';

axios.defaults.baseURL = ROOT_URL;
if (localStorage.getItem('auth_jwt_token')) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_jwt_token');
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export function signUserIn(data) {
    return function (dispatch) {
        // Submit email/password to server
        axios
            .post(`/signin`, data)
            .then(res => {
                dispatch({type: AUTH_USER})
                localStorage.setItem('auth_jwt_token', res.data.token);
                window.location = '/#donation';
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_jwt_token');
            })
            .catch(error => {
                console.log(error);
                dispatch({type: AUTH_ERROR, payload: 'Server Error, try later.'})
            });
    }
}
export function updateDonationData(donation){
    
    return function (dispatch) {
        axios
            .put(`/api/updatedonation`,donation)
            .then(res => {
                console.log(res)
                dispatch({
                    type: UPDATE_DONATION,
                    payload: res
                })
            })
            .catch(error => console.log(error));
    }
}
export function deleteDonationData(donation){
    
    return function (dispatch) {
        axios
            .delete(`/api/deletedonation`,{params:{donationid:donation.donationid}})
            .then(res => {
                console.log(res)
                dispatch({
                    type: DELETE_DONATION,
                    payload: res
                })
            })
            .catch(error => console.log(error));
    }
}
export function getDonationData(){
    return function (dispatch) {
        axios
            .get(`/api/getdonations`)
            .then(res => {
                console.log(res)
                dispatch({
                    type: GET_DONATIONS,
                    payload: res.data
                })
            })
            .catch(error => console.log(error));
    }
}
export function addDonation(donation){
    return function (dispatch) {
        // Submit email/password to server
        axios
            .post(`/api/adddonation`, donation)
            .then(res => {
                dispatch({type: ADD_DONATION,
                    payload: res.data
                     })
                })
            .catch(error => {
                console.log(error);
                dispatch({type: AUTH_ERROR, payload: 'Server Error, try later.'})
            });
    }
}
export function getDonationDataByStudent(student){
    return function (dispatch) {
        console.log(student)
        axios
            .get(`/api/getdonationbystudent`,{params:{id:student}})
            .then(res => {
                console.log(res)
                dispatch({
                    type: GET_DONATION_PER_STUDENT,
                    payload: res.data
                })
            })
            .catch(error => console.log(error));
    }
}

export function signUserUp(userObj) {
    return function (dispatch) {
        // Submit email/password to server
        axios
            .post(`/signup`, userObj)
            .then(res => {
                dispatch({type: AUTH_USER})
                localStorage.setItem('auth_jwt_token', res.data.token);
                window.location = '/#donation';
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_jwt_token');
            })
            .catch(error => {
                console.log(error);
                dispatch({type: AUTH_ERROR, payload: 'Server Error, try later.'})
            });
    }
}

export function signUserOut() {
    return function (dispatch) {
        dispatch({type: UNAUTH_USER})
        localStorage.removeItem('auth_jwt_token');
        window.location = '/#signin';
    }
}

export function tryConnect() {
    return function (dispatch) {
        axios
            .get(`/api`)
            .then(res => {
                console.log(res)
                dispatch({
                    type: TRY_CONNECT,
                    payload: res.data
                })
            })
            .catch(error => console.log(error.response.data));
    }
}
export function getUserProfile() {
    return function (dispatch) {
        axios
            .get(`/api/userProfile`)
            .then(res => {
                dispatch({
                    type: GET_USER_PROFILE,
                    payload: res.data
                })
            })
            .catch(error => console.log(error.response.data));
    }
}

export function updateUserProfile(profile) {
    return function (dispatch) {
       
    }
}
