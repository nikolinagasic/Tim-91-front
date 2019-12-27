import React, { Component } from 'react';
import "./PageDoctor.css" 
import ProfileDoctor from './ProfileDoctor'
import Modal from "../Modal" 

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
    
          modalShowing: false,
          headerText: '',
          staraVrednost: '',
          changedValue: '',
          modalPassword: false
        };
      }
    
      clickAppointment = (event) => {
        alert("Страница је у процесу израде");
      }
    
      clickProfile = (event) => {
        console.log('kliknuo na profil');
        document.getElementById("logo_img").style.visibility = "hidden"; 
        this.setState({
          isAppointment: false
        });
        this.setState({
          isProfile: true
        });
        this.setState({
          isPatients: false
        });
        this.setState({
            isCalendar: false
          });
        this.setState({
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

      clickZabrana = (polje) => {
        if (polje === 'mail') {
          alert('Није могуће мењати вредност поља е-поште.');  
        }
        else if (polje === 'klinika') {
          alert('Није могуће мењати вредност поља клинике.');  
        }      
      }
    
      clickIzmena = (naziv, staraVr) => {
        this.setState({
            modalShowing: true
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
        else if(naziv === 'oblast'){
          this.setState({headerText: "Измена области"});
          this.setState({staraVrednost: this.state.doctor.field});
        }
        else{
          console.log('greska izmena');
        }
     }
    
     sendModalHandler = (event) => {
       this.setState({
          modalShowing: false
      });
      let newValue = document.getElementById("newValue_input").value;
      let changedName = this.state.changedValue;
      
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
      else if(nazivAtributa === 'oblast'){
        doctor.field = novaVrednost;
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
                      id="newPassword_input"></input>
                  </form>
              </Modal>
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
              </ul>
              
              <ProfileDoctor
                pat={this.state.doctor}
                show = {this.state.isProfile}
                clickIzmena={this.clickIzmena}
                clickZabrana={this.clickZabrana}
                clickSifra={this.changePassword}
                > 
              </ProfileDoctor>
    
              {modalni} 
              {modalniSifra}    
            </div>
          );
        }
    }
    
    export default PageDoctor;