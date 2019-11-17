import React, { Component } from "react";
import "./Register.css"
import "./Content.css" 

function getlength(number) {
  return number.toString().length;
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password2: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      country: '',
      telephone: null,
      lbo: null,
      
      errormessage: ''
    };
  }

  myChangeHandler = (event) => {
    event.preventDefault();
    let nam = event.target.name;
    let val = event.target.value;
    let err = '';
    if (nam === "age") {
      if (val < 0) {
        err = <strong>Broj godina ne sme biti negativna vrednost.</strong>;
      }
    }
    if (nam === "lbo") {
      if (!Number(val)) {
        err = <strong>LBO ne sme sadrzati druge karaktere osim cifara.</strong>;
      }
    }
    if (nam === "telephone") {
      if (!Number(val)) {
        err = <strong>Telefon ne sme sadrzati druge karaktere osim cifara.</strong>;
      }
    }
    
    this.setState({errormessage: err});
    this.setState({[nam]: val});
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    let pass = this.state.password;
    let pass2 = this.state.password2;
    let lbo = this.state.lbo;
    let err = '';

    if (pass.length < 7 || pass2.length < 7) {
      err = <strong>Lozinka mora sadrzati minimalno 7 karaktera.</strong>;
      this.setState({errormessage:err});
    }
    else if(pass !== pass2){
      err = <strong>Pogresno ste uneli ponovljenu lozinku.</strong>;
      this.setState({errormessage:err});
    }
    else if(getlength(lbo) !== 11){
      err = <strong>LBO mora da sadrzi tacno 11 cifara</strong>;
      this.setState({errormessage:err});
    }
    else{
      this.setState({errormessage:''});
      console.log('sve ok, salji objekat');
      
      let obj = {
        "mail" : this.state.email,
        "password" : this.state.password,
        "firstName" : this.state.firstName,
        "lastName" : this.state.lastName,
        "address" : this.state.address,
        "city" : this.state.city,
        "country": this.state.country,
        "telephone" : this.state.telephone,
        "lbo" : this.state.lbo
      }
      
      const url = 'http://localhost:8081/login/patient';
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
          if(response === 0){
            document.forms['patientRegForm'].reset();
            alert("Zahtev uspesno poslat! Putem mejla cete dobiti obavestenje da li je"+
                  +"zahtev odobren ili odbijen.");
          }
          else if(response === -1){
            alert("Proveriti da li je lbo validno unesen.");
          }
          else{
            alert("Mejl adresa mora biti jedinstvena na nivou sistema.");
          }
        });
     }
  }

  render() {
    return (
    <div className="Register">
      <form name="patientRegForm" onSubmit={this.mySubmitHandler}>
        <table>
          <tr>
        <td>
          <p>Ime:</p>
          <input type='text'
              name='firstName'
              onChange={this.myChangeHandler}
              required></input>
          
          <p>Prezime:</p>
          <input type='text'
              name='lastName'
              onChange={this.myChangeHandler}
              required></input>
          
          <p>Adresa:</p>
          <input type='text'
              name='address'
              onChange={this.myChangeHandler}></input>
          
          <p>Grad:</p>
          <input type='text'
              name='city'
              onChange={this.myChangeHandler}
              required></input>
          
          <p>Drzava:</p>
          <input type='text'
              name='country'
              onChange={this.myChangeHandler}></input>

          <p>Jedinstveni broj osiguranika (LBO):</p>
          <input id="id_lboReg" type='text'
              name='lbo'
              onChange={this.myChangeHandler}
              required></input>
        </td>
        <td>          
          <p>Email adresa:</p>
          <input id="id_mejlReg" type='email'
              name='email'
              onChange={this.myChangeHandler}
              required></input>
          
          <p>Lozinka:</p>
          <input type='password'
              name='password'
              onChange={this.myChangeHandler}
              required></input>
          
          <p>Lozinka:</p>      
          <input type='password'
              name='password2'
              onChange={this.myChangeHandler}
              required></input>
          
          <p>Kontekt telefon:</p>
          <input type='text'
              name='telephone'
              onChange={this.myChangeHandler}></input>
          
          <p></p>
          {this.state.errormessage}
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