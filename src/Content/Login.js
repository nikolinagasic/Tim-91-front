import React, { Component } from "react"
import "./Login.css" 
import "./Content.css" 
import Modal from "./Modal" 

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isShowing: false
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
          //console.log("data: "+data);
          document.forms['patientLogForm'].reset();
          this.preuzmi_korisnika(data);
        }
        else {
          alert("Lozinka ili e-mail adresa nisu validni.");
        }
      }).catch((error) => {
        console.log(error);
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
          console.log(response)
          if(response !== null){
            console.log(response.role);
            alert('Добродошли ' + response.firstName + " " + response.lastName + ".");
            
            // hocu da sakrijem onaj krst sa desne strane kad se ulogujem
            document.getElementById("logo_img").style.visibility = "hidden"; 
            if(response.role === "patient"){
              this.props.history.push({
                pathname: '/pagepatient',
                state: { detail: response }
              })
            }
            else if(response.role === "doctor"){
              this.props.history.push({
                pathname: '/putanja_do_pocetne_doctora',
                state: { detail: response }
              })
            }
            else if(response.role === "nurse"){
              this.props.history.push({
                pathname: '/putanja_do_pocetne_nurse',
                state: { detail: response }
              })
            }
            else if(response.role === "ccadmin"){
              this.props.history.push({
                pathname: '/putanja_do_pocetne_ccadmina',
                state: { detail: response }
              })
            }
            else if(response.role === "cadmin"){
              this.props.history.push({
                pathname: '/putanja_do_pocetne_cadmina',
                state: { detail: response }
              })
            }
            else{
              console.log('Greska [role]');  
            }
          }
          else {
            console.log('Nesto nije u redu');
            this.setState({korisnik: null});
          }
        });
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
    console.log('usao u send');
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

  render() {
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
            send={this.sendModalHandler}>
                <form>
                  <p>*Адреса Е-поште:</p>
                  <input type="email" className="zab_lozinka" id="zab_mail"></input>
                  <p>Име:</p>
                  <input type="text" className="zab_lozinka" id="zab_ime"></input>
                  <p>Презиме:</p>
                  <input type="text" className="zab_lozinka" id="zab_prezime"></input>
                </form>
                <p id="pZab_greska"></p>
        </Modal>
      </div>
    );
  }
}
 
export default Login;