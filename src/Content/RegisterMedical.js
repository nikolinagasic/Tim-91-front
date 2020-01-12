import React, { Component } from "react";
import "./RegisterMedical.css"
import SelectBox from "./SelectBox.js"


class RegisterMedical extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      tip: '',
      display: false,
      list_box: [],
      list_types: [],
      errormessage: ''
    };
    this.getTypes();
  }

  myChangeHandler = (event) => {
    
    let nam = event.target.name;
    let val = event.target.value;
    let err = '';
    
    if (document.getElementById("doctor").checked == true) {
      this.setState(
        {display:true}
      );   
    } else {
      this.setState(
        {display:false}
      );
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
    else if(!(document.getElementById("doctor").checked || document.getElementById("nurse").checked)){
        err = <strong>Морате изабрати тип медицинског особља за регистрацију.</strong>;
        this.setState({errormessage:err});
      }
    else{
      this.setState({errormessage:''});
      console.log('sve ok, salji objekat');
      
      let obj;
      var url;
      if ( document.getElementById("doctor").checked === true) {
        let name_type = document.getElementById("hidden_id").value;
        url = 'http://localhost:8081/clinicAdministrator/registerDoctor';
        obj = {
          "mail" : this.state.email,
          "password" : "12345678",
          "clinic" : this.props.pat.clinic,
          "tip" : name_type
        }
      }
      else {
        url = 'http://localhost:8081/clinicAdministrator/registerNurse';
        obj = {
          "mail" : this.state.email,
          "password" : "12345678",
          "clinic" : this.props.pat.clinic
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

  getTypes = () => {
    const url = 'http://localhost:8081/type/getAll';
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
    };
    fetch(url, options)
      .then(responseWrapped => responseWrapped.json())
      .then(response => {
        if(response!=null){
          this.setState({
            list_types: response   
          });
        }

      

      let res = [];
      let listData = this.state.list_types; //listu iz state preuzmi
      if (listData != null) {
        for (var i = 0; i < listData.length; i++) {
          var name = listData[i].name;
          var ident = listData[i].id;
           res.push(
             {value:name,id:ident}
           )
        }
      }
      this.setState(
        {list_box:res}
      );
      });
    
  }

  render() {
    let listComponent=null;
    if(this.state.display){
       listComponent=(
          <SelectBox
              name="hidden_id"
              items={this.state.list_box}>
          </SelectBox>
       );
    }
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
          
          <p id="lozinka">Лозинка:</p>
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
          <p>Тип прегледа:</p>
         <div 
            id = 'id_tip'
            name='tip'
            disabled = 'true'
            onChange={this.myChangeHandler}>
            {listComponent}
            </div>
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