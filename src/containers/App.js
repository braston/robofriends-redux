import React, {Component} from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";

// Redux Imports
import { setSearchField, requestRobots } from '../actions';

// Standard name for Redux mapping
// "Tell me what piece of state I need to listen to and send down as props"
const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.handleRobots.robots,
        isPending: state.handleRobots.isPending,
        error: state.handleRobots.error
    }
}

// Dispatch is what triggers the action. Action is an object that we've created
// In order to send action, we need 'dispatch' to send to reducer
// Can now be used to send actions
// "Tell me what props I should listen to that are actions, and need to be dispatched"
const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        // Redux-thunk will catch the return below, as it is a function
        onRequestRobots: () => dispatch(requestRobots())
    }
}

//STATE is something that can change and affect our app
// Usually lives in the parent component. Component that passes state to other components

// Smart component- has state! (Smart => has state)

// EVERY TIME STATE CHANGES WE RE-RUN LIFECYLCE FUNCTIONS - IE RENDER IF THERE'S A DIFFERENCE DETECTED BY VIRTUAL DOM

// Remove searchfield from state for redux!
// Can also remove contructor, as state is no longer in React!

class App extends Component {


    // Will automatically be called after "App" is mounted
    // Included in React - NO NEED FOR ARROW FUNCTIONS
    componentDidMount(){
        this.props.onRequestRobots();
    }

    // onSearchChage replaced with Redux!
    /*
    onSearchChange = (event) => {
        // IN REACT, FOR METHODS NOT INCLUDED IN REACT, USE ARROW FUNCTIONS
        //THIS ENSURES THAT THE 'THIS' KEYWORD CONTAINS THE PROPER CONTEXT
        // NOT THE CONTEXT OF WHICH IT WAS CALLED FROM
        // IE, IN THIS CASE WITHOUT ARROW SYNTAX, 'THIS' REFERS TO AN INPUT HTML TAG
            //Every time the input changes, get an event
            this.setState({searchfield: event.target.value});
            //console.log(event.target.value);
    }
    */

    render(){
                const { searchField, onSearchChange, robots, isPending } = this.props;
                const filteredRobots = robots.filter(robot =>{
                    //If robot array (all lowercase) includes anything from searchfield, return
                    return robot.name.toLowerCase().includes(searchField.toLowerCase())
                })
                // Inline logic on return statement, based on pending condition
                return isPending ?
                    <h1>Loading...</h1> :
                (
                        <div className="tc">
                        <h1 className="f1">RoboFriends</h1>
                        <SearchBox searchChange={onSearchChange}/>
                            <Scroll>
                                <ErrorBoundry>
                                    <CardList robots={filteredRobots}/>
                                </ErrorBoundry>
                            </Scroll>
                        </div>
                )
            }
}


//export default App;
// Modified for Redux:
// Connect is a higher order function- ie, function which returns a function
// "I'm listening to this part of the state (first input), and I'm dispatching these action (second input)"
// Get the returned props to App
export default connect(mapStateToProps, mapDispatchToProps)(App);

/*

GLOBAL SUMMARY

We have our App components with two states: robots and searchField. App owns the state
any component that has state uses the class syntax in order to be able to use the constructor from Component,
which enables us to use this.state()  to track changes

Virtual DOM is just a javaScript object! Collects state, and uses this to render and pass down props to components
THIS LETS INDIVIDUAL COMPONENTS (PURE FUNCTIONS) UPDATE WITHOUT INTERFERING WITH THE APP!

method onSearchChange was passed down to searchBox. searchBox had an onChange event to run function with event
this updates searchField state to whatever is typed
This info is then communicated to cardList, and filters "robots" state to only include items spelled out
We pass the filtered list to make this happen!


*/