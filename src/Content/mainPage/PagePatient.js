import React, { Component } from 'react';
import "./PagePatient.css" 
// import {Link} from 'react-router-dom';

class PagePatient extends Component {
  clickKarton = (event) => {
    event.preventDefault(); 
  
  }

  clickProfil = (event) => {
    event.preventDefault(); 
    let patient = this.props.location.state.detail;
    
    this.props.history.push({
      pathname: '/profilepatient',
      state: { detail: patient }
    });
  }

  clickIstorija = (event) => {
    event.preventDefault(); 
  
  }

  clickKlinike = (event) => {
    event.preventDefault(); 
  
  }

  render() {
      return (
        <div className="main_div">
            <ul id="unordered_list" className="ul_list">
              <li className="li_list"><a 
              id="karton"
              onClick={this.clickKarton}> Здравствени картон </a></li>
              <li className="li_list"><a 
              id="profil" 
              onClick={this.clickProfil}> Профил корисника </a></li>
              <li className="li_list"><a 
              id="istorija" 
              onClick={this.clickIstorija}> Историја </a></li>
              <li className="li_list"><a 
              id="klinike"
              onClick={this.clickKlinike}> Листа клиника </a></li>
            </ul>
        </div>
      );
    }
}

export default PagePatient;