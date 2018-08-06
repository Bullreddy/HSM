import {
    GET_DONATIONS,
    UPDATE_DONATION_GOOD,
    UPDATE_DONATION__FAIL,
    GET_DONATION_PER_STUDENT,
    ADD_DONATION,
    UPDATE_DONATION,
    DELETE_DONATION
} from '../actions/types';

let INITIAL_STATE = {
    data:[],
    dataByStud:[],
    donation:{}
}

export default function(state=INITIAL_STATE, action) {
    switch (action.type) {
        case GET_DONATIONS:
            return { ...state, data: action.payload }
            case ADD_DONATION:
            return {...state,donation:action.payload}

            case UPDATE_DONATION:
            return {...state}
       case DELETE_DONATION:
           return {...state}
        case GET_DONATION_PER_STUDENT:
       
        console.log(action.payload)
            return { ...state, dataByStud: action.payload }
        case UPDATE_DONATION__FAIL:
            return { ...state, updateProfileFailMsg: 'Incorrect Password' }
        default:
            return state
    }
}