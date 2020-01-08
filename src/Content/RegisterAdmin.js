import React, { Component } from "react";
import "./RegisterAdmin.css"
import SelectBox from './SelectBox.js'


class RegisterAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      clinic: '',
      list_clinic: [],
      list_box: [],
      display:false,
      
      errormessage: ''
    };
    this.getClinic();
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    let err = '';
    //ukoliko je chekiran admin klinike prikazuje se listbox, u suprotnom ne
    //da li prikazujemo listbox zavisi od stanja display
    if (document.getElementById("clinic").checked == true) {
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
    let nameClinic = document.getElementById("hidden_id").value;
   // console.log("IME"+nameClinic);
    this.setState({
      clinic: nameClinic
    });
    

    if (pass.length < 7) {
      err = <strong>Лозинка мора садржати минимално 7 карактера.</strong>;
      this.setState({errormessage:err});
    }
    else if(!(document.getElementById("clinic").checked || document.getElementById("cliniccentre").checked)){
        err = <strong>Морате изабрати тип администратора за регистрацију.</strong>;
        this.setState({errormessage:err});
      }
  /*  else if (document.getElementById("clinic").checked && document.getElementById("clinic_id").value.length == 0) {
        err = <strong>Морате изабрати клинику за администратора клинике.</strong>;
        this.setState({errormessage:err});
    }*/
    else{
      this.setState({errormessage:''});
      console.log('sve ok, salji objekat');
     // console.log(this.state.email);
     // console.log(nameClinic);
      
      let obj;      
      var url;

      if ( document.getElementById("clinic").checked === true) {
        url = 'http://localhost:8081/ccadmin/register_admin';
          obj = { 
            "mail" : this.state.email,
            "password" : "12345678",
            "clinic" : nameClinic
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

  nameClinic =(cname) => {
     this.setState(
       {clinic:cname}
     );
  }


  getClinic = () => {
    const url = 'http://localhost:8081/clinic/getAll';
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
         console.log("RESPONSE");
         console.log(response);
        if(response!=null){
          this.setState({
            list_clinic: response   
          });
        }

      

      let res = [];
      let listData = this.state.list_clinic; //listu iz state preuzmi
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
              name = "hidden_id"
              items={this.state.list_box}>
          </SelectBox>
       );
    }
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
          <div
            id = 'id_clinic'
            name='clinic'
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
 
export default RegisterAdmin;
