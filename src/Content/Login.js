import React, { Component } from "react";
import "./Login.css" 
import "./Content.css" 

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <form>
          <p>Korisničko ime:</p>
          <input type="text"></input>
          <p>Lozinka:</p>
          <input type="password"></input>
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