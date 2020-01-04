import React, { Component } from 'react';
import ProfileAdmin from './ProfileAdmin'
import './PageAdmin.css'
import RegisterMedical from "../RegisterMedical" 
import DoctorList from "./DoctorList" 
import AppointmentType from "./AppointmentType" 
import ClinicProfile from "./ClinicProfile" 
import RoomList from "./RoomList" 
import ProfileDoctor from "../doctorPage/ProfileDoctor" 
import Modal from '../Modal'

class PageAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
          cadmin: this.props.location.state.detail, 
          clinic: this.props.location.state.detail,
          isProfile: false,
          isProfileDoctor: false,
          isRegister: false,
          isAppointmentTypes: false,
          isRooms: false,
          isListDoctors: false,
          isClinic: false,
    
          modalIzmena: false,
          modalIzmenaKlinike: false,
          modalIzmenaTipa: false,
          modalIzmenaDoktora: false,
          modalIzmenaSale: false,
          headerText: '',
          staraVrednost: '',
          changedValue: '',
          modalPassword: false,
          allDoctors: null,
          listDoctors: null,
          listTypes: null,
          listRooms: null,
          name_type: null,
          doctor: null,
          name_room: null,
          number_room: null,
          found: null,
          ime: null,
          prezime: null
        };
      }
    
      clickZabrana = (polje) => {
        console.log(polje);
        if(polje === 'mail'){
          alert('Није могуће мењати адресу е-поште.');
        }
        else if(polje === 'klinika'){
          alert('Није могуће мењати назив клинике.');
        }
        else if(polje === 'ocena'){
          alert('Није могуће мењати оцену.');
        }
        else if(polje === 'tip'){
          alert('Није могуће мењати тип прегледа.');
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
      clickIzmenaKlinike = (naziv,staraVr) => {
        console.log(naziv);
        this.setState({
            modalIzmenaKlinike: true
        });
        this.setState({changedValue: naziv});
    
        if(naziv === 'adresa'){
          this.setState({headerText: "Измена адресе"});
          this.setState({staraVrednost: this.state.clinic.address});
        }
        else if(naziv === 'opis'){
          this.setState({headerText: "Измена описа"});
          this.setState({staraVrednost: this.state.clinic.description});
        }
        else{
          console.log('greska izmena');
        }
      }
      clickIzmenaTipa = (name) => (event) => {
        event.preventDefault();
        console.log("Usao u izmenu: "+name);
        this.setState({
            modalIzmenaTipa: true
        });
          this.setState({changedValue: 'ime'});
          this.setState({headerText: "Измена назива типа прегледа"});
          this.setState({staraVrednost: name});
        
      }
      clickIzmenaDoktora = (naziv)=> {
        console.log(naziv);
        this.setState({
            modalIzmenaDoktora: true
        });
        this.setState({changedValue: naziv});
    
        if(naziv === 'ime'){
          this.setState({headerText: "Измена имена"});
          this.setState({staraVrednost: this.state.doctor.firstName});
        }
        else if(naziv === 'prezime'){
          this.setState({headerText: "Измена презимена"});
          this.setState({staraVrednost: this.state.doctor.lastName});
        }
        else{
          console.log('greska izmena');
        }
      }
      clickIzmenaSale = (name) => (event) => {
        event.preventDefault();
        this.setState({
          modalIzmenaSale: true
      });
      this.setState({changedValue: 'broj'});
  
        this.setState({headerText: "Измена броја"});
        this.setState({staraVrednost: name});
    
      }
      
      closeModalHandler = () => {
      this.setState({
        modalIzmena: false,
        modalIzmenaKlinike: false,
        modalIzmenaTipa: false,
        modalIzmenaDoktora: false,
        modalIzmenaSale: false
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
  
      sendChangeClinicHandler = () => { //izmena profila klinike
        this.setState({
          modalIzmenaKlinike: false
        });
        let newValue = document.getElementById("newValue_input").value;
        let changedName = this.state.changedValue;
    
        const sve_ok = this.promenaStateClinic(changedName, newValue);
        if(!sve_ok){
          return;
        }
    
        let name = this.state.clinic.name;
        //saljemo azuriranog admina na back da te promene sacuvamo u bazi
        const url = 'http://localhost:8081/clinic/changeAttribute/'+changedName+"/"+newValue+"/"+name;
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
      promenaStateClinic = (nazivAtributa, novaVrednost) => {
        console.log("promena stanja");
        //kopija klinike
        const clinic = {
          ...this.state.clinic
        };
        if(nazivAtributa === "adresa"){
          clinic.address = novaVrednost;
        }
        else if(nazivAtributa === "opis"){
          clinic.description = novaVrednost;
        }
        
        // update-uj state
        this.setState({clinic : clinic});
        return true;
      }

      sendChangeTypeHandler = () => { //izmena tipa, dugme posalji
        this.setState({
          modalIzmenaTipa: false
        });
        let newValue = document.getElementById("newValue_input").value;
        let changedName = this.state.changedValue;
    
        const sve_ok = this.promenaStateClinic(changedName, newValue);
        if(!sve_ok){
          return;
        }
        let name = this.state.staraVrednost;
        console.log("naziv:"+name);

        //saljemo tip na back da te promene sacuvamo u bazi
        const url = 'http://localhost:8081/type/changeAttribute/'+changedName+"/"+newValue+"/"+name;
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
            this.clickAppointmentTypes();
          }
          else {
            alert("Дошло је до грешке приликом измене поља '" + changedName + "'.");
          }
        });
    
      }
        changeHandler = (event) => {
          let nam = event.target.name;
          let val = event.target.value;
          let err = '';
          this.setState({errormessage: err});
          this.setState({[nam]: val});
        }
        addType  = (n) => (event) => {
          event.preventDefault;
          let name = n;
          console.log("duzina:"+name.length);
          if (name.length<3) {
            alert("Назив типа прегледа мора имати најмање 3 карактера.");
          } else {
          console.log("usao u dodavanje: "+name);
          const url = 'http://localhost:8081/type/save';
          let obj = {
            "name" : name
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
            if (response.ok == true) {
              alert("Нови тип прегледа је додат.");
              this.clickAppointmentTypes();
            }  else {
              alert("Тип прегледа "+name+" већ постоји.");
            }
          });
        }
        }
        deleteType = (name) => (event) => {
          event.preventDefault;
          console.log("usao u brisanje: "+name);
          const url = 'http://localhost:8081/type/delete/'+name;
          const options = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },
          };

          fetch(url, options) 
          .then(response => {
            console.log(response.status);
            if (response.ok == true) {
              alert("Тип прегледа "+name+" је успешно обрисан.");
              this.clickAppointmentTypes();
            }  else if (response.status == 409) {
              alert("Не може се обрисати тип прегледа који припада неком лекару.");
            }
            else {
              alert("Грешка.");
            }
          }); 
        }
        

      sendChangeDoctorHandler = () => { //izmena doktora, dugme posalji
        this.setState({
          modalIzmenaDoktora: false
        });
        let newValue = document.getElementById("newValue_input").value;
        let changedName = this.state.changedValue;
    
        const sve_ok = this.promenaStateDoctor(changedName, newValue);
        if(!sve_ok){
          return;
        }
        let mail = this.state.doctor.mail;
        console.log(changedName+" "+newValue+" "+mail);
        //saljemo doktora na back da te promene sacuvamo u bazi
        const url = 'http://localhost:8081/doctor/changeAttribute/'+changedName+"/"+newValue+"/"+mail;
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
      promenaStateDoctor = (nazivAtributa, novaVrednost) => {
        console.log("promena stanja");
        //kopija doc
        const doctor = {
          ...this.state.doctor
        };
        if(nazivAtributa === "ime"){
          doctor.firstName = novaVrednost;
        }
        else if(nazivAtributa === "prezime"){
          doctor.lastName = novaVrednost;
        }
        
        // update-uj state
        this.setState({doctor : doctor});
        return true;
      }
        deleteDoctor = (mail,firstName,lastName) => (event) => {
          event.preventDefault;
          console.log("usao u brisanje: "+mail);
          const url = 'http://localhost:8081/doctor/delete/'+mail;
          const options = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },
          };

          fetch(url, options) 
          .then(response => {
            console.log(response.status);
            if (response.ok == true) {
              alert("Доктор "+firstName+" "+lastName+" је успешно обрисан.");
              this.clickDoctors();
            }  else {
              alert("Грешка.");
            }
          }); 
        }
        findDoctor = (allDoctors,ime,prezime) => (event) => {
          event.preventDefault;
          console.log(allDoctors,ime,prezime);
          const url = 'http://localhost:8081/doctor/find/'+ime+"/"+prezime;
          const options = {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json;charset=UTF-8',
              },
              body: JSON.stringify(allDoctors)
          };
  
          fetch(url, options)
          .then(responseWrapped => responseWrapped.json())
          .then(response => {
              this.setState({
                  listDoctors: response,
                  isListDoctors: true
              });
          });
          console.log(this.state.listDoctors);
        }
        sendChangeRoomHandler = () => { //izmena sale, dugme posalji
          this.setState({
            modalIzmenaSale: false
          });
          let newValue = document.getElementById("newValue_input").value;
          let changedName = this.state.changedValue;
      
   //       const sve_ok = this.promenaStateClinic(changedName, newValue);
   //       if(!sve_ok){
   //         return;
    //      }
          let name = this.state.staraVrednost;
          console.log("naziv:"+name);
  
          //saljemo na back da te promene sacuvamo u bazi
          const url = 'http://localhost:8081/room/changeAttribute/'+changedName+"/"+newValue+"/"+name;
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
              this.clickRooms();
            }
            else {
              alert("Дошло је до грешке приликом измене поља '" + changedName + "'.");
            }
          });
      
        }
        addRoom  = (name,number) => (event) => {
          event.preventDefault;
          if (name == null || number == null) {
            alert("Унесите назив и број сале.");       
          } else if (!/^\d+$/.test(number)) {
            alert("Број сале мора бити број.");       
          }
          else {
            console.log("usao u dodavanje: "+name);
            const url = 'http://localhost:8081/room/save';
            let obj = {
              "name" : name,
              "number" : number,
              "clinic" : this.state.cadmin.clinic
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
              if (response.ok == true) {
                alert("Нова сала је додата.");
                this.clickRooms();
              }  else if(response.status == 409) {
                alert("Сала " + name + " " + number + " већ постоји.");
              } else {
                alert("Грешка.");
              }
            });
            }
          }
        deleteRoom = (name) => (event) => {
            event.preventDefault;
            console.log("usao u brisanje: "+name);
            const url = 'http://localhost:8081/room/delete/'+name;
            const options = {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
              },
            };
  
            fetch(url, options) 
            .then(response => {
              console.log(response.status);
              if (response.ok == true) {
                alert("Сала под називом "+name+" је успешно обрисана.");
                this.clickRooms();
              }  else if (response.status == 409) {
                alert("Не може се обрисати сала за коју је заказан преглед.");
              }
              else {
                alert("Грешка.");
              }
            }); 
        }
            clickProfile = (event) => {
              document.getElementById("logo_img").style.visibility = "hidden";
                  this.setState({
                    isListDoctors: false,
                    isAppointmentTypes: false,
                    isProfile: true,
                    isProfileDoctor: false,
                    isRegister: false,
                    isRooms: false,
                    isClinic: false
                  });
                
            }
            clickClinic = (event) => {
              document.getElementById("logo_img").style.visibility = "hidden"; 
              let name = this.state.cadmin.clinic;
              console.log(name);
              const url = 'http://localhost:8081/clinic/getOne/'+name;
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
                  clinic: response,
                  isListDoctors: false,
                  isAppointmentTypes: false,
                  isProfile: false,
                  isProfileDoctor: false,
                  isRegister: false,
                  isRooms: false,
                  isClinic: true
              });
            });
            }
            clickRegister = (event) => {
              document.getElementById("logo_img").style.visibility = "hidden"; 
              this.setState({
                  isListDoctors: false,
                  isAppointmentTypes: false,
                  isProfile: false,
                  isProfileDoctor: false,
                  isRegister: true,
                  isRooms: false,
                  isClinic: false
              });
            }
            clickLogout = () => {
              //this.context.token = null;
              //this.context.user = null;
              this.props.history.push({
                pathname: '/login'
              });
            }  
            clickRooms = (event) => {
              document.getElementById("logo_img").style.visibility = "hidden"; 
              let klinika = this.state.cadmin.clinic;
              const url = 'http://localhost:8081/room/getByClinic/'+klinika;
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
                console.log(response);
                this.setState({
                  listRooms: response,
                  isListDoctors: false,
                  isAppointmentTypes: false,
                  isProfile: false,
                  isProfileDoctor: false,
                  isRegister: false,
                  isRooms: true,
                  isClinic: false            

                }); 
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
                  isProfileDoctor: false,
                  isRegister: false,
                  isRooms: false,
                  isClinic: false            

                }); 
            }); 
            }                        
            clickDoctors = (event) => {
              document.getElementById("logo_img").style.visibility = "hidden";
              let clinic = this.state.cadmin.clinic;
              console.log(clinic);
              const url = 'http://localhost:8081/doctor/getDoctors/'+clinic;
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
                  allDoctors: response,
                  listDoctors: response,
                  isListDoctors: true,
                  isAppointmentTypes: false,
                  isProfile: false,
                  isProfileDoctor: false,
                  isRegister: false,
                  isRooms: false,
                  isClinic: false
              }); 
            });
            }
            clickProfileDoctor = (mail) => (event) => {
              event.preventDefault;
              document.getElementById("logo_img").style.visibility = "hidden";
              console.log("mail:"+mail);       
              const url = 'http://localhost:8081/doctor/getByMail/'+mail;
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
                        doctor: response,
                        isListDoctors: false,
                        isAppointmentTypes: false,
                        isProfile: false,
                        isProfileDoctor: true,
                        isRegister: false,
                        isRooms: false,
                        isClinic: false
                    }); 
                  });
            }
            click = (event) => {
              alert("Страница је у процесу израде");
            } 
        
    generateTableData(allDoctors){
      let res=[];
      let tableData = allDoctors;
      for(var i =0; i < tableData.length; i++){
          res.push(
            <tr>
          <td key={tableData[i].firstName}>{tableData[i].firstName}</td>
          <td key= {tableData[i].lastName}>{tableData[i].lastName}</td>
          <td key={tableData[i].tip}>{tableData[i].tip}</td>
          <td > <button className="btn_pageAdmin_n" 
            onClick={this.clickProfileDoctor(tableData[i].mail)}>Измени</button></td>
          <td > <button className="btn_pageAdmin_n" onClick={this.deleteDoctor(tableData[i].mail,tableData[i].firstName,tableData[i].lastName)}>Обриши</button></td>
          </tr>
          )
      }
      return res;
    } 
    generateTableDataTypes(listTypes){
      let res=[];
      let tableData = listTypes;
      console.log("br tipova: "+tableData.length);
      for(var i =0; i < tableData.length; i++){
          res.push(
            <tr>
          <td key={tableData[i].name}>{tableData[i].name}</td>
          <td> <button className="btn_pageAdmin_n" onClick={this.clickIzmenaTipa(tableData[i].name)}>Измени</button></td>
          <td> <button className="btn_pageAdmin_n" onClick={this.deleteType(tableData[i].name)}>Обриши</button></td>
          </tr>
          )
      }
      return res;
    } 
    generateTableDataRooms(listRooms){
      let res=[];
      let tableData = listRooms;
      for(var i =0; i < tableData.length; i++){
          res.push(
            <tr>
          <td key={tableData[i].name}>{tableData[i].name}</td>          
          <td key= {tableData[i].number}>{tableData[i].number}</td>

          <td > <button className="btn_pageAdmin_n" onClick={this.clickIzmenaSale(tableData[i].name)}>Измени</button></td>
          <td > <button className="btn_pageAdmin_n" onClick={this.deleteRoom(tableData[i].name)}>Обриши</button></td>
          </tr>
          )
      }
      return res;
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
    let modalniIzmenaKlinike = null;
    if (this.state.modalIzmenaKlinike) {  //modalni dijalog za izmenu profila klinike
      modalniIzmenaKlinike = (
        <Modal
          className="modal"
          show={this.state.modalIzmenaKlinike}
          close={(event) => this.closeModalHandler(event)}
          send={this.sendChangeClinicHandler}
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
    let modalniIzmenaTipa = null;
    if (this.state.modalIzmenaTipa) {  //modalni dijalog za izmenu tipa
      modalniIzmenaTipa = (
        <Modal
          className="modal"
          show={this.state.modalIzmenaTipa}
          close={(event) => this.closeModalHandler(event)}
          send={this.sendChangeTypeHandler}
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
    let modalniIzmenaDoktora = null;   
    if (this.state.modalIzmenaDoktora) {  //modalni dijalog za izmenu profila doktora
      modalniIzmenaDoktora = (
        <Modal
          className="modal"
          show={this.state.modalIzmenaDoktora}
          close={(event) => this.closeModalHandler(event)}
          send={this.sendChangeDoctorHandler}
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
    let modalniIzmenaSale = null;   
    if (this.state.modalIzmenaSale) {  //modalni dijalog za izmenu profila doktora
      modalniIzmenaSale = (
        <Modal
          className="modal"
          show={this.state.modalIzmenaSale}
          close={(event) => this.closeModalHandler(event)}
          send={this.sendChangeRoomHandler}
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
        console.log("usao u doktore");
        componentDoctors = (
            <DoctorList
              findDoctor={this.findDoctor(this.state.allDoctors,this.state.ime,this.state.prezime)}
              generateTableData = {this.generateTableData(this.state.listDoctors)}
              clickRegister = {this.clickRegister}
              changeHandler = {this.changeHandler}
            >
            </DoctorList>
        )
    }
    let types = null;
    if(this.state.isAppointmentTypes){
       types = (
           <AppointmentType
              addType = {this.addType(this.state.name_type)}
              changeHandler = {this.changeHandler}
              generateTableDataTypes = {this.generateTableDataTypes(this.state.listTypes)}
            >
            </AppointmentType>
       )
    }
    let rooms = null;
    if(this.state.isRooms){
       rooms = (
           <RoomList
              addRoom = {this.addRoom(this.state.name_room,this.state.number_room)}
              changeHandler = {this.changeHandler}
              generateTableDataRooms = {this.generateTableDataRooms(this.state.listRooms)}
            >
            </RoomList>
       )
    }
    let registerIS = null;
    if(this.state.isRegister){
        registerIS = (
          <RegisterMedical
              pat={this.state.cadmin}
              clickDoctors = {this.clickDoctors}>            
          </RegisterMedical>
        );
    }
    let profileDoc = null;
    if (this.state.isProfileDoctor) {
        profileDoc = (
          <ProfileDoctor
          pat={this.state.doctor}
          show = {this.state.isProfileDoctor} 
          clickIzmena={this.clickIzmenaDoktora}
          clickZabrana={this.clickZabrana}
          >
        </ProfileDoctor>
        );
    }

      return (
        <div className="main_div">
        <ul id="unordered_list" className="ul_list">
          <li className="li_list"><a 
          id="profile" 
          onClick={this.clickProfile}> Профил корисника </a></li>
          <li className="li_list"><a 
          id="profile_clinic"
          onClick={this.clickClinic}> Профил клинике </a></li>
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
          id="termini"
          onClick={this.click}> Слободни термини </a></li> 
          <li className="li_list"><a 
          id="profile" 
          onClick={this.click}> Захтеви за одсуство </a></li>       
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
        
        <ClinicProfile
          clinic={this.state.clinic}
          show = {this.state.isClinic} 
          clickIzmena={this.clickIzmenaKlinike}
          clickZabrana={this.clickZabrana}
          >
        </ClinicProfile>
        {modalniIzmena}
        {modalniIzmenaKlinike}
        {modalniIzmenaTipa}
        {modalniIzmenaDoktora}
        {modalniIzmenaSale}
        {componentDoctors}
        {types}
        {rooms}
        {profileDoc}
        </div>
      );
    }
}


export default PageAdmin;