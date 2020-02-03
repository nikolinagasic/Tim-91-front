import React, { Component } from 'react';
import "./PageNurse.css" 
import ProfileNurse from './ProfileNurse'
import Window from 'react-awesome-modal'
import {UserContext} from '../../UserProvider'


class PageNurse extends Component {
  static contextType = UserContext;     // instanciram context

  constructor(props) {
    super(props);
    this.state = {
      nurse: this.props.location.state.detail, 
      isProfile: false,
      isPrescription: false,
      isPatients: false,
      isCalendar: false,
      isVacation: false,

      modalIzmena: false,
      headerText: '',
      staraVrednost: '',
      changedValue: '',
      modalPassword: false
    };
  }


  clickPrescription = (event) => {
    alert("Страница је у процесу израде");
  }

  clickProfile = (event) => {
    console.log('kliknuo na profil');
    document.getElementById("logo_img").style.visibility = "hidden"; 
    this.setState({
      isPrescription: false,
      isProfile: true,
      isPatients: false,
      isCalendar: false,
      isVacation: false
    });
  }

  clickPatients = (event) => {
    alert("Страница је у процесу израде");
  }

  clickCalendar = (event) => {
    alert("Страница је у процесу израде");
  }

  clickVacation = (event) => {
    alert("Страница је у процесу израде");
  }
  clickLogout = (event) => {
    this.context.token = null;
    this.context.user = null;
    this.props.history.push({
    pathname: '/login'
    }); 
  }
  clickZabrana = (polje) => {
    if (polje === 'mail') {
      alert('Није могуће мењати вредност поља е-поште.');  
    }
    else if (polje === 'klinika') {
      alert('Није могуће мењати вредност поља клинике.');  
    }  
    else if (polje === 'smena') {
      alert('Није могуће мењати смену.');  
    }      
  }

  clickIzmena = (naziv, staraVr) => {
    this.setState({
        modalIzmena: true
    });
    this.setState({changedValue: naziv});

    if(naziv === 'ime'){
      this.setState({headerText: "Измена имена"});
      this.setState({staraVrednost: this.state.nurse.firstName});
    }
    else if(naziv === 'prezime'){
      this.setState({headerText: "Измена презимена"});
      this.setState({staraVrednost: this.state.nurse.lastName});
    }
    else{
      console.log('greska izmena');
    }
 }


 sendChangeHandler = () => {
   this.setState({
      modalIzmena: false
  });
  let newValue = document.getElementById("newValue_input").value;
  let changedName = this.state.changedValue;
  const sve_ok = this.promenaState(changedName, newValue);
      if(!sve_ok){
        return;
      }
  let email = this.state.nurse.mail;
  const url = 'http://localhost:8081/nurse/changeAttribute/'+changedName+"/"+newValue+"/"+email;
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
  
  const nurse = {       
    ...this.state.nurse
  };
  
  if(nazivAtributa === 'ime'){
    nurse.firstName = novaVrednost;
  }
  else if(nazivAtributa === 'prezime'){
    nurse.lastName = novaVrednost;
  }
  this.setState({nurse : nurse});
    return true;
  }

  sendChangedPassword = () => {
    let pass1 = document.getElementById('firstPassword_input1').value;
      let pass2 = document.getElementById('firstPassword_input2').value;
      
      if(pass1.length < 8 || pass2.length < 8){
        alert('Лозинка мора садржати минимално 8 карактера.');
        return;
      }
      if(pass1 !== pass2){
        alert('Поновите исту лозинку у оба поља.');
        return;
      }
  
      const url = 'http://localhost:8081/patient/changePassword/';
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          "Auth-Token": this.context.token
        },
        body: pass1
      };
  
      fetch(url, options)
      .then(response => {
        console.log(response);
        alert("Успешно промењена лозинка.");

        this.setState({
          modalPassword: false
        })
      });
  }

  changePassword = () => {
    this.setState({
      modalPassword: true
    });
  }

  closeModalHandler = () => {
    this.setState({
        modalIzmena: false
    });
    this.setState({
      modalPassword: false
    }); 
  }

  render() {
      let modalniIzmena = null;
      let modalniSifra = null;
      if(this.state.modalIzmena){
        modalniIzmena = (
          <Window
          visible={this.state.modalIzmena}
          width="370"
          height="250"
          effect="fadeInUp"
          onClickAway={() => this.closeModalHandler()}
       >
         
          <form className="divModalSale">
            <h4 className="h4Tittle">{this.state.headerText}</h4>
            <div ><p>Стара вредност:</p>
            <input type="text"
              className="inputIzmena"
              value={this.state.staraVrednost}
              disabled></input>
            <p>Нова вредност:</p>
            <input type="text"
              className="inputIzmena"
              id="newValue_input"></input>
            <button className="btnModalIzmena" onClick={this.sendChangeHandler}>Сачувај</button>
            </div>
          </form>
        </Window>);
      }

      if(this.state.modalPassword){
        modalniSifra = (
          <Window
          visible={this.state.modalPassword}
          width="370"
          height="250"
          effect="fadeInUp"
          onClickAway={() => this.closeModalHandler()}
       >
          <form className="divModalSale">
          <h4 className="h4Tittle">Измена лозинке</h4>
          <div ><p>Унесите нову вредност лозинке:</p>
          <input type="password"
            className="inputIzmena"
            id="firstPassword_input1"
            ></input>
          <p>Потврдите нову вредност лозинке:</p>
          <input type="password"
            className="inputIzmena"
            id="firstPassword_input2"></input>
          <button className="btnModalIzmena" onClick={this.sendChangedPassword}>Сачувај</button>
          </div>
        </form>
        </Window> );
      }


      return (
        <div className="main_div">
          <ul id="unordered_list" className="ul_list">
            <li className="li_list"><a 
            id="profile" 
            onClick={this.clickProfile}> Профил корисника </a></li>
            <li className="li_list"><a 
            id="prescription"
            onClick={this.clickPrescription}> Овери рецепт </a></li>
            <li className="li_list"><a 
            id="patients" 
            onClick={this.clickPatients}> Листа пацијената </a></li>
            <li className="li_list"><a 
            id="calendar"
            onClick={this.clickCalendar}> Радни календар </a></li>
            <li className="li_list"><a 
            id="vacation"
            onClick={this.clickVacation}> Годишњи одмор </a></li>
            <li className="li_list"><a 
              id="logout_d"
              onClick={this.clickLogout}> Одјави се </a></li>
          </ul>
          
          <ProfileNurse
            pat={this.state.nurse}
            show = {this.state.isProfile}
            clickIzmena={this.clickIzmena}
            clickZabrana={this.clickZabrana}
            clickSifra={this.changePassword}
            > 
          </ProfileNurse>

          {modalniIzmena} 
          {modalniSifra}    
        </div>
      );
    }
}
export default PageNurse;