import React, { Component } from 'react';
import './MedicalPage.css'
import Modal from "../Modal"
import MedicalRecord from './MedicalRecord';
import MedicalReviewEntry from './MedicalReviewEntry';


class MedicalPage extends Component{
   constructor(props) {
       super(props);
       this.state = {
          patient_mail : this.props.location.state.detail,
          isZdravstveniKarton : false,
          isIstorijaBolesti : false,
          isUnosIzvestaja : false,
          isUnosRecepta : false,
          isZakazi : false,
          prikaziKarton : false,

          medical_record : null,
          firstName : "jeka",
          lastName : "lepasi",
          modalDialog : false,
          staraVrednost: '',
          changedValue: '',
          headerText: ''

       };      
   }

   //VIDETI STA SA IMENOM I PREZIMENOM PACIJENTA-->traziti ih sa becka na osnovu mejla

   ClickZdravstveniKarton = (event) => {
        console.log("klik na karton");
        document.getElementById("logo_img").style.visibility = "hidden";
           this.setState({
             isZdravstveniKarton : true,
             isIstorijaBolesti : false,
             isUnosIzvestaja : false,
             isUnosRecepta : false,
             isZakazi : false,
          });  
       this.preuzmiKarton();  
   }

   preuzmiKarton = () =>{
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
             isZdravstveniKarton : true,
             isIstorijaBolesti : false,
             isUnosIzvestaja : false,
             isUnosRecepta : false,
             isZakazi : false,
          });
          console.log("ovde sam");
          console.log(this.state.medical_record);
          //tek kada je karton preuzet moze se prikazati
          this.setState({
             prikaziKarton : true
          });
          
      });   
   }


   clickIzmena = (naziv, staraVr) => {
      console.log(naziv);
      this.setState({
          modalDialog: true
      });
      this.setState({changedValue: naziv});
  
      if(naziv === 'height'){
        this.setState({headerText: "Измена висине"});
        this.setState({staraVrednost: this.state.medical_record.height});
      }
      else if(naziv === 'weight'){
        this.setState({headerText: "Измена тежине"});
        this.setState({staraVrednost: this.state.medical_record.weight});
      }
      else if(naziv === 'dioptreRightEye'){
         this.setState({headerText: "Измена диоптрије-десно око"});
         this.setState({staraVrednost: this.state.medical_record.dioptreRightEye});
       }
       else if(naziv === 'dioptreLeftEye'){
         this.setState({headerText: "Измена диоптрије-лево око"});
         this.setState({staraVrednost: this.state.medical_record.dioptreLeftEye});
       }
       else if(naziv === 'bloodGroup'){
         this.setState({headerText: "Измена крвне групе"});
         this.setState({staraVrednost: this.state.medical_record.bloodGroup});
       }
       else if(naziv === 'allergy'){
         this.setState({headerText: "Измeнa алергија"});
         this.setState({staraVrednost: this.state.medical_record.allergy});
       }
      else{
        console.log('грешка измена');
      }
   }


   clickZabrana = (polje) => {
      console.log(polje);
      if(polje === 'mail'){
        alert('Није могуће мењати вредност поља е-поште.');
      }
      if(polje === 'firstName'){
         alert('Није могуће изменити име пацијента');
      }
      if(polje === 'lastName'){
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
      if(!sve_ok){
        return;
      }
  
      let email = this.state.patient_mail;
      //saljemo azuriran karton na back da te promene sacuvamo u bazi
      const url = 'http://localhost:8081/medicalrecord/changeRecord/'+changedName+"/"+newValue+"/"+email;
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
       //kopija kartona
       const medical_record = {
         ...this.state.medical_record
       };
       if(nazivAtributa === 'height'){
        medical_record.height = novaVrednost;
      }else if(nazivAtributa === "weight"){
        medical_record.weight = novaVrednost;
      }else if(nazivAtributa === "dioptreRightEye"){
         medical_record.dioptreRightEye = novaVrednost;
      }else if(nazivAtributa === "dioptreLeftEye"){
         medical_record.dioptreLeftEye = novaVrednost;
      }else if(nazivAtributa === "bloodGroup"){
         medical_record.bloodGroup = novaVrednost;
      }else if(nazivAtributa === "allergy"){
         medical_record.allergy = novaVrednost;
      }
       // update-uj state
      this.setState({medical_record : medical_record});
      return true;
    }


   clickUnosIzvestaja = (event) => {
    console.log("klik na unos izvestaja");
    document.getElementById("logo_img").style.visibility = "hidden";
       this.setState({
         isZdravstveniKarton : false,
         isIstorijaBolesti : false,
         isUnosIzvestaja : true,
         isUnosRecepta : false,
         isZakazi : false,
         prikaziKarton : false
      });  
   }

   clickSaveEntry = () => {
     console.log("kliknuto na save");
     //preuzeti podatke sa forme i posalti na beck
     //za slanje na beck potrebni su mi jos mejl pacijenta i id doctora
     
   }






   clickIstorijaBolesti = (event) => {
      alert("Radi se");
   }
  

   clickUnosRecepta = (event) => {
      alert("Radi se");
   }



   ClickZakazi = (event) => {
      alert("Radi se");
   }


   
   render(){
      let zdravstveniKarton = null;
      if(this.state.prikaziKarton===true){
         zdravstveniKarton=(
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
      

       let unosIzvestaja = null;
       if(this.state.isUnosIzvestaja===true){
         unosIzvestaja = (
           <MedicalReviewEntry
              show={this.state.isUnosIzvestaja}
              clickSaveEntry={this.clickSaveEntry}
           >
           </MedicalReviewEntry>
         );
       }

       return(
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
               </ul>

               
               {zdravstveniKarton}
               {modalniUnosIzmenaKartona}
               {unosIzvestaja}
               
          </div>
       );
   }

}

export default MedicalPage;