import {
    GET_DONATIONS,
    UPDATE_DONATION_GOOD,
    UPDATE_DONATION__FAIL
} from '../actions/types';

let INITIAL_STATE = {
    data:[]
}

export default function(state=INITIAL_STATE, action) {
    switch (action.type) {
        case GET_DONATIONS:
            return { ...state, data: action.payload }
        case UPDATE_DONATION_GOOD:
            return { ...state, updateProfileFailMsg: '' }
        case UPDATE_DONATION__FAIL:
            return { ...state, updateProfileFailMsg: 'Incorrect Password' }
        default:
            return state
    }
}