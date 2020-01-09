import React, { Component } from 'react';
import "./PageDoctor.css" 
import ProfileDoctor from './ProfileDoctor'
import PatientList from './PatientList'
import Modal from "../Modal" 
import Window from 'react-awesome-modal'

class PageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
          doctor: this.props.location.state.detail, 
          isProfile: false,
          isAppointment: false,
          isPatients: false,
          isCalendar: false,
          isVacation: false,
    
          modalIzmena: false,
          headerText: '',
          staraVrednost: '',
          changedValue: '',
          modalPassword: false,
          listPatients: [],
          allPatients: []
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
          isVacation: false
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
                this.setState({
                  allPatients: response,
                  listPatients: response,
                  isAppointment: false,
                  isProfile: false,
                  isPatients: true,
                  isCalendar: false,
                  isVacation: false     

                }); 
            }); 
            console.log(this.state.listPatients);
      }
    
      clickCalendar = (event) => {
        alert("Страница је у процесу израде");
      }
    
      clickVacation = (event) => {
        alert("Страница је у процесу израде");
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
    
     closeModalHandler = () => {
      this.setState({
        modalIzmena: false,
        modalPassword: false
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
        let password = document.getElementById("newPassword_input").value;
        
        if(password.length < 8){
          alert('Лозинка мора садржати барем 8 карактера.');
          return;
        }
        
        const url = 'http://localhost:8081/doctor/changePassword/'+password;
        const options = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
        };
    
        fetch(url, options)
          .then(response => {
            if(response.ok === true){
              alert("Успешно сте изменили лозинку.");
            }
            else {
              alert("Дошло је до грешке приликом измене лозинке");
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
    
      findPatient = (allPatients) => (event) => {
          
        let ime = document.getElementById("name_patient").value;
        let prezime = document.getElementById("lastName_patient").value;
        let lbo = document.getElementById("lbo_patient").value;
        
        if(!ime){
          ime = "~";
        }
        if(!prezime){
          prezime = "~";
      }
        if(!lbo){
            lbo = "~";
        }
        if (!/^\d+$/.test(lbo) && lbo != "~") {
          alert("ЛБО се састоји само из цифара.");
        } else {
        console.log(ime+[prezime+lbo]);
        const url = 'http://localhost:8081/patient/find/'+ime+"/"+prezime+"/"+lbo;
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(allPatients)
        };

        fetch(url, options)
        .then(responseWrapped => responseWrapped.json())
        .then(response => {
            this.setState({
                listPatients: response,
                isRooms: true
            });
        });
        console.log(this.state.listPatients);
      }
      }

      generateTableDatаPatients(listPatients){
        let res=[];
        let tableData = listPatients;
        for(var i =0; i < tableData.length; i++) {
        console.log("ispisuje"+tableData[i].firstName,tableData[i].lastName,tableData[i].lbo);
        }
        for(var i =0; i < tableData.length; i++){
            res.push(
              <tr>
            <td key={tableData[i].firstName}>{tableData[i].firstName}</td>
            <td key= {tableData[i].lastName}>{tableData[i].lastName}</td>
            <td key={tableData[i].lbo}>{tableData[i].lbo}</td>
            </tr>
            )
        }
        console.log(res);
        return res;
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
                      id="newPassword_input"></input>
                  </form>
              </Modal>
            );
          }
          let patients = null;
          if(this.state.isPatients){
             patients = (
                 <PatientList
                    findPatient={this.findPatient(this.state.allPatients)}
                    generateTableDatаPatients= {this.generateTableDatаPatients(this.state.listPatients)}
                  >
                  </PatientList>
             )
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
            </div>
          );
        }
    }
    
    export default PageDoctor;