import React, { Component } from 'react';

class ErrorBoundry extends Component {
    constructor(props){
        super(props);
        this.state = {
            hasError: false
        }
    }

 //Method introduced in React 16, similar to JavaScript try/catch
 componentDidCatch(error, info){
     //If anything errors out, run block
     //console.log(error);
     this.setState({ hasError: true });

 }

    render(){
        //If there's an error, spit out h1 tag
        if(this.state.hasError){
            return <h1> Ooops. That is not good</h1>
        }

        //Render the children, or whatever is inside ErrorBoundry tag
        return this.props.children
    }
}

export default ErrorBoundry;