import React, { Component } from "react";
import "./RegisterAdmin.css"


class RegisterAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      clinic: '',
      
      errormessage: ''
    };
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    let err = '';
    if (document.getElementById("clinic").checked == true) {
      document.getElementById("id_clinic").disabled = false;
    } else {
      document.getElementById("id_clinic").disabled = true;
    }
    
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
    else if(!(document.getElementById("clinic").checked || document.getElementById("cliniccentre").checked)){
        err = <strong>Морате изабрати тип администратора за регистрацију.</strong>;
        this.setState({errormessage:err});
      }
    else if (document.getElementById("clinic").checked && document.getElementById("id_clinic").value.length == 0) {
        err = <strong>Морате изабрати клинику за администратора клинике.</strong>;
        this.setState({errormessage:err});
    }
    else{
      this.setState({errormessage:''});
      console.log('sve ok, salji objekat');
      
      let obj;      
      var url;

      if ( document.getElementById("clinic").checked === true) {
        url = 'http://localhost:8081/ccadmin/register_admin';
          obj = { 
            "mail" : this.state.email,
            "password" : "12345678",
            "clinic" : this.state.clinic
          }
      }
      else {
        url = 'http://localhost:8081/ccadmin/register_ccadmin';
        obj = { 
          "mail" : this.state.email,
          "password" : "12345678",
        }
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
          if(response.ok === true){
            document.forms['adminRegForm'].reset();
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
    <div className="RegisterAdmin">
      <form name="adminRegForm" onSubmit={this.mySubmitHandler}>
        <table>
          <tr>
        <td>          
          <p>Адреса е-поште:</p>
          <input id="id_mejlReg" type='email'
              name='email'
              onChange={this.myChangeHandler}
              required></input>
          
          <p id="pp">Лозинка:</p>
          <input 
              name='password'
              value='12345678'
              disabled='true'></input>
          <p></p>

          <input id="clinic" type="radio" name="container"
          onChange={this.myChangeHandler}></input>
          <label id="text">Администратор клинике</label>
          <p></p>
          <input id="cliniccentre" type="radio" name="container"
          onChange={this.myChangeHandler}></input>
          <label id="text">Администратор клиничког центра</label>
          <p id="pp">Клиника:</p>
          <input 
            id = 'id_clinic'
            name='clinic'
            disabled = 'true'
            onChange={this.myChangeHandler}></input>
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
 
export default RegisterAdmin;
