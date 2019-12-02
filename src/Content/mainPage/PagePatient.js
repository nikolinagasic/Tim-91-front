import React, { Component } from 'react';
import "./PagePatient.css" 
// import {Link} from 'react-router-dom';

class PagePatient extends Component {
  myClickHandler = (event) => {
    event.preventDefault();
    
    let patient = this.props.location.state.detail;
    let nam = event.target.id;
    
    if(nam === "karton"){
      console.log('click karton');
    }
    else if(nam === "profil"){
      this.props.history.push({
        pathname: '/profilepatient',
        state: { detail: patient }
      })
    }
    else if(nam === "istorija"){
      console.log('click istorija');
    }
    else if(nam === "klinike"){
      console.log('click klinike');
    }
    else{
      console.log('greska');
    }
  }

  render() {
      return (
        <div>
            <ul id="unordered_list">
              <li><p id="karton"
              onClick={this.myClickHandler}> Zdravstveni karton </p></li>
              <li><p id="profil" 
              onClick={this.myClickHandler}> Profil korisnika </p></li>
              <li><p id="istorija" 
              onClick={this.myClickHandler}> Istorija pregleda i operacija </p></li>
              <li><p id="klinike"
              onClick={this.myClickHandler}> Lista klinika </p></li>
            </ul>
        </div>
      );
    }
}

export default PagePatient;