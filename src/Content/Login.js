import React, { Component } from "react";
import "./Login.css" 
import "./Content.css" 

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
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
      "password" : this.state.password,
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
      .then(response => {
        console.log(response.status+" "+response.ok);
        if(response.ok === true) {
          document.forms['patientLogForm'].reset();
          alert("Uspesno ste se prijavili.");
        }
        else {
          alert("Lozinka ili e-mail adresa nisu validni.");
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