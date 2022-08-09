import React from 'react';
import "./SearchBar.css";

const SearchBar = (props) => {
    return <input name="searchbar" class="searchbar" value={props.userInput} onChange={(e)=>props.handleChange(e)}/>;
}
 
export default SearchBar;



