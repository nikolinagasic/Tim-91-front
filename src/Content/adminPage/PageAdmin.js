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
import ReserveList from "./ReserveList" 
import Window from 'react-awesome-modal'
import {UserContext} from '../../UserProvider'
import PredefinedExam from './PredefinedExam'
import VacationRequests from './VacationRequests';

class PageAdmin extends Component {
  static contextType = UserContext; 
  
    constructor(props) {
        super(props);
        this.state = {
          cadmin: this.props.location.state.detail,
          clinic: this.props.location.state.detail.clinic,
          isProfile: false,
          isProfileDoctor: false,
          isRegister: false,
          isAppointmentTypes: false,
          isRooms: false,
          isListDoctors: false,
          isClinic: false,
          isVacation: false,
          
          // unapred_def
          isUnapredDef: false,
          listaSala_ud: null,
          listaLekara_ud: null,
          listaTipova_ud: null,
          listaSatnica_ud: [],

          isReservation: false,

          isTermini: false,    
          term: null,
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
          listTerms: null,
          listVacation: null,
          roomTermini: null,
          name_type: null,
          doctor: null,
          name_room: null,
          number_room: null,
          found: null,
          ime: null,
          prezime: null,
          idZahteva: null
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
          this.setState({staraVrednost: this.context.user.firstName});
        }
        else if(naziv === 'prezime'){
          this.setState({headerText: "Измена презимена"});
          this.setState({staraVrednost: this.context.user.lastName});
        }
        else if(naziv === 'adresa'){
          this.setState({headerText: "Измена адресе"});
          this.setState({staraVrednost: this.context.user.address});
        }
        else if(naziv === 'grad'){
          this.setState({headerText: "Измена града"});
          this.setState({staraVrednost: this.context.user.city});
        }
        else if(naziv === 'drzava'){
          this.setState({headerText: "Измена државе"});
          this.setState({staraVrednost: this.context.user.country});
        }
        else if(naziv === 'telefon'){
          this.setState({headerText: "Измена телефона"});
          this.setState({staraVrednost: this.context.user.telephone});
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
      clickIzmenaSale = (name,number) => (event) => {
        event.preventDefault();
        this.setState({
          modalIzmenaSale: true
      });
      this.setState({changedValue: 'naziv'});
  
        this.setState({headerText: "Измена назива сале"});
        this.setState({staraVrednost: [name,number]});
    
      }
      
      closeModalHandler = () => {
      this.setState({
        modalIzmena: false,
        modalIzmenaKlinike: false,
        modalIzmenaTipa: false,
        modalIzmenaDoktora: false,
        modalIzmenaSale: false,
        isRooms: false,
        isTermini: false,
        isRazlog: false
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
    
        let email = this.context.user.mail;
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
        // const cadmin = {
        //   ...this.state.cadmin
        // };
        if(nazivAtributa === 'ime'){
          this.context.user.firstName = novaVrednost;
        }else if(nazivAtributa === "prezime"){
          this.context.user.lastName = novaVrednost;
        }else if(nazivAtributa === "adresa"){
          this.context.user.address = novaVrednost;
        }
        else if(nazivAtributa === "grad"){
          this.context.user.city = novaVrednost;
        }
        else if(nazivAtributa === "drzava"){
          this.context.user.country = novaVrednost;
        }
        else if(nazivAtributa === "telefon"){
          this.context.user.telephone = novaVrednost;
        }
        // update-uj state
        //this.setState({cadmin : cadmin});
        return true;
      }
      
      sendChangeClinicHandler = () => { //izmena profila klinike
        this.setState({
          modalIzmenaKlinike: false
        });
        let newValue = document.getElementById("newValue_input").value;
        let changedName = this.state.changedValue;
    
        
        
        if (changedName == "adresa") {
            if (newValue == "") 
              alert("Поље адреса клинике не сме бити празно.");
        } else {
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
        addType  = (event) => {
          let naziv = document.getElementById("name_type").value;
          if(!naziv){
            naziv = "~";
          }          
          if (naziv.length<3) {
            alert("Назив типа прегледа мора имати најмање 3 карактера.");
          } else {
          console.log("usao u dodavanje: "+naziv);
          const url = 'http://localhost:8081/type/save';
          let obj = {
            "name" : naziv
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
            }  else if (response.status == 409) {
              alert("Тип прегледа "+naziv+" већ постоји.");
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
          .then(responseWrapped => responseWrapped.json().catch(err => {throw new Error();}))
          .then(response => {
            console.log(response == null);
            
              this.setState({
                  listTypes: response,
                  isAppointmentTypes: true
              });
          }).catch (err => {
            alert("Не може се обрисати тип прегледа који се користи.");
          });
         
        }
        findType = (event) => {
          let naziv = document.getElementById("name_type").value;
          if(!naziv){
            naziv = "~";
          }
         
          console.log(naziv);
          const url = 'http://localhost:8081/type/search/'+naziv;
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
                  isAppointmentTypes: true
              });
          });
          console.log(this.state.listTypes);
        
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
        deleteDoctor = (id,clinic) => (event) => {
          event.preventDefault;
          console.log("usao u brisanje: "+id+clinic);
          const url = 'http://localhost:8081/doctor/delete/'+id+'/'+clinic;
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
              this.setState({
                  listDoctors: response,
                  isListDoctors: true
              });
          });
          console.log(this.state.listDoctors);
        }
        findDoctor = (allDoctors) => (event) => {
          
          let ime = document.getElementById("doctorFirstName").value;
          let prezime = document.getElementById("doctorLastName").value;
          if(!ime){
            ime = "~";
          }
          if(!prezime){
              prezime = "~";
          }
          console.log(ime+prezime);
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
        sendChangeRoomHandler = (number) => { //izmena sale, dugme posalji
          this.setState({
            modalIzmenaSale: false
          });
          let newValue = document.getElementById("newValue_input").value;
          let changedName = this.state.changedValue;
      
   //       const sve_ok = this.promenaStateClinic(changedName, newValue);
   //       if(!sve_ok){
   //         return;
    //      }
      //    let name = this.state.staraVrednost;
  
          //saljemo na back da te promene sacuvamo u bazi
          const url = 'http://localhost:8081/room/changeAttribute/'+changedName+"/"+newValue+"/"+this.state.staraVrednost[1];
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
        addRoom  = (clinic) => (event) => {
          let naziv = document.getElementById("name_room").value;
          let broj = document.getElementById("number_room").value;
          let all = this.state.allRooms;
          let postoji = false;
          for (var i = 0; i<all.length;i++) {
            if (all[i].number == broj) {
                postoji = true;
            }
          }
          if(!naziv || !broj){
            alert("Унесите назив и број сале.");       
          
          } else if (!/^\d+$/.test(broj)) {
            alert("Број сале мора бити број.");       
          } else if (postoji) {
            alert("Број сале "+broj+" већ постоји.");
          }
          else {
            console.log("usao u dodavanje: "+naziv);
            const url = 'http://localhost:8081/room/save';
            let obj = {
              "name" : naziv,
              "number" : broj,
              "clinic" : clinic
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
                alert("Сала под називом " + naziv * " већ постоји.");
              } else {
                alert("Грешка.");
              }
            });
            }
          }
        deleteRoom = (number,clinic) => (event) => {
          event.preventDefault;
          console.log("usao u brisanje: "+number+clinic);
          const url = 'http://localhost:8081/room/delete/'+number+'/'+clinic;
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
              this.setState({
                  listRooms: response,
                  allRooms: response,
                  isRooms: true
              });
          });
        }
        findRoom = (allRooms) => (event) => {
          
          let naziv = document.getElementById("name_room").value;
          let broj = document.getElementById("number_room").value;
          let date = document.getElementById("date_room").value;
          if(!naziv){
            naziv = "~";
          }
          if(!broj){
              broj = "~";
          } 
          if (!date) {
            date = -1;
          }
          console.log(naziv+broj+date);
          const url = 'http://localhost:8081/room/find/'+naziv+"/"+broj + "/"+date;
          const options = {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json;charset=UTF-8',
              },
              body: JSON.stringify(allRooms)
          };
  
          fetch(url, options)
          .then(responseWrapped => responseWrapped.json())
          .then(response => {
              this.setState({
                  listRooms: response,
                  isRooms: true
              });
          });
          console.log(this.state.listDoctors);
        }
        reserveRoom = (idr) => (event) => {
          event.preventDefault;
          let date = document.getElementById("date_room").value;

          if(!date){
            console.log("-1:"+date);
            date = -1;
          }else{
            console.log(":"+date);
            let dat = new Date(date);
            date = dat.getTime();
            console.log(":"+date);
        }
        console.log("id:"+this.state.term.id+" idr:"+idr+"date:"+date);
          const url = 'http://localhost:8081/room/reserveRoom/'+this.state.term.id+'/'+idr+'/'+date;
          const options = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },
          };
          fetch(url, options) 
          .then(response => {
              if (response.ok) {
                alert("Sala uspesno rezervisana.");
                this.closeModalHandler();
                this.clickReservation();
                this.sendMail(date);
              } else if (response.status == 404) {
                alert("Доктор је заузет у изабраном термину.");
              } else {
                alert("Изабрана сала је изабраном термину заузета. Изаберите други датум или салу.");
              }
          });
        } 
        sendMail(date) {
    console.log("salje"+this.state.term.id+date);
      let  url = 'http://localhost:8081/clinicAdministrator/sendMail/'+this.state.term.id+'/'+date;
      const options = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      };

      fetch(url, options)
        .then(response => {
          console.log(response.status);
          if(response.ok){
            alert("Poslati mejlovi.");
          }
          else{
           alert("Nisu poslati mejlovi.");
          }
        });
     

        }
            clickProfile = (event) => {
              document.getElementById("logo_img").style.visibility = "hidden";
                  this.setState({
                    isUnapredDef: false,
                    isProfile: true,
                    isProfileDoctor: false,
                    isRegister: false,
                    isAppointmentTypes: false,
                    isRooms: false,
                    isListDoctors: false,
                    isClinic: false,
                    isReservation: false,
                    isTermini: false,
                    isVacation: false
                  });
                
            }
            clickClinic = (event) => {
              document.getElementById("logo_img").style.visibility = "hidden"; 
              let name = this.context.user.clinic;
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
                  isUnapredDef: false,
                  isProfile: false,
                  isProfileDoctor: false,
                  isRegister: false,
                  isAppointmentTypes: false,
                  isRooms: false,
                  isListDoctors: false,
                  isReservation: false,
                  isClinic: true,
                  isTermini: false,
                  isVacation: false
              });
            });
            }
            clickRegister = (event) => {
              document.getElementById("logo_img").style.visibility = "hidden"; 
              this.setState({

                isTermini: false,
                isUnapredDef: false,
                isProfile: false,
                isProfileDoctor: false,
                isRegister: true,
                isAppointmentTypes: false,
                isRooms: false,
                isListDoctors: false,
                isReservation: false,
                isListDoctors: false,
                isClinic: false,
                isVacation:false

              });
            }
            clickLogout = () => {
                // obrisi token i korisnika
                this.context.token = null;
                this.context.user = null;
                this.props.history.push({
                  pathname: '/login'
                });             
            }   
            clickReservation = (event) => {
              document.getElementById("logo_img").style.visibility = "hidden"; 
              console.log(this.state.cadmin.clinic);
              const url = 'http://localhost:8081/clinicAdministrator/getTerms/'+this.state.cadmin.clinic;
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
                listTerms: response,
                isReservation: true,
                isListDoctors: false,
                isAppointmentTypes: false,
                isProfile: false,
                isProfileDoctor: false,
                isRegister: false,
                isRooms: false,
                isClinic: false,
                isTermini: false,
                isVacation: false           
              });
              }); 

            }
            clickRooms = (term)=> (event) => { //////ovde
              document.getElementById("logo_img").style.visibility = "hidden"; 
              let klinika = this.context.user.clinic;
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
                console.log("term"+term.start_term);
                this.setState({
                  allRooms: response,
                  listRooms: response,
                  term: term,           
                  isUnapredDef: false,               
                  isListDoctors: false,
                  isAppointmentTypes: false,
                  isProfile: false,
                  isProfileDoctor: false,
                  isRegister: false,
                  isAppointmentTypes: false,
                  isRooms: true,
                  isListDoctors: false,
                  isReservation: true,
                  isClinic: false,
                  isTermini: false,
                  isVacation: false
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
                  isUnapredDef: false,
                  isProfile: false,
                  isProfileDoctor: false,
                  isRegister: false,
                  isAppointmentTypes: true,
                  isRooms: false,
                  isListDoctors: false,
                  isReservation: false,
                  isVacation: false,
                  isClinic: false,
                  isTermini: false           
           
                }); 
            }); 
            }                        
            clickDoctors = (event) => {
              document.getElementById("logo_img").style.visibility = "hidden";
              let clinic = this.context.user.clinic;
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
                  isUnapredDef: false,
                  isProfile: false,
                  isProfileDoctor: false,
                  isRegister: false,
                  isAppointmentTypes: false,
                  isRooms: false,
                  isListDoctors: true,
                  isReservation: false,
                  isClinic: false,
                  isTermini: false,
                  isVacation: false
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
                        isUnapredDef: false,
                        isProfile: false,
                        isProfileDoctor: true,
                        isRegister: false,
                        isAppointmentTypes: false,
                        isRooms: false,
                        isListDoctors: false,
                        isReservation: false,
                        isClinic: false,
                        isTermini: false,
                        isVacation: false
                    }); 
                  });
            }
            clickVacation = (event) => {
              document.getElementById("logo_img").style.visibility = "hidden"; 
              console.log(this.state.cadmin.clinic);
              const url = 'http://localhost:8081/clinicAdministrator/getAllVacation/'+this.state.cadmin.clinic;
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
                listVacation: response,
                isReservation: false,
                isListDoctors: false,
                isAppointmentTypes: false,
                isProfile: false,
                isProfileDoctor: false,
                isRegister: false,
                isRooms: false,
                isClinic: false,
                isTermini: false,
                isVacation: true           
              });
              }); 
            } 
        odobriGodisnji = (id) => (event) => {
          event.preventDefault;
          const url = 'http://localhost:8081/clinicAdministrator/obradiZahtev/'+id+'/'+true+'/'+"null";
          const options = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },
          };
         
          fetch(url, options)         
          .then(responseWrapped => responseWrapped)
          .then(response => {
            if (response.ok) {
              alert("Захтев успешно одобрен.")
              this.clickVacation();
            }
          });
         
        }
        razlogOdbijanja = (id) => (event) => {
          this.setState({
             isRazlog: true,
             idZahteva: id
            });
        }
        odbijGodisnji = (event) => {
          let reason = document.getElementById("rzlg").value;
          if (!reason) {
            alert("Морате унети разлог одбијања.");
          } else { console.log(reason+this.state.idZahteva);
            const url = 'http://localhost:8081/clinicAdministrator/obradiZahtev/'+this.state.idZahteva+'/'+false+'/'+reason;
            const options = {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
              },
            };
          
            fetch(url, options)         
            .then(responseWrapped => responseWrapped)
            .then(response => {
              if (response.ok) {
                alert("Захтев успешно одбијен.")
                this.closeModalHandler()
                this.clickVacation();
              }
            });
         }
        }
    generateTableData(allDoctors,clinic){
      let res=[];
      let tableData = allDoctors;
      console.log("usao"+tableData.length);
      for(var i =0; i < tableData.length; i++){
          res.push(
            <tr>
          <td key={tableData[i].firstName}>{tableData[i].firstName}</td>
          <td key= {tableData[i].lastName}>{tableData[i].lastName}</td>
          <td key={tableData[i].tip}>{tableData[i].tip}</td>
          <td > <button className="btn_pageAdmin_n" 
            onClick={this.clickProfileDoctor(tableData[i].mail)}>Измени</button></td>
          <td > <button className="btn_pageAdmin_n" onClick={this.deleteDoctor(tableData[i].id,clinic)}>Обриши</button></td>
          </tr>
          )
      }
      return res;
    } 
    generateVacation(listVacation){
      let res=[];
      let tableData = listVacation;
      console.log("usao"+tableData.length);
      for(var i =0; i < tableData.length; i++){
        let date1 = new Date(tableData[i].pocetak);
        let date2 =new Date(tableData[i].kraj)
          res.push(
            <tr>
          <td key={tableData[i].firstName}>{tableData[i].firstName}</td>
          <td key= {tableData[i].lastName}>{tableData[i].lastName}</td>
          <td key={date1.toDateString()}>{date1.toDateString()}</td>
          <td key={date2.toDateString()}>{date2.toDateString()}</td>
          <td > <button onClick={this.odobriGodisnji(tableData[i].id)} className="btn_pageAdmin_n">Одобри</button></td>
          <td > <button onClick={this.razlogOdbijanja(tableData[i].id)} className="btn_pageAdmin_n">Одбиј</button></td>
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
    generateTableDataRooms(listRooms,clinic){
      let res=[];
      let tableData = listRooms;
      for(var i =0; i < tableData.length; i++){
          res.push(
            <tr>
          <td key= {tableData[i].number}>{tableData[i].number}</td>
          <td key={tableData[i].name}>{tableData[i].name}</td>          
          <td > <button className="btn_pageAdmin_n" onClick={this.clickIzmenaSale(tableData[i].name,tableData[i].number)}>Измени</button></td>
          <td > <button className="btn_pageAdmin_n" onClick={this.deleteRoom(tableData[i].number,clinic)}>Обриши</button></td>
          <td > <button className="btn_pageAdmin_n" onClick={this.reserveRoom(tableData[i].id)}>Резервиши</button></td>
          </tr>
          )
      }
      return res;
    }    

    // unapred_def
  // ide na false, kada ove ostale stavljam na true (profil, odsustva ...)
  clickUnapredDef = () => {
    document.getElementById("logo_img").style.visibility = "hidden"; 

    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        "Auth-Token": this.context.token,
      }
    };

    //console.log(this.context.user.clinic);

    // administrator ce imati kliniku u kojoj radi (this.context.user.clinic)
    fetch('http://localhost:8081/clinic/getDoctors/'+this.context.user.clinic, options)
        .then(responseWrapped => responseWrapped.json())
        .then(response1 => {
          this.setState({
            listaLekara_ud: response1
          });
          
          fetch('http://localhost:8081/clinic/getRooms/'+this.context.user.clinic, options)
            .then(responseWrapped => responseWrapped.json())
            .then(response2 => {
              this.setState({
                listaSala_ud: response2,
              });

              fetch('http://localhost:8081/term_definition/getAll', options)
                .then(responseWrapped => responseWrapped.json())
                .then(response3 => {
                  this.setState({
                    lista_termina: response3
                  });
                  
                  fetch('http://localhost:8081/type/getAll', options)
                    .then(responseWrapped => responseWrapped.json())
                    .then(response4 => {
                      this.setState({
                        listaTipova_ud: response4,
                        isUnapredDef: true,
                        isProfile: false,
                        isProfileDoctor: false,
                        isRegister: false,
                        isAppointmentTypes: false,
                        isRooms: false,
                        isListDoctors: false,
                        isClinic: false,
                        isVacation: false
                      });       
                  });
        
              });    
          });   
      });
    }

    // unapred_def
  generateOption(listOptions, optionType) {
    let res = [];
    if (listOptions != null) {
      let tableData = listOptions;
      for (var i = 0; i < tableData.length; i++) {
        if(optionType === 'dr'){
              let ime_prezime = tableData[i].firstName + " " + tableData[i].lastName;
              res.push(
                  <option key={tableData[i].id}
                    id={tableData[i].id}
                  >{ime_prezime}</option>
              )
            }
            else if(optionType === 'rooms' || optionType === 'type'){
              res.push(
                <option key={tableData[i].id}
                  id={tableData[i].id}>{tableData[i].name}</option>
              )
            }
            else if(optionType === 'satnica'){
              let od_do = tableData[i].start_term + " " + tableData[i].end_term;
              res.push(
                <option key={tableData[i].id}
                  id={tableData[i].id}>{od_do}</option>
              )
            }
        }
    }
    return res;
  }

  // unapred_def
  changeLekar = () => {
    let e = document.getElementById("a_selectDoctors_predefinedExam"); 
    let id = e.options[e.selectedIndex].id;

    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        "Auth-Token": this.context.token,
      }
    };

    fetch('http://localhost:8081/doctor/getTermsByWorkShift/'+id, options)
      .then(responseWrapped => responseWrapped.json())
      .then(response => {
        this.setState({ listaSatnica_ud: response })
    });
  }

  // unapred_def
  changeTip = () => {
    let e = document.getElementById("a_selectType_predefinedExam"); 
    let id = e.options[e.selectedIndex].id;
    
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        "Auth-Token": this.context.token,
      }
    };

    // POSLATI I KLINIKU U KOJOJ TRAZIM (token od admina)
    fetch('http://localhost:8081/doctor/getDoctorsByType/'+id, options)
      .then(responseWrapped => responseWrapped.json())
      .then(response => {
        this.setState({ listaLekara_ud: response })
    });
  }

  // unapred_def
  sendPredefinedExam = () => {
    let date = document.getElementById("a_date_predefinedExam").value;
    let dat = new Date(date);
    date = dat.getTime();
    let satnica = document.getElementById("a_selectSatnica_predefinedExam");
    let satnica_id = satnica.options[satnica.selectedIndex].id;
    let room = document.getElementById("a_selectRoom_predefinedExam");
    let room_id = room.options[room.selectedIndex].id;
    let type = document.getElementById("a_selectType_predefinedExam");
    let type_id = type.options[type.selectedIndex].id;
    let doctor = document.getElementById("a_selectDoctors_predefinedExam");
    let doctor_id = doctor.options[doctor.selectedIndex].id;
    let price = document.getElementById("a_cena_predefinedExam").value;
    let discount = document.getElementById("a_popust_predefinedExam").value;

    console.log(date + " " +satnica_id + " " +room_id + " " +type_id + " " +doctor_id + " " +
                  price + " " + discount);
    if(this.checkFields()){
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          "Auth-Token": this.context.token,
        }
      };

      let url_params = date + "/" + satnica_id + "/" + room_id + "/" + type_id + "/" + doctor_id + "/" + 
              price + "/" + discount;
  
      fetch('http://localhost:8081/clinicAdministrator/createPredefinedTerm/'+ url_params, options)
        .then(responseWrapped => responseWrapped.json())
        .then(response => {
          console.log(response);
          if(response == -1){       // doktor nije slobodan tada
            alert('Доктор није слободан у том термину.');
          }
          else if(response == -2){   // sala nije slobodna tad
            alert('Сала није слободна у том термину.');
          }
          else if(response == 0){      // sve okej 
            alert('Успешно сте креирали термин.');
          }
      });
    }
    else{
      return;
    }
    
  }

  // unapred_def
  checkFields = () => {
    let date = document.getElementById("a_date_predefinedExam").value;
    let satnica = document.getElementById("a_selectSatnica_predefinedExam").value;
    let room = document.getElementById("a_selectRoom_predefinedExam").value;
    let type = document.getElementById("a_selectType_predefinedExam").value;
    let doctor = document.getElementById("a_selectDoctors_predefinedExam").value;
    let price = document.getElementById("a_cena_predefinedExam").value;
    let discount = document.getElementById("a_popust_predefinedExam").value;
    console.log(date + " " +satnica + " " +room + " " +type + " " +doctor + " " +price + " " + discount);
  
    if(!date){
      alert('Обавезан је унос датума.');
      document.getElementById("a_date_predefinedExam").focus();
      return false;
    }
    else if(!satnica){
      alert('Обавезан је унос сатнице.');
      document.getElementById("a_selectSatnica_predefinedExam").focus();
      return false;
    }
    else if(!price){
      alert('Обавезан је унос цене.');
      document.getElementById("a_cena_predefinedExam").focus();
      return false;
    }
    else if(!Number(price)){
      alert('Цена мора садржати само бројеве.');
      document.getElementById("a_cena_predefinedExam").focus();
      return false;
    }
    else if(!discount){
      alert('Обавезан је унос попуста.');
      document.getElementById("a_popust_predefinedExam").focus();
      return false;
    }
    else if(!Number(discount)){
      alert('Попуст мора садржати само бројеве.');
      document.getElementById("a_popust_predefinedExam").focus();
      return false;
    }

    return true;
  }

  // unapred_def
  validateCenaPopust = () => {
    let price = document.getElementById("a_cena_predefinedExam").value;
    let discount = document.getElementById("a_popust_predefinedExam").value;
    
    if(!Number(price) && price){
      alert('Цена мора садржати само бројеве.');
      document.getElementById("a_cena_predefinedExam").focus();
    }
    else if(!Number(discount) && discount){
      alert('Попуст мора садржати само бројеве.');
      document.getElementById("a_popust_predefinedExam").focus();
    }
  }
  
  clickSatnica = () => {
    let satnica = document.getElementById("a_selectSatnica_predefinedExam").value;
    if(!satnica){
      alert('Потребно је прво изабрати лекара.');
    }
  }
    
    generateTableDataTerms(listTerms){
      let res=[];
      let tableData = listTerms;
      for(var i =0; i < tableData.length; i++){
        console.log(tableData[i].id);
        let vreme = tableData[i].start_term + '-'+tableData[i].end_term;
        let doktor = tableData[i].firstNameDoctor+' '+tableData[i].lastNameDoctor;
        let datum = new Date(tableData[i].date);
          res.push(
            <tr>
          <td key= {datum.toDateString()}>{datum.toDateString()}</td>
          <td key= {vreme}>{vreme}</td>
          <td key={doktor}>{doktor}</td>
          <td > <button className="btn_pageAdmin_n" onClick={this.clickRooms(tableData[i])}>Додели салу</button></td>       
          </tr>
          )
      }
      return res;
    }    
    sendChangedPassword = () => {
      let pass1 = document.getElementById('firstPassword_input1').value;
      let pass2 = document.getElementById('firstPassword_input2').value;
      
      if(pass1.length < 8 || pass2.length < 8){
        alert('Лозинка мора садржати минимално 8 карактера.');
        return;
      }
      if(pass1 !== pass2){
        alert('Поновите исту лозинку у оба поља.');
        return;
      }
  
      const url = 'http://localhost:8081/patient/changePassword/';
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          "Auth-Token": this.context.token
        },
        body: pass1
      };
  
      fetch(url, options)
      .then(response => {
        console.log(response);
        alert("Успешно промењена лозинка.");

        this.setState({
          modalPassword: false
        })
      });
    }
 /*   generateTerms = () => {
      let res = [];
        let listTerms = this.state.roomTermini;
        if (listTerms != null) {
            let tableData = listTerms;
            for (var i = 0; i < tableData.length; i++) {
                let date = tableData[i].date;
                let vreme = tableData[i].start_term +'-'+tableData[i].end_term;
                res.push(
                    <tr>
                        <td key={vreme}>{vreme}</td>
                        <td> <button className="btn_pageAdmin_n" onClick={this.reserveRoom(date,tableData[i].start_term)}> Одабери </button></td>
                    </tr>
                )
            }
        }
        return res;
    }*/
  changePassword = () => {
      this.setState({modalPassword:true})
  }
  closeTermini() {
    this.setState({ isTermini:false})
  }
  render() {
    // unapred_def
    let component_unapredDef = null;
    if(this.state.isUnapredDef){
      component_unapredDef = (
        <PredefinedExam
          send = {this.sendPredefinedExam}
          generateDoctors = {this.generateOption(this.state.listaLekara_ud, 'dr')}
          generateRooms = {this.generateOption(this.state.listaSala_ud, 'rooms')}
          generateTypes = {this.generateOption(this.state.listaTipova_ud, 'type')}
          generateSatnica = {this.generateOption(this.state.listaSatnica_ud, 'satnica')}
          changeTip = {this.changeTip}
          changeLekar = {this.changeLekar}
          validate = {this.validateCenaPopust}
          clickSatnica = {this.clickSatnica}
        />
      );
    }
    
    let modalniSifra = null;
        if(this.state.modalPassword){
          modalniSifra = (
            <Window
            visible={this.state.modalPassword}
            width="370"
            height="250"
            effect="fadeInUp"
            onClickAway={() => this.closeModalHandler()}
         >
            <form className="divModalSale">
            <h4 className="h4Tittle">Измена лозинке</h4>
            <div ><p>Унесите нову вредност лозинке:</p>
            <input type="password"
              className="inputIzmena"
              id="firstPassword_input1"
              ></input>
            <p>Потврдите нову вредност лозинке:</p>
            <input type="password"
              className="inputIzmena"
              id="firstPassword_input2"></input>
            <button className="btnModalIzmena" onClick={this.sendChangedPassword}>Сачувај</button>
            </div>
          </form>
            </Window>
          );
        }

    let modalniIzmena = null;
    if (this.state.modalIzmena) {  //modalni dijalog za izmenu profila 
      modalniIzmena = (
        <Window
          visible={this.state.modalIzmena}
          width="370"
          height="250"
          effect="fadeInUp"
          onClickAway={() => this.closeModalHandler()}
       >
         
          <form className="divModalSale">
            <h4 className="h4Tittle">{this.state.headerText}</h4>
            <div ><p>Стара вредност:</p>
            <input type="text"
              className="inputIzmena"
              value={this.state.staraVrednost}
              disabled></input>
            <p>Нова вредност:</p>
            <input type="text"
              className="inputIzmena"
              id="newValue_input"></input>
            <button className="btnModalIzmena" onClick={this.sendChangeHandler}>Сачувај</button>
            </div>
          </form>
        </Window>);

    }
    let modalniIzmenaKlinike = null;
    if (this.state.modalIzmenaKlinike) {  //modalni dijalog za izmenu profila klinike
      modalniIzmenaKlinike = (
        <Window
          visible={this.state.modalIzmenaKlinike}
          width="370"
          height="250"
          effect="fadeInUp"
          onClickAway={() => this.closeModalHandler()}
       >
         
          <form className="divModalSale">
            <h4 className="h4Tittle">{this.state.headerText}</h4>
            <div ><p>Стара вредност:</p>
            <input type="text"
              className="inputIzmena"
              value={this.state.staraVrednost}
              disabled></input>
            <p>Нова вредност:</p>
            <input type="text"
              className="inputIzmena"
              id="newValue_input"></input>
            <button className="btnModalIzmena" onClick={this.sendChangeClinicHandler}>Сачувај</button>
            </div>
          </form>
        </Window>);

    }
    let modalniIzmenaTipa = null;
    if (this.state.modalIzmenaTipa) {  //modalni dijalog za izmenu tipa
      modalniIzmenaTipa = (
        <Window
          visible={this.state.modalIzmenaTipa}
          width="370"
          height="250"
          effect="fadeInUp"
          onClickAway={() => this.closeModalHandler()}
       >
         
          <form className="divModalSale">
            <h4 className="h4Tittle">{this.state.headerText}</h4>
            <div ><p>Стара вредност:</p>
            <input type="text"
              className="inputIzmena"
              value={this.state.staraVrednost}
              disabled></input>
            <p>Нова вредност:</p>
            <input type="text"
              className="inputIzmena"
              id="newValue_input"></input>
            <button className="btnModalIzmena" onClick={this.sendChangeTypeHandler}>Сачувај</button>
            </div>
          </form>
        </Window>);

    }
    let modalniIzmenaDoktora = null;   
    if (this.state.modalIzmenaDoktora) {  //modalni dijalog za izmenu profila doktora
      modalniIzmenaDoktora = (
        <Window
          visible={this.state.modalIzmenaDoktora}
          width="370"
          height="250"
          effect="fadeInUp"
          onClickAway={() => this.closeModalHandler()}
       >
         
          <form className="divModalSale">
            <h4 className="h4Tittle">{this.state.headerText}</h4>
            <div ><p>Стара вредност:</p>
            <input type="text"
              className="inputIzmena"
              value={this.state.staraVrednost}
              disabled></input>
            <p>Нова вредност:</p>
            <input type="text"
              className="inputIzmena"
              id="newValue_input"></input>
            <button className="btnModalIzmena" onClick={this.sendChangeDoctorHandler}>Сачувај</button>
            </div>
          </form>
        </Window>);

    }  
    let modalniIzmenaSale = null;   
    if (this.state.modalIzmenaSale) {  //modalni dijalog za izmenu profila doktora
      modalniIzmenaSale = (
        <Window
          visible={this.state.modalIzmenaSale}
          width="370"
          height="250"
          effect="fadeInUp"
          onClickAway={() => this.setState({modalIzmenaSale : false})}
       >
         
          <form className="divModalSale">
            <h4 className="h4Tittle">{this.state.headerText}</h4>
            <div ><p>Стара вредност:</p>
            <input type="text"
              className="inputIzmena"
              value={this.state.staraVrednost[0]}
              disabled></input>
            <p>Нова вредност:</p>
            <input type="text"
              className="inputIzmena"
              id="newValue_input"></input>
            <button className="btnModalIzmena" onClick={this.sendChangeRoomHandler}>Сачувај</button>
            </div>
          </form>
        </Window>);

    }
    let componentDoctors = null;
    if(this.state.isListDoctors){
        componentDoctors = (
            <DoctorList
              findDoctor={this.findDoctor(this.state.allDoctors)}
              generateTableData = {this.generateTableData(this.state.listDoctors,this.context.user.clinic)}
              clickRegister = {this.clickRegister}
              changeHandler = {this.changeHandler}
            >
            </DoctorList>
        )
    }
    let types = null; ///////ovde i dole i gore
    if(this.state.isAppointmentTypes){
       types = (
           <AppointmentType
              findType={this.findType}
              addType = {this.addType}
              changeHandler = {this.changeHandler}
              generateTableDataTypes = {this.generateTableDataTypes(this.state.listTypes)}
            >
            </AppointmentType>
       )
    }
    let vacation = null;
    if(this.state.isVacation){
       vacation = (
           <VacationRequests       
              generateVacation = {this.generateVacation(this.state.listVacation)}
            >
            </VacationRequests>
       )
    }
    let razlog = null;
    if(this.state.isRazlog){
       razlog = (
           <Window
           visible={this.state.isRazlog}
           width="370"
           height="200"
           effect="fadeInUp"
           onClickAway={() => this.closeModalHandler()}
        >        
           <form className="divModalSale">
             <h4 className="h4Tittle">Разлог одбијања:</h4>
            
             <input type="text"
               className="inputIzmena"
               id="rzlg"
               ></input>
             <button className="btnModalIzmena" onClick={this.odbijGodisnji}>Пошаљи</button>
            
           </form>
             
            </Window>
       )
    }
    let rooms = null;
    if(this.state.isRooms){
       rooms = (
        <Window 
        className="modalSale"
        visible={this.state.isRooms}
        width="600"
        height="560"
        effect="fadeInUp"
        onClickAway={() => this.closeModalHandler()}
    >
        <div>
            <RoomList
              findRoom={this.findRoom(this.state.allRooms)}
              addRoom = {this.addRoom(this.context.user.clinic)}
              changeHandler = {this.changeHandler}
              closeModalHandler = {this.closeModalHandler}
              generateTableDataRooms = {this.generateTableDataRooms(this.state.listRooms,this.state.cadmin.clinic)}
            >
            </RoomList>
        </div>
        {modalniIzmenaSale}
    </Window>
       )
    }
    let reservation = null;
    if(this.state.isReservation){
       reservation = (
           <ReserveList
              clickRooms = {this.clickRooms}
              generateTableDataTerms = {this.generateTableDataTerms(this.state.listTerms)}
              >
            </ReserveList>
       )
    }
    let registerIS = null;
    if(this.state.isRegister){
        registerIS = (
          <RegisterMedical
              pat={this.context.user}
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
    let termini = null;
    if(this.state.isTermini){
        termini = (
            <Window 
                visible={this.state.isTermini}
                width="450"
                height="560"
                effect="fadeInUp"
                onClickAway={() => this.closeTermini()}
            >
                <div className="divModalSale">
                    <h4 className="h4Tittle">Резервиши термин</h4>    
                    <table className="New_sale_list">
                        <thead>
                            <tr >
                                <th>Термин</th>
                                <th>Потврда</th>
                            </tr>
                        </thead>
                        <tbody className="tbody_pageAdmin_n">
                            {this.generateTerms(this.state.roomTermini)}
                        </tbody>
                    </table>
                </div>
            </Window>
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
          onClick={this.clickReservation}> Резервисање сала </a></li>
          <li className="li_list"><a 
          id="termini"
          onClick={this.clickUnapredDef}> Дефиниши термине прегледа </a></li> 
          <li className="li_list"><a 
          id="profile" 
          onClick={this.clickVacation}> Захтеви за одсуство </a></li>       
          <li className="li_list"><a 
            id="logout"
            onClick={this.clickLogout}> Одјави се </a></li>
        </ul>
        

        {registerIS}
        <ProfileAdmin
          admin={this.context.user}
          show = {this.state.isProfile} 
          clickIzmena={this.clickIzmena}
          clickZabrana={this.clickZabrana}
          clickSifra={this.changePassword}
          >
        </ProfileAdmin>
        
        <ClinicProfile
          clinic={this.state.clinic}
          show = {this.state.isClinic} 
          clickIzmena={this.clickIzmenaKlinike}
          clickZabrana={this.clickZabrana}
          >
        </ClinicProfile>
        {modalniSifra}
        {modalniIzmena}
        {modalniIzmenaKlinike}
        {modalniIzmenaTipa}
        {modalniIzmenaDoktora}
        {componentDoctors}
        {types}
        {rooms}
        {profileDoc}
        {component_unapredDef}
        {reservation}
        {termini}
        {vacation}
        {razlog}
        </div>
      );
    }
}


export default PageAdmin;