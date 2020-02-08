import React, { Component } from 'react';
import './MedicalPage.css'
import Modal from "../Modal"
import MedicalRecord from './MedicalRecord';
import MedicalReviewEntry from './MedicalReviewEntry';
import ModalAwesome from 'react-awesome-modal'
import MedicalHistory from './MedicalHistory';
import MedicalReview from './MedicalReview';
import MedicalReviewChange from './MedicalReviewChange';
import { differenceInCalendarWeeksWithOptions } from 'date-fns/esm/fp';
import MedicalRecipe from './MedicalRecipe';
import MedicalReserve from './MedicalReserve';



class MedicalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient_mail: this.props.location.state.detail,
      doctor_id: this.props.location.state.id_doctor,
      isZdravstveniKarton: false,
      isIstorijaBolesti: false,
      isUnosIzvestaja: false,
      isUnosRecepta: false,
      isZakazi: false,
      prikaziKarton: false,
      prikaziIzvestaj: false,
      izmeniIzvestaj: false,
      isDiagnosis: false, //za modalni dijalog gde filtriram dijagnoze
      list_diagnosis: null, //lista dijagnoza za izbor
      isCures: false, //za modalni dijalog gde vrsim izbor lekova
      list_cures: null,   //lista svih lekova
      list_therapy: [], //lista izabranih lekova
      list_reviews: null, //lista izvestaja-istorija bolesti

      medical_record: null,
      medical_review:null,
      diagnosis : null, //izabrana dijagnoza pri unosu izvestaja
      therapy: null,    //izabrana terapija pri unosu izvestaja
      firstName: null,
      lastName: null,
      doctor : null,
      patient : null,
      modalDialog: false,
      staraVrednost: '',
      changedValue: '',
      headerText: ''

    };
    this.clickInit();
  }

  
  clickInit = (event) =>{
    const url = 'http://localhost:8081/doctor/getDoctorById/' + this.state.doctor_id;
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
        let temp = response;
        this.setState({
          doctor : temp
        });
        this.clickInitPatient();
     });
   }


   clickInitPatient = (event) =>{
    let mail = this.state.patient_mail;
    const url = 'http://localhost:8081/medicalrecord/getNamePatient/' + mail;
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
        let temp = response;
        this.setState({
             firstName : temp.firstName,
             lastName : temp.lastName,
             patient : temp
        });
     });

   }



  

  ClickZdravstveniKarton = (event) => {
    console.log("klik na karton");
    document.getElementById("logo_img").style.visibility = "hidden";
    this.setState({
      isZdravstveniKarton: true,
      isIstorijaBolesti: false,
      isUnosIzvestaja: false,
      isUnosRecepta: false,
      isZakazi: false,
      isDiagnosis: false, //prikaz dijaloga u okviru kog biram dijagnozu
      prikaziIzvestaj: false,
      izmeniIzvestaj: false
    });
    let mail = this.state.patient_mail;
    const url = 'http://localhost:8081/medicalrecord/getNamePatient/' + mail;
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
        let temp = response;
        this.setState({
             firstName : temp.firstName,
             lastName : temp.lastName,
             patient : temp
        });
        this.preuzmiKarton();
     });
     

  }

  preuzmiKarton = () => {
    console.log("USLA SAM U PREUZIMANJE KARTONA");
    let mail = this.state.patient_mail;
    const url = 'http://localhost:8081/medicalrecord/getRecord/' + mail;
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
        this.setState({
          medical_record: response,
          isZdravstveniKarton: true,
          isIstorijaBolesti: false,
          isUnosIzvestaja: false,
          isUnosRecepta: false,
          isZakazi: false,
        });
        console.log("ovde sam");
        console.log(this.state.medical_record);
        //tek kada je karton preuzet moze se prikazati
        this.setState({
          prikaziKarton: true
        });

      });
  }


  clickIzmena = (naziv, staraVr) => {
    console.log(naziv);
    this.setState({
      modalDialog: true
    });
    this.setState({ changedValue: naziv });

    if (naziv === 'height') {
      this.setState({ headerText: "Измена висине" });
      this.setState({ staraVrednost: this.state.medical_record.height });
    }
    else if (naziv === 'weight') {
      this.setState({ headerText: "Измена тежине" });
      this.setState({ staraVrednost: this.state.medical_record.weight });
    }
    else if (naziv === 'dioptreRightEye') {
      this.setState({ headerText: "Измена диоптрије-десно око" });
      this.setState({ staraVrednost: this.state.medical_record.dioptreRightEye });
    }
    else if (naziv === 'dioptreLeftEye') {
      this.setState({ headerText: "Измена диоптрије-лево око" });
      this.setState({ staraVrednost: this.state.medical_record.dioptreLeftEye });
    }
    else if (naziv === 'bloodGroup') {
      this.setState({ headerText: "Измена крвне групе" });
      this.setState({ staraVrednost: this.state.medical_record.bloodGroup });
    }
    else if (naziv === 'allergy') {
      this.setState({ headerText: "Измeнa алергија" });
      this.setState({ staraVrednost: this.state.medical_record.allergy });
    }
    else {
      console.log('грешка измена');
    }
  }


  clickZabrana = (polje) => {
    console.log(polje);
    if (polje === 'mail') {
      alert('Није могуће мењати вредност поља е-поште.');
    }
    if (polje === 'firstName') {
      alert('Није могуће изменити име пацијента');
    }
    if (polje === 'lastName') {
      alert('Није могуће изменити презиме пацијента');
    }
  }

  closeModalDialog = () => {
    this.setState({
      modalDialog: false
    });
  }


  sendChangeHandler = () => { //izmena info u okviru kartona
    this.setState({
      modalDialog: false
    });
    let newValue = document.getElementById("newValue_input").value;
    let changedName = this.state.changedValue;

    const sve_ok = this.promenaState(changedName, newValue);
    if (!sve_ok) {
      return;
    }

    let email = this.state.patient_mail;
    //saljemo azuriran karton na back da te promene sacuvamo u bazi
    const url = 'http://localhost:8081/medicalrecord/changeRecord/' + changedName + "/" + newValue + "/" + email;
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
        if (response.ok === true) {
          alert("Успешно сте изменили поље '" + changedName + "'.");
        }
        else {
          alert("Дошло је до грешке приликом измене поља '" + changedName + "'.");
        }
      });

  }


  promenaState = (nazivAtributa, novaVrednost) => {
    console.log("promena stanja");
    //kopija kartona
    const medical_record = {
      ...this.state.medical_record
    };
    if (nazivAtributa === 'height') {
      medical_record.height = novaVrednost;
    } else if (nazivAtributa === "weight") {
      medical_record.weight = novaVrednost;
    } else if (nazivAtributa === "dioptreRightEye") {
      medical_record.dioptreRightEye = novaVrednost;
    } else if (nazivAtributa === "dioptreLeftEye") {
      medical_record.dioptreLeftEye = novaVrednost;
    } else if (nazivAtributa === "bloodGroup") {
      medical_record.bloodGroup = novaVrednost;
    } else if (nazivAtributa === "allergy") {
      medical_record.allergy = novaVrednost;
    }
    // update-uj state
    this.setState({ medical_record: medical_record });
    return true;
  }


  clickUnosIzvestaja = (event) => {
    console.log("klik na unos izvestaja");
    document.getElementById("logo_img").style.visibility = "hidden";
    this.setState({
      isZdravstveniKarton: false,
      isIstorijaBolesti: false,
      isUnosIzvestaja: true,
      isUnosRecepta: false,
      isZakazi: false,
      prikaziKarton: false,
      prikaziIzvestaj: false,
      izmeniIzvestaj: false
    });
    //preuzimam dijagnoze sa becka
    const url = 'http://localhost:8081/ccadmin/diagnosis';
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
        if (response.length > 0) {
          this.setState({
            list_diagnosis: response
          });
        }
      });
     
  }

  //cuvam u bazi uneti izvestaj
  clickSaveEntry = (event) => {
    event.preventDefault();
    console.log("kliknuto na save");
    //preuzeti podatke sa forme i posalti na beck
    //za slanje na beck potrebni su mi jos mejl pacijenta i id doctora
    let datum = document.getElementById("enterDatumJ").value;
    if(!datum){
      alert('Обавезан је унос датумa.');
      return;
    }
    let dat = new Date(datum);
    let Datum = dat.getTime();
    let MedicalResults = document.getElementById("enterNalazJ").value;
    let Diagnosis = document.getElementById("enterDiagnosisJ").value;
    let Therapy = document.getElementById("enterTerapijaJ").value;
    let mail = this.state.patient_mail;
    let doctor_id = this.state.doctor_id; //ovo postaviti dinamicki

    this.setState({
       diagnosis : Diagnosis,
       therapy: Therapy
    });

    let temp = {  //objekat koji saljemo na beck
      date: Datum,
      medicalResults: MedicalResults,
      diagnosis: Diagnosis,
      therapy: Therapy,
      patient_mail: mail,
      id_doctor: doctor_id
    }

    console.log(temp);
     

    const url = 'http://localhost:8081/medicalreview/save_review';
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(temp)
    };
    fetch(url, options)
      .then(response => {
        console.log(response.status);
        if (response.status == 201) {
          alert("Izvestaj je sacuvan!")
        } else {
          alert("Greska pri cuvanju!");
        }
      });

  }

  closeIsDiagnosis = () => {   //za zatvaranje modalnog
    this.setState({
      isDiagnosis: false
    });
  }

  clickDiagnosisEntry = () => {   //za modalni diagnosis dijalog
    this.setState({
      isDiagnosis: true
    });
    
  }

  change = () => {              //promena input polja za naziv dijagnoze--->filtriranje
    console.log("nestooo");
    let naziv = document.getElementById("filter_diagnosis_nameJ").value;
    if (!naziv) {
      naziv = "~";
    }
    console.log(naziv);
    //preuzimam isfiltrirane dijagnoze sa becka
    const url = 'http://localhost:8081/ccadmin/diagnosisByName/'+ naziv;
    console.log(url);
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
          this.setState({
            list_diagnosis: response
          });
      });
  }


  generateTableOfDiagnosis= () => {
    console.log("usao u generisanje");
    console.log("DIAGNOZEEEEEE"+this.state.list_diagnosis);
    let res = [];
    let tableData = this.state.list_diagnosis; //listu iz state preuzmi
    console.log("TABLE"+tableData);
    if (tableData != null) {
      for (var i = 0; i < tableData.length; i++) {
        res.push(
          <tr>
            <td key={tableData[i].diagnosis_name} >{tableData[i].diagnosis_name}</td>
            <td key={tableData[i].diagnosis_password} >{tableData[i].diagnosis_password}</td>
          </tr>
        )
      }

     //preuzimanje indexa selectovanog reda tabele
     var selectedRows = document.getElementById('table_diagJ'),rIndex;
     console.log(selectedRows);
     if(selectedRows!=null){
         console.log(selectedRows);
         for(var i=0; i<selectedRows.rows.length; i++){
          selectedRows.rows[i].onclick = function(){
           rIndex = this.rowIndex;
           console.log(rIndex);
           document.getElementById("filter_diagnosis_nameJ").value = this.cells[0].innerHTML;
         }
        }
      }
    }
    return res;
  }

   //kada izaberemo dijagnozu
   selectDiagnosis = (event) => {
       event.preventDefault();
       let diagnosisName = document.getElementById("filter_diagnosis_nameJ").value;
       //alert(diagnosisName);
       this.closeIsDiagnosis();
       document.getElementById("enterDiagnosisJ").value = diagnosisName;
       //sa becka uzimam lekove kojima se leci dijagnoza
       const url = 'http://localhost:8081/ccadmin/curesByDiagnosis/'+ diagnosisName;
       console.log(url);
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
           if (response.length > 0) {
             this.setState({
               list_cures: response
             });
           }
         });

   }

   closeIsCures = () => {   //za zatvaranje modalnog
    this.setState({
      isCures: false
    });
  }

  clickCuresEntry = () => {   //za modalni cures dijalog
    this.setState({
      isCures: true
    });
    
  }

   //generisemo tabelu gde je moguce cekirati zeljene lekove
   generateTableOfCures = () => {
      console.log("usao u generisanje");
      console.log("LEKOVIIIII"+this.state.list_cures);
      let res = [];
      let tableData = this.state.list_cures; //listu iz state preuzmi
      console.log("TABLE"+tableData);
      if (tableData != null) {
        for (var i = 0; i < tableData.length; i++) {  
           let therapyItem = tableData[i].cure_name + "," + tableData[i].cure_password;                 
           res.push(
             <tr>
                <td key={tableData[i].cure_name} >{tableData[i].cure_name}</td>
                <td key={tableData[i].cure_password} >{tableData[i].cure_password}</td>
                <td><input type="radio" name={therapyItem} onChange={this.onCheckChange}/></td>
             </tr>
           )
         }
      } 
     return res;
   }

   //CHECKBOX IN REACT
   onCheckChange = (e) => {
     // alert(e.target.name);
     //preuzete targete ubaci u listu list_therapy 
     let listSelectedCures = this.state.list_therapy;
     listSelectedCures.push(e.target.name);
     this.setState({list_therapy:listSelectedCures});     
   }

   //kada se potvrdi izbor lekova, prebacujem lekove u textaera izvestaja
   chooseSelected = () => {
     let listSelectedCures = this.state.list_therapy;
     document.getElementById("enterTerapijaJ").value = listSelectedCures;
     this.closeIsCures();
      
   }   


  clickIstorijaBolesti = (event) => {
    //izvuci sa beka sve izvestaje koji su u kartonu i prikazati u tabeli
    console.log("klik na istoriju bolesti");
    document.getElementById("logo_img").style.visibility = "hidden";
    this.setState({
      isZdravstveniKarton: false,
      isIstorijaBolesti: true,
      isUnosIzvestaja: false,
      isUnosRecepta: false,
      isZakazi: false,
      prikaziKarton: false,
      prikaziIzvestaj: false,
      izmeniIzvestaj: false
    });

     let mail = this.state.patient_mail;
     let doctor_id = this.state.doctor_id;  //ovo treba dinamicki
     const url = 'http://localhost:8081/medicalrecord/getReviewsinRecord/'+ mail + "/" + doctor_id;
     console.log(url);
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
         if (response.length > 0) {
           this.setState({
             list_reviews: response
           });
         }
       });

  }
  
  //sa beka preuzimam izvestaj sa prosledjenim idijem i smestam ga u list_reviews
  getMedicalReview = (number) =>{
    console.log("HEREEE"+number);
    const url = 'http://localhost:8081/medicalreview/getReview/'+ number;
    console.log(url);
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
        if (response!=null) {
          console.log("OVDE");
          this.setState({
             medical_review : response
          });
        }
        this.setState({
          prikaziIzvestaj : true,
          isIstorijaBolesti : false
        });
       
      });

  }


  //u okviru istorije pregleda izabran je neki izvestaj i sada treba da ga prikazem
  //na formi imam skriveno polje u koje upisujem id izabranog izvestaja
  clickShowReview = (event) => {
      event.preventDefault();
      console.log("CLICK SHOW REVIEW");
      let reviewId = document.getElementById("medicalHistoryReviewJ").value;
      this.getMedicalReview(reviewId);
  }

  
  //na osnovu id izvestaja uzimam ga sa beka kako bi ga mogla menjati
   clickChangeReview = (event) =>{
       event.preventDefault();
       console.log("CLICK CHANGE REVIEW");
       let reviewId = document.getElementById("medicalHistoryReviewJ").value;
       const url = 'http://localhost:8081/medicalreview/getReview/'+ reviewId;
       console.log(url);
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
           if (response!=null) {
             console.log("OVDE");
             this.setState({
                medical_review : response
             });
           }
           this.setState({
             izmeniIzvestaj : true,
             isIstorijaBolesti : false
           });
          
         });       

   }

   
  

  clickUnosRecepta = (event) => {
     console.log("klik na unos recepta bolesti");
     document.getElementById("logo_img").style.visibility = "hidden";
     let diagnosis = this.state.diagnosis;
     let therapy = this.state.therapy;
     if(diagnosis===null){
       alert("Mora se prvo popuniti izvestaj");
       return;
     }
     if(therapy===null){
      alert("Mora se prvo popuniti izvestaj");
      return;
     }

     this.setState({
        isZdravstveniKarton: false,
        isIstorijaBolesti: false,
        isUnosIzvestaja: false,
        isUnosRecepta: true,
        isZakazi: false,
        prikaziKarton: false,
        prikaziIzvestaj: false,
        izmeniIzvestaj: false
      });

  }


  ClickDoctorPage = (event) =>{
    console.log("click doctor page");
    const url = 'http://localhost:8081/doctor/getDoctorById/' + this.state.doctor_id;
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
        let temp = response;
        this.props.history.push({
          pathname: '/pagedoctor',
          state: { detail: temp }               
        })
     });
  }


  ClickZakazi = (event) => {
      console.log("klik na zakazi");
      document.getElementById("logo_img").style.visibility = "hidden";
      this.setState({
        isZdravstveniKarton: false,
        isIstorijaBolesti: false,
        isUnosIzvestaja: false,
        isUnosRecepta: false,
        isZakazi: true,
        prikaziKarton: false,
        prikaziIzvestaj: false,
        izmeniIzvestaj: false
      });
    } 



  render() {
    let zdravstveniKarton = null;         //komponenta koja prikazuje zdrav.karton pacijenta
    if (this.state.prikaziKarton === true) {
      zdravstveniKarton = (
        <MedicalRecord
          pat={this.state.medical_record}
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          mail={this.state.patient_mail}
          show={this.state.prikaziKarton}
          clickIzmena={this.clickIzmena}
          clickZabrana={this.clickZabrana}>
        </MedicalRecord>
      );
    }


    let modalniUnosIzmenaKartona = null;
    if (this.state.modalDialog) {  //modalni dijalog za unos ili izmenu kartona pacijenta 
      modalniUnosIzmenaKartona = (
        <Modal
          className="modal"
          show={this.state.modalDialog}
          close={(event) => this.closeModalDialog(event)}
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


    let unosIzvestaja = null;                //komponenta za unos izvestaja lekara o pregledu
    if (this.state.isUnosIzvestaja === true) {
      unosIzvestaja = (
        <MedicalReviewEntry
          show={this.state.isUnosIzvestaja}
          clickSaveEntry={this.clickSaveEntry}
          diagnosis={""}
          clickDiagnosisEntry={this.clickDiagnosisEntry}
          clickCuresEntry={this.clickCuresEntry}
        >
        </MedicalReviewEntry>
      );
    }


    let DiagnosisModal = null;    //modalni diag za filtriranje diagnoza
    if (this.state.isDiagnosis) {
      DiagnosisModal = (
        <ModalAwesome
          visible={this.state.isDiagnosis}
          width="450"
          height="460"
          effect="fadeInUp"
          onClickAway={() => this.closeIsDiagnosis()}
        >
          <div>
            <div className="filterDiagnosisHeaderJ">
              <h3>Избор дијагнозе</h3>
            </div>
            <div className="filterDiagnosisJ">
                <form className="tableDiagnosisJ">
                <table id="table_diagOriginalJ">
                  <tr>
                     <td>Назив дијагнозе:</td>
                     <td>
                         <input type="text" placeholder="Унесите..."
                            id="filter_diagnosis_nameJ"
                            onSelect={this.change}
                            autoFocus></input>
                     </td>
                     <td>
                       <button onClick={this.selectDiagnosis}>Izaberi</button>
                     </td>
                   </tr>
                </table>
                </form>
              <form className="bodySearchDiagnosisJ">
                <table id="table_diagJ">
                  <thead>
                    <th>Назив дијагнозе</th>
                    <th>Шифра дијагнозе</th>
                  </thead>
                  <tbody>
                    {this.generateTableOfDiagnosis()}
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </ModalAwesome>
      );
    }

    let CuresModal = null;  //modalni dijalog za odabir lekova
    if(this.state.isCures){
        CuresModal = (
          <ModalAwesome
            visible={this.state.isCures}
            width="450"
            height="460"
            effect="fadeInUp"
            onClickAway={() => this.closeIsCures()}
          >
             <div>
                 <div className="filterDiagnosisHeaderJ">
                    <h3>Избор лекова за терапију</h3>
                 </div>
                 <div className="filterDiagnosisJ">
                   <form className="bodySearchDiagnosisJ">
                     <table id="table_curesJ">
                       <thead>
                         <th>Назив лека</th>
                         <th>Шифра лека</th>
                         <th><button onClick={this.chooseSelected}>Потврди избор</button></th>
                       </thead>
                       <tbody>
                         {this.generateTableOfCures()}
                       </tbody>
                     </table>
                   </form>
                 </div>
             </div>
          </ModalAwesome>      
        );
    }
   
    let HistoryPage = null;               //komponenta u okviru koje prikazujem izvestaje iz kartona pacijenta
    if(this.state.isIstorijaBolesti){
       //console.log("history page klik");
       //console.log(this.state.list_reviews);
       HistoryPage = (
         <MedicalHistory
            show={this.state.isIstorijaBolesti}
            list_reviews = {this.state.list_reviews}
            clickShowReview = {this.clickShowReview}
            clickChangeReview = {this.clickChangeReview}
         >
         </MedicalHistory>
       );
    }

    let PrikazanIzvestaj = null;         //prikazujem izvestaj samo za GLEDANJEE
    if(this.state.prikaziIzvestaj){
      //console.log("prikazujem izvestaj");
      //console.log(this.state.medical_review);
      let d = new Date(this.state.medical_review.date);
      let dateForm = d.toDateString();
      PrikazanIzvestaj = (
        <MedicalReview
           show={this.state.prikaziIzvestaj}
           reviewData={this.state.medical_review}
           dateForm={dateForm}
        >
        </MedicalReview>
      );
    }

    let IzmenjenIzvestaj = null;
    if(this.state.izmeniIzvestaj){
      let d = new Date(this.state.medical_review.date);
      let dateForm = d.toDateString();
     // alert(dateForm);
      IzmenjenIzvestaj = (
        <MedicalReviewChange
           show={this.state.izmeniIzvestaj}
           reviewData={this.state.medical_review}
           clickDiagnosisEntry={this.clickDiagnosisEntry}
           clickCuresEntry={this.clickCuresEntry}
           dateForm={dateForm}
        >

        </MedicalReviewChange>
      );
    }

    let UnosRecepta = null;              //OVAJ DEO POPRAVIIIIII
    if(this.state.isUnosRecepta){
      let temp = this.state.therapy;
      let therapy = temp.split(",");
      UnosRecepta = (
        <MedicalRecipe
           show = {this.state.isUnosRecepta}
           sifraDijagnoze = {this.state.diagnosis}
           nazivLeka = {therapy[0]}
           sifraLeka = {therapy[1]}
           doctor_id = {this.state.doctor_id}
        >
        </MedicalRecipe>
      );
    }

    let ZakaziPreglede = null;
    if(this.state.isZakazi){
       ZakaziPreglede = (
           <MedicalReserve
              doctor = {this.state.doctor}
              patient = {this.state.patient}
           >
           </MedicalReserve>
       );
    }

    return (
      <div className="main_divJmedicalRecord">
        <ul id="unordered_list" className="ul_listJmedicalRecord ">
          <li className="li_listJmedicalRecord"><a
            id="id_zdravstveniKartonJ"
            onClick={this.ClickZdravstveniKarton}> Здравствени картон </a></li>
          <li className="li_listJmedicalRecord"><a
            id="id_istorijaBolestiJ"
            onClick={this.clickIstorijaBolesti}> Историја болести </a></li>
          <li className="li_listJmedicalRecord"><a
            id="id_unosIzvestajaJ"
            onClick={this.clickUnosIzvestaja}> Унос извештаја </a></li>
          <li className="li_listJmedicalRecord"><a
            id="id_unosReceptaJ"
            onClick={this.clickUnosRecepta}> Унос рецепта </a></li>
          <li className="li_listJmedicalRecord"><a
            id="id_zakaziJ"
            onClick={this.ClickZakazi}> Закажи </a></li>
           <li className="li_listJmedicalRecord"><a
            id="id_doctorPageJ"
            onClick={this.ClickDoctorPage}> Moja почетна </a></li>
        </ul>


        {zdravstveniKarton}
        {modalniUnosIzmenaKartona}
        {unosIzvestaja}
        {DiagnosisModal}
        {CuresModal}
        {HistoryPage}
        {PrikazanIzvestaj}
        {IzmenjenIzvestaj}
        {UnosRecepta}
        {ZakaziPreglede}

      </div>
    );
  }

}

export default MedicalPage;