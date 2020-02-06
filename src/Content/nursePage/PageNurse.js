import React, { Component } from 'react';
import "./PageNurse.css" 
import ProfileNurse from './ProfileNurse'
import Window from 'react-awesome-modal'
import {UserContext} from '../../UserProvider'
import Prescription from './Prescription'
import PatientSorted from './PatientSorted'
import VacationPage from '../doctorPage/VacationPage'
import NurseSchedule from './NurseSchedule'


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

      list_cures : null,     //lista lekova koji se overavaju
      list_patients : null,  
      list_vacations : null, 
      listKalendar : null,    //lista godisnjih sestre koju prikazujem na kalendaru
      modalIzmena: false,
      headerText: '',
      staraVrednost: '',
      changedValue: '',
      modalPassword: false
    };
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
      let ime = this.state.nurse.firstName;
      this.setState({staraVrednost: ime});
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


  clickPrescription = (event) => {
     console.log("Kliknuto na overu recepta");
     document.getElementById("logo_img").style.visibility = "hidden"; 
     const url = 'http://localhost:8081/medicalrecipe/getRecipes';
     console.log(url);
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
         if (response.length > 0) {
           this.setState({
             list_cures: response
           });
         }
         this.setState({
          list_cures: response,
          isPrescription: true,
          isProfile: false,
          isPatients: false,
          isCalendar: false,
          isVacation: false
        });
       });
  }


   clickOsveziStranicu = () =>{
       this.setState({
         isPrescription : false
       });
       this.clickPrescription();
   }

   clickPatients = (event) => {
       console.log("klik na listu pacijenata");
       document.getElementById("logo_img").style.visibility = "hidden"; 
       const url = 'http://localhost:8081/patient/getPatientsSorted';
       console.log(url);
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
           if (response.length > 0) {
             this.setState({
               list_patients: response
             });
           }
           this.setState({
            isPrescription: false,
            isProfile: false,
            isPatients: true,
            isCalendar: false,
            isVacation: false
          });
         });

   }

   clickVacation = (event) =>{
        console.log("klik na godisnji odmor");
        document.getElementById("logo_img").style.visibility = "hidden"; 
        this.setState({
          isPrescription: false,
          isProfile: false,
          isPatients: false,
          isCalendar: false,
          isVacation: true
        });
   }

   sendVacation = (event) =>{
    let odkad = document.getElementById("datefield").value;
    let dokad = document.getElementById("datefield1").value;
    if (!odkad || !dokad) {
      alert("Одабери датуме.");
    } else if (dokad<odkad) {
      alert("Датум почетка одмора мора да буде пре датума краја одмора.");
    } else {
      var odkad1 = new Date(odkad);
      var odkad2 = odkad1.getTime();
      var dokad1 = new Date(dokad);
      var dokad2 = dokad1.getTime();
      const url = 'http://localhost:8081/nurse/reserveVacationNurse/'+this.state.nurse.id;
      const obj = {
        "pocetak" : odkad2,
        "kraj" : dokad2
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


   //na klik kalendara prezimam dogadjaje sa beka
   clickCalendar = (event) => {
      console.log("klik na kalendar");
      document.getElementById("logo_img").style.visibility = "hidden"; 
      const url = 'http://localhost:8081/nurse/getScheduleVacation/' + this.state.nurse.id;
      console.log(url);
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
          if (response.length > 0) {
            this.setState({
              list_vacations: response
            });
          }
          this.parseTerm();
        });

   }

   //pripremim dogadjaje za prikaz na kalendaru
   parseTerm = () => {
    let forChangeList = this.state.list_vacations;
    let changedList = []; //sredjena lista termina za kalendar
    for (var i = 0; i < forChangeList.length; i++){
       var d = new Date(forChangeList[i].pocetak);
       var d1= d.toLocaleDateString();
       var res = d1.split("/"); 
       var dat = new Date(forChangeList[i].kraj);
       var d2 = dat.toLocaleDateString();
       var res2 = d2.split("/");
       var id = forChangeList[i].id; //id dogadjaja
       var datum = res[2]+","+res[1]+ "," + res[0]+",";
       var datum2 = res2[2]+","+res2[1]+ "," + res2[0]+","; 
       var startTime = datum+ "0,0";
       var endTime = datum2+"0,0";;
       var tempObject={
         id : id,
         subject : "годишњи",
         startTime : startTime,
         endTime : endTime,
       }
       changedList.push(tempObject);
    }
    console.log(changedList);
    this.setState({
      listKalendar: changedList,
      isPrescription: false,
      isProfile: false,
      isPatients: false,
      isCalendar: true,
      isVacation: false
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

      let listaZaOveru = null;
      if(this.state.isPrescription){
         listaZaOveru = (
           <Prescription
               show = {this.state.isPrescription}
               list_cures = {this.state.list_cures}
               id_nurse = {this.state.nurse.id}
               osveziStranicu = {this.clickOsveziStranicu}
           >
           </Prescription>
         );
      }

      let sortiraniPacijenti = null;
      if(this.state.isPatients){
        sortiraniPacijenti = (
          <PatientSorted
              show = {this.state.isPatients}
              list_patients = {this.state.list_patients}
          >
          </PatientSorted>
        );
      }

      let vacation = null;
      if(this.state.isVacation){
         vacation = (
             <VacationPage
               sendVacation = {this.sendVacation}>
              </VacationPage>
         );
      }


      let kalendar = null;
      if(this.state.isCalendar){
        kalendar = (
           <NurseSchedule
              listKalendar= {this.state.listKalendar}
           >
           </NurseSchedule>
        );
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
          {listaZaOveru}
          {sortiraniPacijenti}
          {vacation}
          {kalendar}
        </div>
      );
    }
}
export default PageNurse;