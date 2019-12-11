import React, { Component } from 'react';
import "./PageAdmin.css"
import "../mainPage/PagePatient.css" 
// import {Link} from 'react-router-dom';

class PageAdmin extends Component {
  myClickHandler = (event) => {
    event.preventDefault();
    
    let cadmin = this.props.location.state.detail;
    let nam = event.target.id;
    
    if(nam === "doctor"){
      console.log('click doctor');
    }
    else if(nam === "profil"){
      this.props.history.push({
        pathname: '/profileadmin',
        state: { detail: cadmin }
      })
    }
    else if(nam === "nurse"){
      console.log('click nurse');
    }
    else{
      console.log('greska');
    }
  }

  render() {
      return (
        <div>
            <ul className="ul_list">
              <li className="li_list"><p id="profil"
              onClick={this.myClickHandler}> Profil korisnika</p></li>
              <li className="li_list"><p id="doctor" 
              onClick={this.myClickHandler}> Registracija lekara </p></li>
              <li className="li_list"><p id="nurse" 
              onClick={this.myClickHandler}> Registracija medicinske sestre </p></li>
            </ul>
        </div>
      );
    }
}

export default PageAdmin;