import React, { Component } from 'react';
import RoomList from './RoomList';
import Window from 'react-awesome-modal';
import ModalAwesome from 'react-awesome-modal';

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
          modalDodelaLekara: false
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
        temp = <button onClick={this.clickAllDoctors.bind(this,tableData[i])}>Dodeli lekara</button>
      }
     
        res.push(
          <tr>
             <td key= {datum.toDateString()}>{datum.toDateString()}</td>
             <td key= {vreme}>{vreme}</td>
             <td key={doktor}>{doktor}</td>
             <td key={doktor+vreme}><button onClick={this.clickRooms.bind(this,tableData[i])}>Dodeli salu</button></td> 
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
            if (response.ok){
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




    clickIzmenaSale = (name,number) => (event) => {
      event.preventDefault();
      this.setState({
        modalIzmenaSale: true
      });
       this.setState({changedValue: 'naziv'});
       this.setState({headerText: "Измена назива сале"});
       this.setState({staraVrednost: [name,number]});
  
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
            alert("Poslati mejlovi.");
          }
          else{
            alert("Nisu poslati mejlovi.");
          }
         });
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



   render(){
    
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
              addRoom = {this.addRoom(this.state.clinic)}
              changeHandler = {this.changeHandler}
              closeModalHandler = {this.closeModalHandler}
              generateTableDataRooms = {this.generateTableDataRooms(this.state.listRooms,this.props.clinic)}
            >
            </RoomList>
        </div>
        {modalniIzmenaSale}
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
            <button id="btnPrikaziZahteve" onClick={this.getTerminiPregleda}>Прикажи захтеве за прегледе</button>
         </td>
         <td>
            <button id="btnPrikaziZahteve" onClick={this.getTerminiOperacija}>Прикажи захтеве за операције</button>
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
    </div>
    );
  }
}
export default ReserveList;