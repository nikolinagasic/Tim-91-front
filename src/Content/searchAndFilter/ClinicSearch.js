import React, { Component } from 'react';
import Radium from 'radium' 
import SearchComponent from './SearchComponent'

class ClinicSearch extends React.Component {
    render(){
        return(
            <SearchComponent />
        );
    }
}

export default Radium(ClinicSearch);