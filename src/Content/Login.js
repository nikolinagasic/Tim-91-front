import React, { Component } from "react"
import ReactDOM from 'react-dom'
import "./Login.css" 
import "./Content.css" 
import Modal from "./Modal"
import ModalChangePassword from "./ModalChange/ModalChange"
import {UserContext} from '../UserProvider'

class Login extends Component {
  static contextType = UserContext;     // instanciram context

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      
      isShowing: false,
      modalChangePassword: false
    };
  }

  myChangeHandler = (event) => {
    event.preventDefault();
    let nam = event.target.name;
    let val = event.target.value;
    
    this.setState({[nam]: val});
  }


  mySubmitHandler = (event) => {
    event.preventDefault();

    let obj = {
      "username" : this.state.email,
      "password" : this.state.password
    }
    
    const url = 'http://localhost:8081/auth/login';
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(obj)
    };
    
    fetch(url, options)
    .then(dataWrappedByPromise => dataWrappedByPromise.json())
      .then(data => {
        if(data !== null) {
          document.forms['patientLogForm'].reset();
          this.preuzmi_korisnika(data);
        }
        else {
          alert("Lozinka ili e-mail adresa nisu validni.");
        }
      }).catch((error) => {
        alert("Lozinka ili e-mail adresa nisu validni.");
      })
    }

  // f-ja koja na osnovu tokena vraca koji je korisnik prijavljen
  preuzmi_korisnika = (data) => {
    let token = data.accessToken;

    const url = 'http://localhost:8081/auth/getByToken/'+token;
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
          if(response !== null){
            //////////// update context ////////////////
            this.context.token = token;
            this.context.user = response;
            ///////////////////////////////////////////
            
            let isChangePass = false;
            // ako se prvi put loguje nek promeni sifru
            if(response.firstLogin && response.role !== 'patient'){
              isChangePass = true;
              this.setState({
                modalChangePassword: true
              })
            }
            else{
              alert(' Добродошли! ');
            }
            
            if(!isChangePass){
              // hocu da sakrijem onaj krst sa desne strane kad se ulogujem
              this.pocetnaStrana(response.role, response);
           }
          }
          else {
            console.log('Nesto nije u redu');
            this.setState({korisnik: null});
          }
        });
  }

  // redirekcija na pocetne strane od User-a
  pocetnaStrana = (role, user) => {
    document.getElementById("logo_img").style.visibility = "hidden"; 
    if(role === "patient"){
      this.props.history.push({
        pathname: '/pagepatient'
      });
    }
    else if(role === "doctor"){
      this.props.history.push({
        pathname: '/pagedoctor',
        state: { detail: user }
      })
    }
    else if(role === "nurse"){
      this.props.history.push({
        pathname: '/pagenurse',
        state: { detail: user }
      })
    }
    else if(role === "cadmin"){
      this.props.history.push({
        pathname: '/pageadmin',
        state: { detail: user }
      })
    }
    else if(role === "ccadmin"){
      this.props.history.push({
        pathname: '/pagecadmin',
        state: { detail: user }
      })
    }
    else{
      console.log('Greska [role]');  
    }
  }

  openModalHandler = (event) => {
    this.setState({
        isShowing: true
   });    
  }
  
  closeModalHandler = () => {
    this.setState({
        isShowing: false
    });
  }

  sendModalHandler = () => {
    let mail = document.getElementById("zab_mail").value;
    let ime = document.getElementById("zab_ime").value;
    let prezime = document.getElementById("zab_prezime").value;

    if(ime === "" || prezime === "" || mail === ""){
      document.getElementById("pZab_greska").innerHTML = "Sva polja na formi moraju biti popunjena.";
    }
    else{
      
      // posalji upisane parametre
      const url = 'http://localhost:8081/auth/forgetPassword/'+mail+"/"+ime+"/"+prezime;
      const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    };
    
    fetch(url, options)
      .then(response => {
        if(response.ok) {
          alert("Лозинка је послата на вашу адресу е-поште.");
        }
        else {
          alert("Унети подаци нису валидни.");
        }
      })      

      // izbrisi poruku greske i ukloni modalni dijalog
      document.getElementById("pZab_greska").innerHTML = "";
      this.setState({
        isShowing: false
      });
    }
  }
  
  sendPasswordHandler = () => {
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

    const url = 'http://localhost:8081/patient/changePassword';
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "text/plain",
        "Auth-Token": this.context.token
      },
      body: pass1
    };

    fetch(url, options)
      .then(response => {
        console.log(response);
        this.pocetnaStrana(this.context.user.role, this.context.user);

        this.setState({
          modalChangePassword: false
        })
      });

  }

  render() {
    let changePassword = null;
    if(this.state.modalChangePassword){
      changePassword = (
        <ModalChangePassword
          className="modal"
          show={this.state.modalChangePassword}
          send={this.sendPasswordHandler}
          header="Прва промена лозинке">
          <form>
              <p>Унесите нову вредност лозинке:</p>
              <input type="password" 
              className="input_field"
              id="firstPassword_input1"></input>
              <p>Унесите лозинку поново:</p>
              <input type="password" 
                  className="input_field"
                  id="firstPassword_input2"></input>
          </form>
          </ModalChangePassword>
      );
    }

    return (
      <div className="Login">
        <form id="patientLogForm" onSubmit={this.mySubmitHandler}>
          <p>Адреса е-поште:</p>
          <input type='email'
              name='email'
              onChange={this.myChangeHandler}
              required></input>
          <p>Лозинка:</p>
          <input type='password'
              name='password'
              onChange={this.myChangeHandler}
              required></input>
          <br/>
          <p></p>
          <input type="submit" value="Пријави се"></input>
          <p id="zaboravljena_lozinka" onClick={this.openModalHandler}>Заборављена лозинка</p>
          
        </form>
        
        { this.state.isShowing ? <div onClick={this.closeModalHandler} 
                className="back-drop"></div> : null }
        <Modal
            className="modal"
            show={this.state.isShowing}
            close={this.closeModalHandler}
            send={this.sendModalHandler}
            header="Слање лозинке на адресу е-поште">
                <form>
                  <p>*Адреса Е-поште:</p>
                  <input type="email" className="input_field" id="zab_mail"></input>
                  <p>*Име:</p>
                  <input type="text" className="input_field" id="zab_ime"></input>
                  <p>*Презиме:</p>
                  <input type="text" className="input_field" id="zab_prezime"></input>
                </form>
                <p id="pZab_greska"></p>
        </Modal>

        {changePassword}
      </div>
    );
  }
}
 
export default Login;