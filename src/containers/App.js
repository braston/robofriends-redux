import React, {Component} from 'react';
import CardList from '../components/CardList';
//import {robots} from './robots';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";

//STATE is something that can change and affect our app
// Usually lives in the parent component. Component that passes state to other components

// Smart component- has state! (Smart => has state)

// EVERY TIME STATE CHANGES WE RE-RUN LIFECYLCE FUNCTIONS - IE RENDER IF THERE'S A DIFFERENCE DETECTED BY VIRTUAL DOM

class App extends Component {
    constructor(){
        super();
        this.state = {
            robots: [],
            searchfield: '',
        }
    }

    // Will automatically be called after "App" is mounted
    // Included in React - NO NEED FOR ARROW FUNCTIONS
    componentDidMount(){
        //CAN USE BELOW TO GET STATE!
        //console.log(this.props.store.getState())
        console.log('check');
        //this.setState({ robots: robots});
        // Update to pull random users from API
        // Use 'fetch' to make HTTP request
        // fetch is a method on window object! Tool to make requests to server
        fetch('https://jsonplaceholder.typicode.com/users')
//Convert to JSON
            .then(response =>  response.json())
//Setting robots to returned user list   
          .then(users => this.setState({robots: users}));
    }

    onSearchChange = (event) => {
        // IN REACT, FOR METHODS NOT INCLUDED IN REACT, USE ARROW FUNCTIONS
        //THIS ENSURES THAT THE 'THIS' KEYWORD CONTAINS THE PROPER CONTEXT
        // NOT THE CONTEXT OF WHICH IT WAS CALLED FROM
        // IE, IN THIS CASE WITHOUT ARROW SYNTAX, 'THIS' REFERS TO AN INPUT HTML TAG
            //Every time the input changes, get an event
            this.setState({searchfield: event.target.value});
            //console.log(event.target.value);
    }

    render(){

        const filteredRobots = this.state.robots.filter(robots =>{
            //If robot array (all lowercase) includes anything from searchfield, return
            return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        })
        //console.log(filteredRobots);
        if(this.state.robots.length === 0)
        {
            return <h1>Loading...</h1>
        }
        else{
            return (
                <div className="tc">
                <h1 className="f1">RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                             <CardList robots={filteredRobots}/>
                        </ErrorBoundry>
                    </Scroll>
                </div>
    );}

}
}

export default App;

/*

GLOBAL SUMMARY

We have our App components with two states: robots and searcField. App owns the state
any component that has state uses the class syntax in order to be able to use the constructor from Component,
which enables us to use this.state()  to track changes

Virtual DOM is just a javaScript object! Collects state, and uses this to render and pass down props to components
THIS LETS INDIVIDUAL COMPONENTS (PURE FUNCTIONS) UPDATE WITHOUT INTERFERING WITH THE APP!

method onSearchChange was passed down to searchBox. searchBox had an onChange event to run function with event
this updates searchField state to whatever is typed
This info is then communicated to cardList, and filters "robots" state to only include items spelled out
We pass the filtered list to make this happen!


*/