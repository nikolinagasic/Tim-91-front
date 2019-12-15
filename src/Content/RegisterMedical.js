import React, { Component } from "react";
import "./RegisterMedical.css"


class RegisterMedical extends Component {
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
    let err = '';
    
    this.setState({errormessage: err});
    this.setState({[nam]: val});
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    let pass = "12345678";
    let err = '';

    if (pass.length < 7) {
      err = <strong>Лозинка мора садржати минимално 7 карактера.</strong>;
      this.setState({errormessage:err});
    }
    else if(!(document.getElementById("doctor").checked || document.getElementById("nurse").checked)){
        err = <strong>Морате изабрати тип медицинског особља за регистрацију.</strong>;
        this.setState({errormessage:err});
      }
    else{
      this.setState({errormessage:''});
      console.log('sve ok, salji objekat');
      
      let obj = {
        "mail" : this.state.email,
        "password" : "12345678",
      }
      
      var url;

      if ( document.getElementById("doctor").checked === true) {
        url = 'http://localhost:8081/clinicAdministrator/registerDoctor';
      }
      else {
        url = 'http://localhost:8081/clinicAdministrator/registerNurse';
      }
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
          if(response.ok){
            document.forms['medicalRegForm'].reset();
            alert("Registracija uspešna!");
          }
          else{
            alert("Mejl adresa mora biti jedinstvena na nivou sistema.");
          }
        });
     }
  }

  render() {
    return (
    <div className="RegisterMedical" id="med">
      <form name="medicalRegForm" onSubmit={this.mySubmitHandler}>
        <table>
          <tr>
        <td>          
          <p>Адреса е-поште:</p>
          <input id="id_mejlReg" type='email'
              name='email'
              onChange={this.myChangeHandler}
              required></input>
          
          <p>Лозинка:</p>
          <input
              name='password'
              value='12345678'
              disabled='true'></input>
          <p></p>

          <input id="doctor" type="radio" name="container"
          onChange={this.myChangeHandler}></input>
          <label id="text">Доктор</label>
          <p></p>
          <input id="nurse" type="radio" name="container"
          onChange={this.myChangeHandler}></input>
          <label id="text">Медицинска сестра</label>
          
          <p></p>
          {this.state.errormessage}
          <p></p>
          <input type="submit" id="id_submit" value="Региструј"></input>
        </td>
        </tr>
        </table>
        </form>
      </div>
    );
  }
}
 
export default RegisterMedical;