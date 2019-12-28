import React, { Component } from 'react';
import ProfileAdmin from './ProfileAdmin'
import './PageAdmin.css'
import RegisterMedical from "../RegisterMedical" 
import DoctorList from "./DoctorList" 
import AppointmentType from "./AppointmentType" 
import Modal from '../Modal'

class PageAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
          cadmin: this.props.location.state.detail, 
          isProfile: false,
          isRegister: false,
          isAppointmentTypes: false,
          isRooms: false,
          isListDoctors: false,
    
          modalIzmena: false,
          headerText: '',
          staraVrednost: '',
          changedValue: '',
          modalPassword: false,
          listDoctors: null,
          listTypes: null,
        };
      }
    
      clickZabrana = (polje) => {
        console.log(polje);
        if(polje === 'mail'){
          alert('Није могуће мењати вредност поља е-поште.');
        }
        else if(polje === 'klinika'){
          alert('Није могуће мењати вредност поља клинике.');
        }
      }
    
      clickIzmena = (naziv, staraVr) => {
        console.log(naziv);
        this.setState({
            modalIzmena: true
        });
        this.setState({changedValue: naziv});
    
        if(naziv === 'ime'){
          this.setState({headerText: "Измена имена"});
          this.setState({staraVrednost: this.state.cadmin.firstName});
        }
        else if(naziv === 'prezime'){
          this.setState({headerText: "Измена презимена"});
          this.setState({staraVrednost: this.state.cadmin.lastName});
        }
        else if(naziv === 'adresa'){
          this.setState({headerText: "Измена адресе"});
          this.setState({staraVrednost: this.state.cadmin.address});
        }
        else if(naziv === 'grad'){
          this.setState({headerText: "Измена града"});
          this.setState({staraVrednost: this.state.cadmin.city});
        }
        else if(naziv === 'drzava'){
          this.setState({headerText: "Измена државе"});
          this.setState({staraVrednost: this.state.cadmin.country});
        }
        else if(naziv === 'telefon'){
          this.setState({headerText: "Измена телефона"});
          this.setState({staraVrednost: this.state.cadmin.telephone});
        }
        else{
          console.log('greska izmena');
        }
     }

     closeModalHandler = () => {
      this.setState({
        modalIzmena: false
      });
    }
  
    sendChangeHandler = () => { //izmena profila
      this.setState({
        modalIzmena: false
      });
      let newValue = document.getElementById("newValue_input").value;
      let changedName = this.state.changedValue;
  
      const sve_ok = this.promenaState(changedName, newValue);
      if(!sve_ok){
        return;
      }
  
      let email = this.state.cadmin.mail;
      //saljemo azuriranog admina na back da te promene sacuvamo u bazi
      const url = 'http://localhost:8081/clinicAdministrator/changeAttribute/'+changedName+"/"+newValue+"/"+email;
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
      };
      fetch(url, options)
      .then(response => {
        console.log(response.ok);
        console.log(response)
        if(response.ok === true){
          alert("Успешно сте изменили поље '" + changedName+"'.");
        }
        else {
          alert("Дошло је до грешке приликом измене поља '" + changedName + "'.");
        }
      });
  
    }
  
    promenaState = (nazivAtributa, novaVrednost) => {
      console.log("promena stanja");
       //kopija admina
       const cadmin = {
         ...this.state.cadmin
       };
       if(nazivAtributa === 'ime'){
        cadmin.firstName = novaVrednost;
      }else if(nazivAtributa === "prezime"){
        cadmin.lastName = novaVrednost;
      }else if(nazivAtributa === "adresa"){
        cadmin.address = novaVrednost;
      }
      else if(nazivAtributa === "grad"){
        cadmin.city = novaVrednost;
      }
      else if(nazivAtributa === "drzava"){
        cadmin.country = novaVrednost;
      }
      else if(nazivAtributa === "telefon"){
        cadmin.telephone = novaVrednost;
      }
       // update-uj state
      this.setState({cadmin : cadmin});
      return true;
    }
  

     
   
     clickProfile = (event) => {
      document.getElementById("logo_img").style.visibility = "hidden";
      
          this.setState({
            isListDoctors: false,
            isAppointmentTypes: false,
            isProfile: true,
            isRegister: false,
            isRooms: false
          });
        
    }

      clickLogout = () => {
        //this.context.token = null;
        //this.context.user = null;
        this.props.history.push({
          pathname: '/login'
        });
      }
    
      clickAppointmentTypes = (event) => {
        document.getElementById("logo_img").style.visibility = "hidden"; 
        const url = 'http://localhost:8081/type/getAll';
        const options = {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
        };
  
        fetch(url, options)
        .then(responseWrapped => responseWrapped.json())
        .then(response => {
          this.setState({
            listTypes: response,
            isListDoctors: false,
            isAppointmentTypes: true,
            isProfile: false,
            isRegister: false,
            isRooms: false
          }); 
      }); 
      }
    
     
        
      clickRegister = (event) => {
        document.getElementById("logo_img").style.visibility = "hidden"; 
        this.setState({
            isListDoctors: false,
            isAppointmentTypes: false,
            isProfile: false,
            isRegister: true,
            isRooms: false
        });
      }
    
      clickRooms = (event) => {
        alert("Страница је у процесу израде");
      }
    
      clickDoctors = (event) => {
        document.getElementById("logo_img").style.visibility = "hidden";
        const url = 'http://localhost:8081/doctor/getAll';
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
          this.setState({
            listDoctors: response,
            isListDoctors: true,
            isAppointmentTypes: false,
            isProfile: false,
            isRegister: false,
            isRooms: false
        }); 
      });
      }

    generateTableData(){
      let res=[];
      let tableData = this.state.listDoctors;
      for(var i =0; i < tableData.length; i++){
          res.push(
            <tr>
          <td key={tableData[i].firstName}>{tableData[i].firstName}</td>
          <td key= {tableData[i].lastName}>{tableData[i].lastName}</td>
          <td key={tableData[i].tip}>{tableData[i].tip}</td>
          <td key={tableData[i].mail}>{tableData[i].mail}</td>
          </tr>
          )
      }
      return res;
    } 
    generateTableDataTypes(){
      let res=[];
      let tableData = this.state.listTypes;
      for(var i =0; i < tableData.length; i++){
          res.push(
            <tr>
          <td key={tableData[i].name}>{tableData[i].name}</td>
          <td> <button onClick={this.deleteType}>Обриши</button></td>
          </tr>
          )
      }
      return res;
    } 

  mySubmitHandler = (event) => {
    event.preventDefault();
    let ime = this.state.firstName;
    let prezime = this.state.lastName;
    let obj = {
      "firstName" : this.state.firstName,
      "lastName" : this.state.lastName
    }
    
    const url = 'http://localhost:8081/clinicAdministrator/find/'+ime+"/"+prezime;
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(obj)
    };

    fetch(url, options)
    .then(responseWrapped => responseWrapped.json())
    .then(response => {
      
      if (response.ok == false) {
        alert("Тражени лекар не постоји.");
      } else {
        alert(ime+" "+prezime+" пронађен.");
      }
    })
    
  }
  
  addType() {
    let name = document.getElementById("name");
    const url = 'http://localhost:8081/type/save/'+name;
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
    };

    fetch(url, options)
    .then(responseWrapped => responseWrapped.json())
    .then(response => {
      
      if (response.ok == true) {
        alert("Нови тип је додат.");
      } else {
        alert("Дошло је до грешке.");
      }
    });
  }

  deleteType() {

  }

  render() {
    let modalniIzmena = null;
   
    if (this.state.modalIzmena) {  //modalni dijalog za izmenu profila 
      modalniIzmena = (
        <Modal
          className="modal"
          show={this.state.modalIzmena}
          close={(event) => this.closeModalHandler(event)}
          send={this.sendChangeHandler}
          header={this.state.headerText}
        >
          <form>
            <p>Стара вредност:</p>
            <input type="text"
              className="input_field"
              value={this.state.staraVrednost}
              disabled></input>
            <p>Нова вредност:</p>
            <input type="text"
              className="input_field"
              id="newValue_input"></input>
          </form>
        </Modal>);

    }

   

    
      let componentDoctors = null;
      if(this.state.isListDoctors){
        componentDoctors = (
            <DoctorList
              mySubmit={this.mySubmitHandler}
              generateTableData = {this.generateTableData}
            >
            </DoctorList>
        )
      }
      let types = null;
      if(this.state.isAppointmentTypes){
        types = (
            <AppointmentType
              addType = {this.addType}
              generateTableDataTypes = {this.generateTableDataTypes}
            >
            </AppointmentType>
        )
      }

      let registerIS = null;
      if(this.state.isRegister){
        registerIS = (
          <RegisterMedical
              pat={this.state.cadmin}> 
          </RegisterMedical>
        );
        }

      return (
        <div className="main_div">
        <ul id="unordered_list" className="ul_list">
          <li className="li_list"><a 
          id="profile" 
          onClick={this.clickProfile}> Профил корисника </a></li>
          <li className="li_list"><a 
          id="register"
          onClick={this.clickRegister}> Регистрација медицинског особља </a></li>
          <li className="li_list"><a 
          id="doctors" 
          onClick={this.clickDoctors}> Листа лекара </a></li>
          <li className="li_list"><a 
          id="appointment_types"
          onClick={this.clickAppointmentTypes}> Типови прегледа </a></li>
          <li className="li_list"><a 
          id="rooms"
          onClick={this.clickRooms}> Сале </a></li>
          <li className="li_list"><a 
            id="logout"
            onClick={this.clickLogout}> Одјави се </a></li>
        </ul>
        

        {registerIS}
        <ProfileAdmin
          admin={this.state.cadmin}
          show = {this.state.isProfile} 
          clickIzmena={this.clickIzmena}
          clickZabrana={this.clickZabrana}
          >
        </ProfileAdmin>
        
        {modalniIzmena}
        {componentDoctors}
        {types}

        </div>
      );
    }
}


export default PageAdmin;