import React, { Component } from 'react';
import "./PagePatient.css" 
import ProfilePatient from './ProfilePatient'
import Modal from "../Modal"
import Radium from 'radium' 
import ClinicSearch from '../searchAndFilter/ClinicSearch';
// import {Link} from 'react-router-dom';

class PagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: this.props.location.state.detail,   // ono sto sam poslao iz prijave
      token: this.props.location.state.token,
      isKarton: false,
      isProfil: false,
      isIstorija: false,
      isKlinike: false,

      modalShowing: false,
      headerText: '',
      staraVrednost: '',
      changedValue: '',
      modalPassword: false
    };
  }


  clickKarton = (event) => {
    alert("Страница је у процесу израде");
  }
  
  clickIstorija = (event) => {
    alert("Страница је у процесу израде");
  }

  clickKlinike = (event) => {
    document.getElementById("logo_img").style.visibility = "hidden"; 
    this.setState({
      isKarton: false
    });
    this.setState({
      isProfil: false
    });
    this.setState({
      isIstorija: false
    });
    this.setState({
      isKlinike: true
    });
  }

  clickProfil = (event) => {
    console.log('kliknuo na profil');
    document.getElementById("logo_img").style.visibility = "hidden"; 
    this.setState({
      isKarton: false
    });
    this.setState({
      isProfil: true
    });
    this.setState({
      isIstorija: false
    });
    this.setState({
      isKlinike: false
    });
  }

  clickZabrana = (polje) => {
    console.log(polje);
    if(polje === 'mail'){
      alert('Није могуће мењати вредност поља е-поште.');
    }
    else if(polje === 'lbo'){
      alert('Није могуће мењати вредност ЛБО.');
    }
  }

  clickIzmena = (naziv, staraVr) => {
    console.log(naziv);
    this.setState({
        modalShowing: true
    });
    this.setState({changedValue: naziv});

    if(naziv === 'ime'){
      this.setState({headerText: "Измена имена"});
      this.setState({staraVrednost: this.state.patient.firstName});
    }
    else if(naziv === 'prezime'){
      this.setState({headerText: "Измена презимена"});
      this.setState({staraVrednost: this.state.patient.lastName});
    }
    else if(naziv === 'adresa'){
      this.setState({headerText: "Измена адресе"});
      this.setState({staraVrednost: this.state.patient.address});
    }
    else if(naziv === 'grad'){
      this.setState({headerText: "Измена града"});
      this.setState({staraVrednost: this.state.patient.city});
    }
    else if(naziv === 'drzava'){
      this.setState({headerText: "Измена државе"});
      this.setState({staraVrednost: this.state.patient.country});
    }
    else if(naziv === 'telefon'){
      this.setState({headerText: "Измена телефона"});
      this.setState({staraVrednost: this.state.patient.telephone});
    }
    else{
      console.log('greska izmena');
    }
 }

 sendModalHandler = (event) => {
   //console.log('usao u sendovanje');
   this.setState({
      modalShowing: false
  });
  let newValue = document.getElementById("newValue_input").value;
  let changedName = this.state.changedValue;
  
  // menjam stanje state-a cim se promeni na formi
  const sve_ok = this.promenaState(changedName, newValue);
  if(!sve_ok){
    alert('Телефон се мора састојати искључиво од цифара.');
    return;
  }
  
  let email = this.state.patient.mail;
  const url = 'http://localhost:8081/patient/changeAttribute/'+changedName+"/"+newValue+"/"+email;
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
  };

  fetch(url, options)
    .then(response => {
      console.log(response.ok);
      console.log(response)
      if(response.ok === true){
        alert("Успешно сте изменили поље '" + changedName+"'.");
      }
      else {
        alert("Дошло је до грешке приликом измене поља '" + changedName + "'.");
      }
    });
 }

 promenaState = (nazivAtributa, novaVrednost) => {
  if(nazivAtributa === 'telefon'){
    if (!Number(novaVrednost)) {
      return false;
    }
  }
  
  // kopija pacijenta
  const patient = {       
    ...this.state.patient
  };
  
  if(nazivAtributa === 'ime'){
    patient.firstName = novaVrednost;
  }
  else if(nazivAtributa === 'prezime'){
    patient.lastName = novaVrednost;
  }
  else if(nazivAtributa === 'adresa'){
    patient.address = novaVrednost;
  }
  else if(nazivAtributa === 'grad'){
    patient.city = novaVrednost;
  }
  else if(nazivAtributa === 'drzava'){
    patient.country = novaVrednost;
  }
  else if(nazivAtributa === 'telefon'){
    patient.telephone = novaVrednost;
  }

  // update-uj state
  this.setState({patient : patient});
    return true;
  }

  sendChangedPassword = () => {
    let password = document.getElementById("newPassword_input1").value;
    let password1 = document.getElementById("newPassword_input2").value;
    if(password !== password1){
      alert("Проверите да ли сте адекватно унели лозинку у оба поља.");
      return;
    }

    console.log('pass: ' + password);
    if(password.length < 8){
      alert('Лозинка мора садржати барем 8 карактера.');
      return;
    }
    
    const url = 'http://localhost:8081/patient/changePassword';
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "text/plain",
        "Auth-Token": this.state.token
      },
      body: password
    };

    fetch(url, options)
      .then(response => {
        console.log(response);
        if(response.ok === true){
          alert("Успешно сте изменили лозинку.");
        }
        else {
          if(response.status === 401){
            alert("Немате права за приступ датој опцији. (401 Unauthorized)");
          }else{
            alert("Дошло је до грешке приликом измене лозинке");
          }
        }

      });

      this.setState({
        modalPassword: false
      }); 
  }

  changePassword = () => {
    this.setState({
      modalPassword: true
    });
  }

  closeModalHandler = () => {
    this.setState({
        modalShowing: false
    });
    this.setState({
      modalPassword: false
    }); 
  }

  render() {
      let modalni = null;
      let modalniSifra = null;
      if(this.state.modalShowing){
        modalni = (
          <Modal
            className="modal"
            show={this.state.modalShowing}
            close={(event) => this.closeModalHandler(event)}
            send={this.sendModalHandler}
            header={this.state.headerText}
            >
              <form>
                <p>Стара вредност:</p>
                <input type="text"
                  className="input_field" 
                  value={this.state.staraVrednost}
                  disabled></input>
                <p>Нова вредност:</p>
                <input type="text" 
                  className="input_field"
                  id="newValue_input"></input>
              </form>
          </Modal>);
      }

      if(this.state.modalPassword){
        modalniSifra = (
          <Modal
            className="modal"
            show={this.state.modalPassword}
            close={(event) => this.closeModalHandler(event)}
            send={this.sendChangedPassword}
            header={"Промени лозинку"}
            >
              <form>
                <p>Унесите нову вредност лозинке:</p>
                <input type="password" 
                  className="input_field"
                  value=""
                  id="newPassword_input1"></input>
                  <p>Унесите лозинку поново:</p>
                  <input type="password" 
                    className="input_field"
                    value=""
                    id="newPassword_input2"></input>
              </form>
          </Modal>
        );
      }

      let klinike = null;
      if(this.state.isKlinike){
        klinike = (
          <ClinicSearch
           token = {this.state.token} />
        );
      }


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
          
          <ProfilePatient
            pat={this.state.patient}
            show = {this.state.isProfil}
            clickIzmena={this.clickIzmena}
            clickZabrana={this.clickZabrana}
            clickSifra={this.changePassword}
            > 
          </ProfilePatient>

          {modalni} 
          {modalniSifra}
          {klinike}    
        </div>
      );
    }
}

export default Radium(PagePatient);