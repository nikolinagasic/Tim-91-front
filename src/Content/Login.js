import React, { Component } from "react";
import "./Login.css" 
import "./Content.css" 

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      
      errormessage: ''
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
    this.setState({errormessage:''});
    console.log('sve ok, salji objekat');
    
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
      .then(response => {
        console.log(response.status);
        console.log(response)
        if(response.ok){
          document.forms['patientLogForm'].reset();
          alert("Uspesno ste se ulogovali!");
        }
        else {
          alert("Email adresa ili lozinka nisu validni");
        }
      });
  }

  render() {
    return (
      <div className="Login">
        <form id="patientLogForm" onSubmit={this.mySubmitHandler}>
          <p>Email adresa:</p>
          <input type='email'
              name='email'
              onChange={this.myChangeHandler}
              required></input>
          <p>Lozinka:</p>
          <input type='password'
              name='password'
              onChange={this.myChangeHandler}
              required></input>
          <br/>
          <p></p>
          <input type="submit" value="Prijavi se"></input>
        </form>
        
        <a href="www.google.com" id="zaboravljena_lozinka">Zaboravljena lozinka</a>
      </div>
    );
  }
}
 
export default Login;