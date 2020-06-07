import { 
    CHANGE_SEARCH_FIELD, 
    REQUEST_ROBOTS_FAILED, 
    REQUEST_ROBOTS_PENDING, 
    REQUEST_ROBOTS_SUCCESS
 } from './constants';

const initialStateSearch = {
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


export const searchRobots = (state=initialStateSearch, action={}) => {
    switch(action.type){
        case CHANGE_SEARCH_FIELD:
            return Object.assign({}, state, {searchField: action.payload});
            // CAN ALSO WRITE WITH OBJECT DESTRUCTURING / SPREAD OPERATOR:
            // return { ...state, {searchField: action.payload}};
        // Always return state is nothing matches!
        default:
            return state; 
    }
}

const initialStateRobots = {
    isPending: false,
    robots: [],
    error: ''
}

export const handleRobots = (state=initialStateRobots, action={}) => {
    switch(action.type){
        case REQUEST_ROBOTS_PENDING:
            return Object.assign({}, state, {isPending: true});
        case REQUEST_ROBOTS_SUCCESS:
            return Object.assign({}, state, {robots: action.payload, isPending:false});
        case REQUEST_ROBOTS_FAILED:
            return Object.assign({}, state, {error:action.payload, isPending:false});
        default:
            return state;
    }


}