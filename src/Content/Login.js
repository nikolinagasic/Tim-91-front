import React, { Component } from "react";
import "./Login.css" 
import "./Content.css" 

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <form>
          <p>Корисничко име:</p>
          <input type="text"></input>
          <p>Лозинка:</p>
          <input type="password"></input>
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