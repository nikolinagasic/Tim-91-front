import React, { Component } from "react"
import "./Login.css" 
import "./Content.css" 

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      korisnik: null
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
            this.setState({korisnik: response});
            console.log(response.role);
            if(response.role === "patient"){
              this.props.history.push({
                pathname: '/pagepatient',
                state: { detail: response }
              })
            }
            else if(response.role === "doctor"){
              this.props.history.push({
                pathname: '/pagedoctor',
                state: { detail: response }
              })
            }
            else if(response.role === "nurse"){
              this.props.history.push({
                pathname: '/pagenurse',
                state: { detail: response }
              })
            }
            else if(response.role === "cadmin"){
              this.props.history.push({
                pathname: '/pageadmin',
                state: { detail: response }
              })
            }
            else if(response.role === "ccadmin"){
              this.props.history.push({
                pathname: '/pagecadmin',
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
        </form>
        
        <a href="www.google.com" id="zaboravljena_lozinka">Заборављена лозинка</a>
      </div>
    );
  }
}
 
export default Login;