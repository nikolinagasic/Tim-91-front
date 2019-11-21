import React, { Component } from "react";
import "./Clinic.css"


class Clinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      address: '',
      adescription: '',
      
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
      
      let obj = {
        "Name" : this.state.Name,
        "address" : this.state.address,
        "adescription" : this.state.adescription,
      }
      
      var url = 'http://localhost:8081/register_clinic'

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
            document.forms['clinicRegForm'].reset();
            alert("Registracija uspešna!");
          }
          else{
            alert("Naziv klinike mora biti jedinstven na nivou sistema.");
          }
        });
     }
  

  render() {
    return (
    <div className="Register">
      <form name="clinicRegForm" onSubmit={this.mySubmitHandler}>
        <table>
          <tr>
        <td>          
          <p>Назив:</p>
          <input id="id_name" type='text'
              name='Name'
              onChange={this.myChangeHandler}
              required></input>
          
          <p>Адреса:</p>
          <input type='text'
              name='address'
              onChange={this.myChangeHandler}
              required></input>

          <p>Опис:</p>
            <textarea
                id="id_desc"
                name='adescription'
                onChange={this.myChangeHandler}
            />

          
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
 
export default Clinic;