import React, { Component } from 'react';
import "./PageDoctor.css" 
import ProfileDoctor from './ProfileDoctor'
import PatientList from './PatientList'
import Window from 'react-awesome-modal'
import {UserContext} from '../../UserProvider'
import Navigation from './Navigation'


class PageDoctor extends Component {
  static contextType = UserContext;     // instanciram context

  constructor(props) {
      super(props);
      this.state = {
        doctor: this.props.location.state.detail, 
        isProfile: false,
        isAppointment: false,
        isPatients: false,
        isCalendar: false,
        isVacation: false,
        isNavigation: false,
  
        allPatients: null,
        listPatients: null,
        modalIzmena: false,
        headerText: '',
        staraVrednost: '',
        changedValue: '',
        modalPassword: false,
        patient: null
      };
    }
  
    clickAppointment = (event) => {
      alert("Страница је у процесу израде");
    }
  
    clickProfile = (event) => {
      console.log('kliknuo na profil');
      document.getElementById("logo_img").style.visibility = "hidden"; 
      this.setState({
        isAppointment: false,
        isProfile: true,
        isPatients: false,
        isCalendar: false,
        isVacation: false,
        isNavigation: false,
      });
    }
  
    clickPatients = (event) => {
      document.getElementById("logo_img").style.visibility = "hidden"; 
              const url = 'http://localhost:8081/patient/getAll';
              const options = {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json;charset=UTF-8',
                },
              };
        
              fetch(url, options)
              .then(responseWrapped => responseWrapped.json())
              .then(response => {
                console.log(response);
                this.setState({
                  listPatients:response,
                  allPatients: response,
                  isProfile: false,
                  isAppointment: false,
                  isPatients: true,
                  isCalendar: false,
                  isVacation: false,
                  isNavigation: false
                }); 
              });
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
      else if (polje === 'tip') {
        alert('Није могуће мењати вредност типа прегледа.');  
      }  
      else if (polje === 'ocena') {
        alert('Није могуће мењати оцену.');  
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
        this.setState({staraVrednost: this.state.doctor.firstName});
      }
      else if(naziv === 'prezime'){
        this.setState({headerText: "Измена презимена"});
        this.setState({staraVrednost: this.state.doctor.lastName});
      }
      else{
        console.log('greska izmena');
      }
   }
   clickProfilePatient = (mail) => (event) => {
    event.preventDefault;
    document.getElementById("logo_img").style.visibility = "hidden";
    console.log("mail:"+mail);       
    const url = 'http://localhost:8081/patient/getByMail/'+mail;
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
            this.setState({
              patient: response,
              isProfile: false,
              isAppointment: false,
              isPatients: false,
              isCalendar: false,
              isVacation: false,
              isNavigation: true
          }); 
        });
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
    let email = this.state.doctor.mail;
    const url = 'http://localhost:8081/doctor/changeAttribute/'+changedName+"/"+newValue+"/"+email;
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
    
    const doctor = {       
      ...this.state.doctor
    };
    
    if(nazivAtributa === 'ime'){
      doctor.firstName = novaVrednost;
    }
    else if(nazivAtributa === 'prezime'){
      doctor.lastName = novaVrednost;
    }
  
    this.setState({doctor : doctor});
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
          modalIzmena: false,
          modalPassword: false
      }); 
    }
    findPatient = (event)=> {
      let firstName = document.getElementById("name_patient").value;
      let lastName = document.getElementById("lastName_patient").value;
      let lbo = document.getElementById("lbo_patient").value;
      if (!firstName) {
        firstName = "~";
      }
      if (!lastName) {
        lastName = "~";
      }
      if (!lbo) {
        lbo = "~";
      }
      console.log(firstName+lastName+lbo);
      if (!/^\d+$/.test(lbo) && lbo != "~") {
        alert("ЛБО се састоји само из цифара.");
      }
      else {
        const url = 'http://localhost:8081/patient/find/'+firstName+'/' + lastName + '/'+ lbo;
          const options = {
              method: 'GET',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json;charset=UTF-8',
              },
          };
  
          fetch(url, options)
          .then(responseWrapped => responseWrapped.json())
          .then(response => {
              this.setState({
                  listPatients: response,
                  isPatients: true
              });
          });
      }
    }
    generateTableData(listPatients){
      let res=[];
      let tableData = listPatients;
      for(var i =0; i < tableData.length; i++){
          res.push(
            <tr>
          <td key={tableData[i].firstName}>{tableData[i].firstName}</td>
          <td key= {tableData[i].lastName}>{tableData[i].lastName}</td>
          <td key={tableData[i].lbo}>{tableData[i].lbo}</td>
          <td > <button className="btn_pageAdmin_n" 
            onClick={this.clickProfilePatient(tableData[i].mail)}>Профил</button></td>
          
          </tr>
          )
      }
      return res;
    } 
    
    render() {
        let modalniIzmena = null;
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
        let modalniSifra = null;
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
            </Window>
          );
        }
        let patients = null;
        if(this.state.isPatients){
           patients = (
               <PatientList
                  findPatient={this.findPatient}
            generateTableData = {this.generateTableData(this.state.listPatients)}
                >
                </PatientList>
           )
        }
        
    let navigation = null;
        if (this.state.isNavigation) {
        navigation = (
          <Navigation
          patient={this.state.patient}
          doctor={this.state.doctor}
          clickProfilePatient = {this.clickProfilePatient}
          token = {this.context.token}       
          >
        </Navigation>
        );
    }
        return (
          <div className="main_div">
            <ul id="unordered_list" className="ul_list">
              <li className="li_list"><a 
              id="profile" 
              onClick={this.clickProfile}> Профил корисника </a></li>
              <li className="li_list"><a 
              id="appointment"
              onClick={this.clickАppointment}> Започни преглед </a></li>
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
            
            <ProfileDoctor
              pat={this.state.doctor}
              show = {this.state.isProfile}
              clickIzmena={this.clickIzmena}
              clickZabrana={this.clickZabrana}
              clickSifra={this.changePassword}
              > 
            </ProfileDoctor>
            
            {modalniIzmena} 
            {modalniSifra}    
            {patients}
            {navigation}
          </div>
        );
      }
  }
    
    export default PageDoctor;