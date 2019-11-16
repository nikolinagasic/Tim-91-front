import React, { Component } from "react";
import "./Login.css" 

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <form>
          <p>Korisničko ime:</p>
          <input type="text"></input>
          <p>Lozinka:</p>
          <input type="password"></input>
        </form>
        <br/>
        <button>Prijavi se</button>
        <p>Zaboravljena lozinka</p>
      </div>
    );
  }
}
 
export default Login;