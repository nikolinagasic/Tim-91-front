import React, { Component } from "react";
import "./Clinic.css"


class Clinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      description: '',
      
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
        "name" : this.state.name,
        "address" : this.state.address,
        "description" : this.state.description,
      }
      
      var url = 'http://localhost:8081/ccadmin/register_clinic'

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
    <div className="Clinic">
      <form name="clinicRegForm" onSubmit={this.mySubmitHandler}>
        <table>
          <tr>
        <td>          
          <p id="naziv">Назив:</p>
          <input  type='text'
              name='name'
              onChange={this.myChangeHandler}
              required></input>
          <p id="adresa">Адреса:</p>
          <input  type='text'
              name='address'
              onChange={this.myChangeHandler}
              required></input>

          <p id="opis">Опис:</p>
            <textarea
                id="textarea"
                name='description'
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