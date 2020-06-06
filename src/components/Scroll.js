import React from 'react';

const Scroll = (props) => {
 //return props.children;
 return(
    //Can create a scrollable element by using div and styles HERE

    //In JSX, we can add styles by using {{}} syntax
    //Javascript expression, within it we are returning an object
    //This object can have CSS styles

    <div style={{ overflowY: 'scroll', border: '1px solid black', height:'600px'}}>
        {props.children}
    </div>

 );
};

export default Scroll;