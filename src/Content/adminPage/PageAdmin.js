import React, { Component } from 'react';
import ProfileAdmin from './ProfileAdmin'
import './PageAdmin.css'
import RegisterMedical from "../RegisterMedical" 
import DoctorList from "./DoctorList" 



class PageAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
          cadmin: this.props.location.state.detail, 
          isProfile: false,
          isRegister: false,
          isAppointmentTypes: false,
          isRooms: false,
          isDoctors: false,
    
          modalShowing: false,
          headerText: '',
          staraVrednost: '',
          changedValue: '',
          modalPassword: false,
          listDoctors: null,
          isListDoctors: false
        };
      }
    
    
      clickAppointmentTypes = (event) => {
        alert("Страница је у процесу израде");
      }
    
      clickProfile = (event) => {
        document.getElementById("logo_img").style.visibility = "hidden"; 
        this.setState({
          isListDoctors: false
        });
        this.setState({
          isAppointmentTypes: false
        });
        this.setState({
          isProfile: true
        });
        this.setState({
          isDoctors: false
        });
        this.setState({
            isRegister: false
          });
        this.setState({
          isRooms: false
        });
      }
    
      clickRegister = (event) => {
        document.getElementById("logo_img").style.visibility = "hidden"; 
        this.setState({
          isListDoctors: false
        });
        this.setState({
          isAppointmentTypes: false
        });
        this.setState({
          isProfile: false
        });
        this.setState({
          isDoctors: false
        });
        this.setState({
            isRegister: true
          });
        this.setState({
          isRooms: false
        }); 
      }
    
      clickRooms = (event) => {
        alert("Страница је у процесу израде");
      }
    
      clickDoctors = (event) => {
        document.getElementById("logo_img").style.visibility = "hidden";
        const url = 'http://localhost:8081/clinicAdministrator/doctor_list';
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
            listDoctors: response
          });
          this.setState({
            isListDoctors: true
          });

          this.setState({
            isAppointmentTypes: false
          });
          this.setState({
            isProfile: false
          });
          this.setState({
            isDoctors: true
          });
          this.setState({
              isRegister: false
            });
          this.setState({
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
          <td key={tableData[i].field}>{tableData[i].field}</td>
          <td key={tableData[i].mail}>{tableData[i].mail}</td>
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
  

  render() {
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
          onClick={this.clickRegister}> Регистрација мефицинског особља </a></li>
          <li className="li_list"><a 
          id="doctors" 
          onClick={this.clickDoctors}> Листа лекара </a></li>
          <li className="li_list"><a 
          id="appointment_types"
          onClick={this.clickAppointmentTypes}> Типови прегледа </a></li>
          <li className="li_list"><a 
          id="rooms"
          onClick={this.clickRooms}> Сале </a></li>
        </ul>
        

        {registerIS}
        <ProfileAdmin
          pat={this.state.cadmin}
          show = {this.state.isProfile}> 
        </ProfileAdmin>
        
        
        {componentDoctors}
        </div>
      );
    }
}


export default PageAdmin;