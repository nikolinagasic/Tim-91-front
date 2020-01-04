import React, { Component } from 'react';
import "./PagePatient.css" 
import ProfilePatient from './ProfilePatient'
import Modal from "../Modal"
import Radium from 'radium' 
import ClinicSearch from '../searchAndFilter/ClinicSearch';
import {UserContext} from '../../UserProvider'
import PatientMedicalRecord from './PatientMedicalRecord';

class PagePatient extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      //patient: this.context.user,   // ono sto sam poslao iz prijave
      //token: this.props.location.state.token,
      isKarton: false,
      isProfil: false,
      isIstorija: false,
      isKlinike: false,

      modalShowing: false,
      headerText: '',
      staraVrednost: '',
      changedValue: '',
      modalPassword: false, 
      lista_klinika: null, 
      lista_tipova: null,
      medical_record: null
    };
  }

  clickLogout = () => {
    // obrisi token i korisnika
    this.context.token = null;
    this.context.user = null;
    this.props.history.push({
      pathname: '/login'
    });
  }

  clickKarton = (event) => {  
    document.getElementById("logo_img").style.visibility = "hidden"; 
    let mail = this.context.user.mail;
    const url = 'http://localhost:8081/medicalrecord/getRecord/' + mail;
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
       console.log("RESPONSE");
       console.log(response);
       this.setState({
         medical_record: response,
         isKarton: true,
         isProfil: false,
         isIstorija: false,
         isKlinike: false
       });
       console.log(this.state.medical_record);
    });

  }
  
  clickIstorija = (event) => {
    alert("Страница је у процесу израде");
  }

  clickKlinike = (event) => {
    document.getElementById("logo_img").style.visibility = "hidden"; 
    fetch('http://localhost:8081/clinic/getAll', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        "Auth-Token": this.context.token},
      })
      .then(responseWrapped => responseWrapped.json())
      .then(response => {
        this.setState({
          lista_klinika: response
        });

    fetch('http://localhost:8081/type/getAll', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          "Auth-Token": this.context.token}
      })
      .then(responseWrapped => responseWrapped.json())
      .then(response => {
        this.setState({
          lista_tipova: response,
          isKarton: false,
          isProfil: false,
          isIstorija: false,
          isKlinike: true
        });
      });
    });
  }

  clickProfil = (event) => {
    console.log('kliknuo na profil');
    document.getElementById("logo_img").style.visibility = "hidden"; 

    const url = 'http://localhost:8081/patient/getPat';
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Auth-Token': this.context.token
      },
    };

    fetch(url, options)
    .then(responseWrapped => responseWrapped.json())
      .then(response => {
        console.log('patient first name: ' + response.firstName);
        
        this.setState({
          //patient: response,
          isKarton: false,
          isProfil: true,
          isIstorija: false,
          isKlinike: false
        });
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
      this.setState({staraVrednost: this.context.user.firstName});
    }
    else if(naziv === 'prezime'){
      this.setState({headerText: "Измена презимена"});
      this.setState({staraVrednost: this.context.user.lastName});
    }
    else if(naziv === 'adresa'){
      this.setState({headerText: "Измена адресе"});
      this.setState({staraVrednost: this.context.user.address});
    }
    else if(naziv === 'grad'){
      this.setState({headerText: "Измена града"});
      this.setState({staraVrednost: this.context.user.city});
    }
    else if(naziv === 'drzava'){
      this.setState({headerText: "Измена државе"});
      this.setState({staraVrednost: this.context.user.country});
    }
    else if(naziv === 'telefon'){
      this.setState({headerText: "Измена телефона"});
      this.setState({staraVrednost: this.context.user.telephone});
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
  
  let email = this.context.user.mail;
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
  //console.log(nazivAtributa + " : " + novaVrednost)

  if(nazivAtributa === 'telefon'){
    if (!Number(novaVrednost)) {
      return false;
    }
  }
  
  if(nazivAtributa === 'ime'){
    this.context.user.firstName = novaVrednost;
  }
  else if(nazivAtributa === 'prezime'){
    this.context.user.lastName = novaVrednost;
  }
  else if(nazivAtributa === 'adresa'){
    this.context.user.address = novaVrednost;
  }
  else if(nazivAtributa === 'grad'){
    this.context.user.city = novaVrednost;
  }
  else if(nazivAtributa === 'drzava'){
    this.context.user.country = novaVrednost;
  }
  else if(nazivAtributa === 'telefon'){
    this.context.user.telephone = novaVrednost;
  }

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
        "Auth-Token": this.context.token
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

      let modalniSifra = null;
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
                  id="newPassword_input1"></input>
                  <p>Унесите лозинку поново:</p>
                  <input type="password" 
                    className="input_field"
                    id="newPassword_input2"></input>
              </form>
          </Modal>
        );
      }

      let klinike = null;
      if(this.state.isKlinike){
        klinike = (
          <ClinicSearch
           token = {this.context.token} 
           lista_klinika = {this.state.lista_klinika}
           lista_tipova = {this.state.lista_tipova}
           />
        );
      }

      let karton = null;
      if(this.state.isKarton){
        karton = (
          <PatientMedicalRecord
             pat = {this.state.medical_record}
             show = {this.state.isKarton}
          >
         </PatientMedicalRecord>
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
            <li className="li_list"><a 
            id="logout_patient"
            onClick={this.clickLogout}> Одјави се </a></li>
          </ul>
          
          <ProfilePatient
            pat={this.context.user}
            show = {this.state.isProfil}
            clickIzmena={this.clickIzmena}
            clickZabrana={this.clickZabrana}
            clickSifra={this.changePassword}
            > 
          </ProfilePatient>
          
         

          {modalni} 
          {modalniSifra}
          {klinike}   
          {karton} 
        </div>
      );
    }
    /*
<PatientMedicalRecord
             pat = {this.state.medical_record}
             show = {this.state.isKarton}
             >
          </PatientMedicalRecord>


    */
}

export default Radium(PagePatient);