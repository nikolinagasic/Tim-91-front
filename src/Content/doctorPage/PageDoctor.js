import React, { Component } from 'react';
import "./PageDoctor.css" 
import ProfileDoctor from './ProfileDoctor'
import PatientList from './PatientList'
import Window from 'react-awesome-modal'
import {UserContext} from '../../UserProvider'
import Navigation from './Navigation'
import Schedule from '../Schedule';
import VacationPage from './VacationPage';


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
        prikaziKalendar: false,
        listaKalendar: [],
  
        allPatients: null,
        listPatients: null,
        listScheduleTerms: null,
        modalIzmena: false,
        headerText: '',
        staraVrednost: '',
        changedValue: '',
        modalPassword: false,
        patient: null
      };
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
        prikaziKalendar: false
      });
    }
  
    clickPatients = (event) => {
      document.getElementById("logo_img").style.visibility = "hidden"; 
              const url = 'http://localhost:8081/patient/getPatientsSorted';
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
                  isNavigation: false,
                  prikaziKalendar: false
                }); 
              });
    }
  
    clickCalendar = (event) => {
         let doctorId = this.state.doctor.id;
         const url = 'http://localhost:8081/doctor/getTermShedule/' + doctorId;
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
               console.log(response);
               this.setState({
                  listScheduleTerms: response,
                  isProfile: false,
                  isAppointment: false,
                  isPatients: false,
                  isCalendar: true,
                  isVacation: false,
                  isNavigation: false
             }); 
               this.parseTerm();
            });
    }

    iseciNule = (broj) => {
      if(broj === "01"){
          return "1";
      }
      if(broj === "01"){
        return "2";
    }
    if(broj === "03"){
      return "3";
  }
  if(broj === "04"){
    return "4";
}
if(broj === "05"){
  return "5";
}
if(broj === "06"){
  return "6";
}
if(broj === "07"){
  return "7";
}
if(broj === "08"){
  return "8";
}
if(broj === "09"){
  return "9";
} else {
  return broj;
}
    }

    parseTerm = () =>{
       let forChangeList = this.state.listScheduleTerms;
       let changedList = []; //sredjena lista termina za kalendar
       for (var i = 0; i < forChangeList.length; i++){
          var d = new Date(forChangeList[i].date);
          var d1= d.toLocaleDateString();
          var res = d1.split("/");  //1,8,2020
          res[0] = this.iseciNule(res[0]);
          res[1] = this.iseciNule(res[1]);
          var id = forChangeList[i].id; //id dogadjaja
          var subject = forChangeList[i].naziv_pregleda;
          var datum = res[2]+","+res[1]+ "," + res[0]+",";
          var startTime = datum+forChangeList[i].startTime;
          var endTime = datum+forChangeList[i].endTime;
          var patient_mail = forChangeList[i].patient_mail;
          var tempObject={
            id : id,
            subject : subject,
            startTime : startTime,
            endTime : endTime,
            patient_mail : patient_mail
          }
          changedList.push(tempObject);
       }
       console.log(changedList);
       this.setState({
         listaKalendar: changedList,
         prikaziKalendar: true,
       });
    }


  
    clickVacation = (event) => {
      document.getElementById("logo_img").style.visibility = "hidden";
      this.setState({
        isProfile: false,
        isAppointment: false,
        isPatients: false,
        isCalendar: false,
        isVacation: true,
        isNavigation: false,
        prikaziKalendar: false
      });
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
              prikaziKalendar: false,
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
      let city = document.getElementById("city_patient").value;
      if (!firstName) {
        firstName = "~";
      }
      if (!lastName) {
        lastName = "~";
      }
      if (!lbo) {
        lbo = "~";
      }
      if (!city) {
        city = "~";
      }
      console.log(firstName+lastName+lbo+city);
      if (!/^\d+$/.test(lbo) && lbo != "~") {
        alert("ЛБО се састоји искључиво из цифара.");
      }
      else {
        const url = 'http://localhost:8081/patient/find/'+firstName+'/' + lastName + '/'+ lbo + '/'+city;
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
    getSortirane = (listPatients) => (event) => {
      const url = 'http://localhost:8081/patient/getSortByLastName';
          const options = {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json;charset=UTF-8',
              },
              body: JSON.stringify(listPatients)
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
    generateTableData(listPatients){
      let res=[];
      let tableData = listPatients;
      for(var i =0; i < tableData.length; i++){
          res.push(
            <tr>
          <td >{tableData[i].firstName}</td>
          <td >{tableData[i].lastName}</td>
          <td >{tableData[i].lbo}</td>
          <td > <button className="btn_pageAdmin_n" 
            onClick={this.clickProfilePatient(tableData[i].mail)}>Профил</button></td>
          
          </tr>
          )
      }
      return res;
    } 


    sendVacation = (event) => {
      let odkad = document.getElementById("datefield").value;
      let dokad = document.getElementById("datefield1").value;
      if (!odkad || !dokad) {
        alert("Одабери датуме.");
      } else if (dokad<odkad) {
        alert("Датум почетка одмора мора да буде пре датума краја одмора.");
      } else {
        odkad = new Date(odkad);
        odkad = odkad.getTime();
        dokad = new Date(dokad);
        dokad = dokad.getTime();
        const url = 'http://localhost:8081/doctor/reserveVacation/'+this.state.doctor.id;
        const obj = {
          "pocetak" : odkad,
          "kraj" : dokad
        }
        const options = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(obj)
          };
          fetch(url, options) 
          .then(response => {
              if (response.ok) {
                alert("Захтев успешно послат.");
              } 
          });
      }
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
          console.log(this.state.listPatients);
           patients = (
               <PatientList
                  findPatient={this.findPatient}

                  getSortirane={this.getSortirane(this.state.listPatients)}
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
          history =  {this.props.history}     
          >
        </Navigation>
        );
    }

    let kalendar = null;
        if(this.state.prikaziKalendar){
          kalendar = (<div className="scheduleInDoctor">
             <Schedule
                listTerm = {this.state.listaKalendar}
                idDoctor = {this.state.doctor.id}
                history =  {this.props.history}
             >
             </Schedule>
             </div>
          );
    }


    let vacation = null;
        if(this.state.isVacation){
           vacation = (
               <VacationPage
                 sendVacation = {this.sendVacation}>
                </VacationPage>
           )
        }


        return (
          <div className="main_div">
            <ul id="unordered_list" className="ul_list">
              <li className="li_list"><a 
              id="profile" 
              onClick={this.clickProfile}> Профил корисника </a></li>
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
            {kalendar}
            {vacation}
          </div>
        );
      }
  }
    
    export default PageDoctor;