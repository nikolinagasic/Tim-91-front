import React, { Component } from "react";
import "./Register.css"
 
class Register extends Component {
  render() {
    return (
    <div className="Register">
      <form>
        <table>
          <tr>
        <td>
          
          <p>Ime:</p>
          <input type="text"></input>
          <p>Prezime:</p>
          <input type="text"></input>
          <p>Adresa:</p>
          <input type="text"></input>
          <p>Grad:</p>
          <input type="text"></input>
          <p>Jedinstveni broj osiguranika:</p>
          <input type="numbers"></input>
        </td>
        <td>          
          <p>Korisničko ime:</p>
          <input type="text"></input>
          <p>Lozinka:</p>
          <input type="password"></input>
          <p>Lozinka:</p>      
          <input type="password"></input>
          <p>E-mail:</p>
          <input type="text"></input>
          <p></p>
          <input type="submit" id="id_submit" value="Registruj se"></input>
        </td>
        </tr>
        </table>
        </form>
      </div>
    );
  }
}
 
export default Register;