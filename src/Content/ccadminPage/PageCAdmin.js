import React, { Component } from 'react';
import "./PageCAdmin.css" 
import "../mainPage/PagePatient.css" 
// import {Link} from 'react-router-dom';

class PageCAdmin extends Component {
  myClickHandler = (event) => {
    event.preventDefault();
    
    let ccadmin = this.props.location.state.detail;
    let nam = event.target.id;
    
    if(nam === "cadmin"){
      console.log('click cadmin');
      this.props.history.push({
        pathname:'/admin',
        state: { detail: ccadmin }
      })
    }
    else if(nam === "profil"){
      this.props.history.push({
        pathname: '/profilecadmin',
        state: { detail: ccadmin }
      })
    }
    else if(nam === "clinic"){
      console.log('click klinike');
      this.props.history.push({
        pathname:'/clinic',
        state: { detail: ccadmin }
      })
    }
    else{
      console.log('greska');
    }
  }

  render() {
      return (
        <div class="menu">
            <ul className="ul_list">
              <li className="li_list"><p id="profil"
              onClick={this.myClickHandler}> Profil korisnika</p></li>
              <li className="li_list"><p id="cadmin" 
              onClick={this.myClickHandler}> Registracija administratora </p></li>
              <li className="li_list"><p id="clinic" 
              onClick={this.myClickHandler}> Registracija klinike </p></li>
            </ul>
        </div>
      );
    }
}

export default PageCAdmin;