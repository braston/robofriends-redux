import { CHANGE_SEARCH_FIELD} from './constants';

const initialState = {
    searchField: ''
}

/*
// Reducer takes in state and action
// Bring in initial state and empty action (which is an object)
// Take input, if it cares about the action, act on it
// IE, with searchRobots, if relevant action is passed, do something
// Use switch to check action type (from action.js)
// If searchField, return new state
// Following 3 principles:
    1- Single source of Truth
    2- State is read only
    3- Changes using pure functions (get input, return same output)
Return new state via Object.assign command. Receive acion, update state with action payload
**Standard redux syntax!
*/


export const searchRobots = (state=initialState, action={}) => {
    switch(action.type){
        case CHANGE_SEARCH_FIELD:
            return Object.assign({}, state, {searchField: action.payload});
            // CAN ALSO WRITE WITH OBJECT DESTRUCTURING / SPREAD OPERATOR:
            // return { ...state, {searchField: action.payload}};

        default:
            return state; 
    }
}