import React, { Component } from 'react';
import Rooms from './Rooms';
import Window from 'react-awesome-modal';
import ModalAwesome from 'react-awesome-modal';
import Calendar from './Calendar'

class ReserveList extends Component{
  
   constructor(props){
      super(props);
      this.state = {
          list_terms : [],             // lista pregleda ili operacija koje prikazujem
          pregled_operacija : null ,   // da li u pitanju pregled ili operacija
          allRooms : null,
          listRooms : null,
          reservedRoom : false,        //info da li je soba zauzeta
          term : null,                 //izabrani termin
          isRooms : false,             //vidljivost dijaloga za rezervisanje
          modalIzmenaSale: false,      //vidljivost dijaloga za izmenu info o sali
          headerText: '',
          staraVrednost: '',
          changedValue: '',
          allDoctors: null,           //svi slobodni lekari 
          selectedDoctors: [],       //izabrani lekari
          modalDodelaLekara: false,
          listaKalendar: null,
          prikaziKalendar: false,
          listRoomTerms:null,
      };
   }

   
   //preuzmi termine PREGLEDA iz baze
   getTerminiPregleda = () => {
    const url = 'http://localhost:8081/clinicAdministrator/getTerms/' + this.props.clinic;
    console.log(this.props.clinic);
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
        let temp = response;
        this.setState({
            list_terms : temp,
            pregled_operacija : "pregled",
            isRooms : false,
            reservedRoom : false
        });
     });

   } 

   

   //preuzimam termine OPERACIJA iz baze
   getTerminiOperacija = () => {
    const url = 'http://localhost:8081/clinicAdministrator/getTermsOperation/' + this.props.clinic;
    console.log(this.props.clinic);
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
        let temp = response;
        this.setState({
            list_terms : temp,
            pregled_operacija : "operacija",
            isRooms : false,
            reservedRoom : false
        });
     });

   } 



   //generisem tabelu zahteva
   generateTableDataTerms(){
    let res=[];
    let tableData = this.state.list_terms;
    for(var i =0; i < tableData.length; i++){
      console.log(tableData[i].id);
      let vreme = tableData[i].start_term + '-'+tableData[i].end_term;
      let doktor = tableData[i].firstNameDoctor+' '+tableData[i].lastNameDoctor;
      let datum = new Date(tableData[i].date);
      let exam = tableData[i].examination;
      console.log(exam);
      let temp = "";
      if(exam === false){    //dugme iscrtavam samo ako imam listu zahteva za operaciju
        temp = <button  className="btn_pageAdmin_n" onClick={this.clickAllDoctors.bind(this,tableData[i])}>Dodeli lekara</button>
      }
     
        res.push(
          <tr>
             <td key= {datum.toDateString()}>{datum.toDateString()}</td>
             <td key= {vreme}>{vreme}</td>
             <td key={doktor}>{doktor}</td>
             <td key={doktor+vreme}><button className="btn_pageAdmin_n" onClick={this.clickRooms.bind(this,tableData[i])}>Dodeli salu</button></td> 
             <td key={vreme+doktor}>{temp}</td>          
          </tr>
        )
    }
    return res;
  }   


  
  clickAllDoctors = (term) => {
     console.log("klik na doktore");
     document.getElementById("logo_img").style.visibility = "hidden"; 
     const url = 'http://localhost:8081/doctor/getFreeDoctors/' + this.props.clinic +"/" +term.id;
     console.log(this.props.clinic);
     console.log(term.id);
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
        let temp = response;
        this.setState({
            allDoctors : temp,
            modalDodelaLekara : true,
            term : term
        });
     });

  }
  

    closeDodela = () => {   //za zatvaranje modalnog
      this.setState({
        modalDodelaLekara: false
      });
    }


    //generisemo tabelu gde je moguce cekirati zeljene lekare
    generateTableOfDoctors = () => {
      console.log("usao u generisanje");
      console.log("LEKARI"+this.state.allDoctors);
      let res = [];
      let tableData = this.state.allDoctors; //listu iz state preuzmi
      console.log("TABLE"+tableData);
      if (tableData != null) {
        for (var i = 0; i < tableData.length; i++) {  
          let doctorItem = tableData[i].firstName + " " + tableData[i].lastName; 
          let doctorId = tableData[i].mail;  
          let ime_prez = "novi lekar";
          if(tableData[i].firstName != null){
            ime_prez = doctorItem;
          }             
          res.push(
            <tr>
                <td key={doctorItem} >{ime_prez}</td>
                <td key={tableData[i].rating} >{tableData[i].rating}</td>
                <td><input type="checkbox" name={doctorId} onChange={this.onCheckChange}/></td>
            </tr>
          )
        }
      } 
    return res;
  }
    
     //kada kliknem na checkbox
     onCheckChange = (e) =>{
      console.log("hereeee");
      console.log(e.target.name);
      var list_Doctors = this.state.selectedDoctors;
      list_Doctors.push(e.target.name);
      this.setState({selectedDoctors : list_Doctors});
     }



      //kada se potvrdi izbor lekara
      chooseSelected = () => {
          this.closeDodela();
          console.log("IZABRANOOO:");
          console.log(this.state.selectedDoctors);
          //sada to saljem na beck i kreiram za svakog izabranog lekara termin
          let doctors = this.state.selectedDoctors;
          let id_term = this.state.term.id;
          const url = 'http://localhost:8081/doctor/createTermOperation/'+id_term;
          const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(doctors)
        };

        fetch(url, options)
        .then(responseWrapped => responseWrapped.json())
        .then(response => {
            if (response === 0){
              alert("Sacuvano");
              this.getTerminiOperacija();
            }
        });

      }   




  ///pretraga sobe 3.16
  clickRooms = (term) => {       //izvlacim sve sobe u clinici, ne gledam termin
    console.log("ovde sam");
    document.getElementById("logo_img").style.visibility = "hidden"; 
    const url = 'http://localhost:8081/room/getByClinic/'+this.props.clinic;
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
        isRooms: true,
        term : term
      }); 
    });

  }  


 
  //zatvaranje modalnog za pretragu sala
  closeModalHandler = () => {
    this.setState({
      isRooms: false,
    });
  }


  //za modalni dijalog pretrage sala
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
  }
 


    //za modalni pretrage sala
    changeHandler = (event) => {
      let nam = event.target.name;
      let val = event.target.value;
      let err = '';
      this.setState({errormessage: err});
      this.setState({[nam]: val});
    }

    
    generateTableDataRooms(listRooms,clinic){
      let res=[];
      let tableData = listRooms;
      for(var i =0; i < tableData.length; i++){
        let date = new Date(tableData[i].first_free_date)
          res.push(
            <tr>
          <td key= {tableData[i].number}>{tableData[i].number}</td>
          <td key={tableData[i].name}>{tableData[i].name}</td>     
          <td className="pointerStyle" onClick={this.showCalendar(tableData[i].name)} key={date.toDateString()}>{date.toDateString()}</td>        
          <td > <button className="btn_pageAdmin_n" onClick={this.reserveRoom(tableData[i].id)}>Резервиши</button></td>
          </tr>
          )
      }
      return res;
    }    

    showCalendar = (name) => (event) => {
      console.log(name);
      const url = 'http://localhost:8081/room/getTerms/' + name;
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
            console.log("uzeo listu termina"+response[0].start_term);
            this.setState({
               listRoomTerms: response,
          }); 
            this.parseTerm();
         });
 }

 parseTerm = (event) =>{
    let forChangeList = this.state.listRoomTerms;
    let changedList = []; //sredjena lista termina za kalendar
    for (var i = 0; i < forChangeList.length; i++){
       var d = new Date(forChangeList[i].date);
       var d1= d.toLocaleDateString();
       var res = d1.split("/");  //1,8,2020
       var id = forChangeList[i].id; //id dogadjaja
       var datum = res[2]+","+res[1]+ "," + res[0]+",";
       var startTime = datum+forChangeList[i].start_term;
       var endTime = datum+forChangeList[i].end_term;
       var tempObject={
         id : id,
         startTime : startTime,
         endTime : endTime,
       }
       changedList.push(tempObject);
    }
    console.log(changedList);
    this.setState({
      listaKalendar: changedList,
      prikaziKalendar: true,
    });
 }
 closeCalendar() {
  this.setState({
    prikaziKalendar: false
  });
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
      this.setState({
        reservedRoom : idr
      });
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
            if(this.state.pregled_operacija == "pregled"){
              this.getTerminiPregleda();
            }else{
              
            }
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
            
          }
          else{
            alert("Nisu poslati mejlovi.");
          }
         });
      }
  

   render(){
    let kalendar = null;
    if (this.state.prikaziKalendar) {  //modalni dijalog za izmenu profila 
      kalendar = (
        <Window
          visible={this.state.prikaziKalendar}
          width="650"
          height="400"
          effect="fadeInUp"
          onClickAway={() => this.closeCalendar()}
       > <div>
         <Calendar
            listTerm = {this.state.listaKalendar}
         >
         </Calendar>
          </div>
        </Window>);

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
            <Rooms
              findRoom={this.findRoom(this.state.allRooms)}
              changeHandler = {this.changeHandler}
              generateTableDataRooms = {this.generateTableDataRooms(this.state.listRooms,this.props.clinic)}
            >
            </Rooms>
        </div>
    </Window>
       )
    }


    let DoktorModal = null;  //modalni dijalog za doktora
    if(this.state.modalDodelaLekara){
        DoktorModal = (
          <ModalAwesome
            visible={this.state.modalDodelaLekara}
            width="450"
            height="460"
            effect="fadeInUp"
            onClickAway={() => this.closeDodela()}
          >
             <div>
                 <div className="filterDiagnosisHeaderJK">
                    <h3>Избор додатних лекара</h3>
                 </div>
                 <div className="filterDiagnosisJK">
                   <form className="bodySearchDiagnosisJK">
                     <table id="table_curesJK">
                       <thead>
                         <th>Име и презиме</th>
                         <th>Просечна оцена</th>
                         <th><button onClick={this.chooseSelected}>Потврди избор</button></th>
                       </thead>
                       <tbody>
                             {this.generateTableOfDoctors()}
                       </tbody>
                     </table>
                   </form>
                 </div>
             </div>
          </ModalAwesome>      
        );
    }


    
    return(
    <div className="divProfileAdmine">
      <table>
      <td>
            <button id="btnPrikaziZahteve" onClick={this.props.clickRooms}>Сале</button>
         </td>
         <td>
            <button id="btnPrikaziZahtev" onClick={this.getTerminiPregleda}>Прикажи захтеве за прегледе</button>
         </td>
         <td>
            <button id="btnPrikaziZahtev" onClick={this.getTerminiOperacija}>Прикажи захтеве за операције</button>
         </td>
      </table>
     <table className="New_room_list">
      <thead>
        <tr>
          <th>ДАТУМ</th>
          <th>ВРЕМЕ</th>
          <th>ДОКТОР</th>
        </tr>
      </thead>
      <tbody className="tbody_pageAdmin_n">
         {this.generateTableDataTerms()}
      </tbody>
    </table>
         {rooms}
         {DoktorModal}
         {kalendar}
    </div>
    );
  }
}
export default ReserveList;