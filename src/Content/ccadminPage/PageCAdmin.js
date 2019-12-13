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
    else if(nam === "request"){
      //preuzimam iz baze listu svih zahteva za registraciju
      console.log('click zahtevi');
      const url = 'http://localhost:8081/ccadmin/requests';
      const options = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
      };

      fetch(url, options)
      .then(responseWrapped => responseWrapped.json())
      .then(response => {
        //console.log('ODGOVOR');
        //console.log(response);
        //this.setState({ccadmin:this.props.location.state.response});
        this.props.history.push({
          pathname:'/request',
          state: { detail: response}
        })
      });

    }
    else if(nam === "diagnosis"){
      console.log('click dijagnoze');
      this.props.history.push({
        pathname:'/diagnosis',
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
              <li className="li_list"><p id="request" 
              onClick={this.myClickHandler}> Zahtevi za registraciju </p></li>
              <li className="li_list"><p id="diagnosis" 
              onClick={this.myClickHandler}> Sifarnik lekova i dijagnoza</p></li>
            </ul>
        </div>
      );
    }
}

export default PageCAdmin;