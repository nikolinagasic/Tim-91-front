import React, { Component } from 'react';
import logo from './logo.png';
import {HashRouter, Route} from 'react-router-dom';
import Home from "./Content/Home";
import Register from "./Content/Register";
import Login from "./Content/Login";
import RegisterMedical from "./Content/RegisterMedical";
import RegisterAdmin from "./Content/RegisterAdmin";
import Clinic from "./Content/Clinic";
import Menu from './Menu/Menu';
import PagePatient from './Content/mainPage/PagePatient';
import ProfilePatient from './Content/mainPage/ProfilePatient';
import PageCAdmin from './Content/ccadminPage/PageCAdmin';
import ProfileCAdmin from './Content/ccadminPage/ProfileCAdmin';
import Request from './Content/ccadminPage/Request';
import Diagnosis from './Content/ccadminPage/Diagnosis';
import PageAdmin from './Content/adminPage/PageAdmin';
import ProfileAdmin from './Content/adminPage/ProfileAdmin';
import PageDoctor from './Content/doctorPage/PageDoctor';
import ProfileDoctor from './Content/doctorPage/ProfileDoctor';
import PageNurse from './Content/nursePage/PageNurse';
import ProfileNurse from './Content/nursePage/ProfileNurse';
import DoctorList from './Content/adminPage/DoctorList';
import ClinicSearch from './Content/searchAndFilter/ClinicSearch';
import './App.css';

class App extends Component {
  state = {
    isLogoutVisible: false
  }

  changeLogoutVisibility = (visibility) => {
    this.setState({
      isLogoutVisible: visibility
    })
  }

  render() {
    return (
        <HashRouter>
            <div className="App">
              <header className="App-header">
                <h1 className="App-title">Здравствено информациони систем</h1>
                <Menu className="App-menu" />
              </header>
              <p className="App-intro">
                <img src={logo} className="App-logo" alt="logo" id="logo_img"/>        
              </p>
              <div className="content">
                <Route exact path="/" component={Home}/>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Route path="/medical" component={RegisterMedical}/>
                <Route path="/admin" component={RegisterAdmin}/>
                <Route path="/clinic" component={Clinic}/>
                <Route path="/pagepatient" component={PagePatient}/>
                <Route path="/profilepatient" component={ProfilePatient}/>
                <Route path="/pagecadmin" component={PageCAdmin}/>
                <Route path="/profilecadmin" component={ProfileCAdmin}/>
                <Route path="/request" component={Request}/>
                <Route path="/diagnosis" component={Diagnosis}/>
                <Route path="/pageadmin" component={PageAdmin}/>
                <Route path="/profileadmin" component={ProfileAdmin}/>
                <Route path="/pagedoctor" component={PageDoctor}/>
                <Route path="/profiledoctor" component={ProfileDoctor}/>
                <Route path="/pagenurse" component={PageNurse}/>
                <Route path="/profilenurse" component={ProfileNurse}/>
                <Route path="/doctorlist" component={DoctorList}/>
                <Route path="/clinicSearchSort" component={ClinicSearch}/>
              </div>
            </div>
        </HashRouter>
    );
  }
}

export default App;
