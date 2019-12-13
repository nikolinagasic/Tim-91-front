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
          modalPassword: false
        };
      }
    
    
      clickAppointmentTypes = (event) => {
        alert("Страница је у процесу израде");
      }
    
      clickProfile = (event) => {
        document.getElementById("logo_img").style.visibility = "hidden"; 
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
          this.props.history.push({
            pathname:'/doctorlist',
            state: { detail: response}
          })
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

  
  

  render() {
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
        
        <ProfileAdmin
          pat={this.state.cadmin}
          show = {this.state.isProfile}> 
        </ProfileAdmin>
        <RegisterMedical
          pat={this.state.cadmin}
          show = {this.state.isRegister}> 
        </RegisterMedical>
       
        </div>
      );
    }
}


export default PageAdmin;