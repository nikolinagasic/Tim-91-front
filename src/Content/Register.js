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
        err = <strong>Број година не сме бити негативна вредност.</strong>;
      }
    }
    if (nam === "lbo") {
      if (!Number(val)) {
        err = <strong>ЛБО се састоји искључиво од цифара.</strong>;
      }
    }
    if (nam === "telephone") {
      if (!Number(val)) {
        err = <strong>Телефон се састоји искључиво од цифара.</strong>;
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
      err = <strong>Лозинка мора садржати минимално 7 карактера.</strong>;
      this.setState({errormessage:err});
    }
    else if(pass !== pass2){
      err = <strong>Погрешно сте поново унели лозинку.</strong>;
      this.setState({errormessage:err});
    }
    else if(getlength(lbo) !== 11){
      err = <strong>ЛБО мора да садржи тачно 11 цифара.</strong>;
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
      
      const url = 'http://localhost:8081/patient/register';
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
          if(response.ok === true){
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
          <p>Име:</p>
          <input type='text'
              name='firstName'
              onChange={this.myChangeHandler}
              required></input>
          
          <p>Презиме:</p>
          <input type='text'
              name='lastName'
              onChange={this.myChangeHandler}
              required></input>
          
          <p>Адреса:</p>
          <input type='text'
              name='address'
              onChange={this.myChangeHandler}></input>
          
          <p>Град:</p>
          <input type='text'
              name='city'
              onChange={this.myChangeHandler}
              required></input>
          
          <p>Држава:</p>
          <input type='text'
              name='country'
              onChange={this.myChangeHandler}></input>

          <p>Јединствени број осигураника (ЛБО):</p>
          <input id="id_lboReg" type='text'
              name='lbo'
              onChange={this.myChangeHandler}
              required></input>
        </td>
        <td>          
          <p>Адреса е-поште:</p>
          <input id="id_mejlReg" type='email'
              name='email'
              onChange={this.myChangeHandler}
              required></input>
          
          <p>Лозинка:</p>
          <input type='password'
              name='password'
              onChange={this.myChangeHandler}
              required></input>
          
          <p>Лозинка:</p>      
          <input type='password'
              name='password2'
              onChange={this.myChangeHandler}
              required></input>
          
          <p>Контакт телефон:</p>
          <input type='text'
              name='telephone'
              onChange={this.myChangeHandler}></input>
          
          <p></p>
          {this.state.errormessage}
          <p></p>
          <input type="submit" id="id_submit" value="Региструј се"></input>
        </td>
        </tr>
        </table>
        </form>
      </div>
    );
  }
}
 
export default Register;