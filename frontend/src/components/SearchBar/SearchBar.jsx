import React from 'react';

const SearchBar = (props) => {
    return <input name="" value={props.userInput} onChange={(e)=>props.handleChange(e)}/>;
}
 
export default SearchBar;



