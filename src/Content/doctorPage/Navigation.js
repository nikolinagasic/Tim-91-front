import React, { Component } from 'react';
import {UserContext} from '../../UserProvider'
import Radium from 'radium'
import PatientProfile from './PatientProfile'
import Window from 'react-awesome-modal'
import ScheduleDoctors from './ScheduleDoctors';
import { Thumbnail } from 'react-bootstrap';

class Navigation extends Component {
    static contextType = UserContext;     // instanciram context

    constructor(props) {
        super(props);
        this.state = {
          doctor: props.doctor,
          patient: props.patient,
          isProfilePatient: true,
          isScheduleAppointment: false,
          isDetailTerm: false,
          isTermini: false,

          reservationDetail: null,
          isSurgery: false,
          date: null,
          lista_termina: null,
          listDoctors: null,
          allDoctors: null,
          listTypes: null,
          list_box: null,
          idIzabranogLekara: null
        };
        this.getTypes();

      }

    clickPatientProfile = (event) => {
        this.setState({
            isProfilePatient: true,
            isScheduleAppointment: false,
            isDetailTerm: false
        });
    }

     
    clickStartMedicalExamintaion = (event) =>{
        this.setState({
            isProfilePatient: false,
            isScheduleAppointment: false,
            isDetailTerm: false
        });
        this.props.history.push({
            pathname: '/medicalPage',
            state: { detail: this.props.patient.mail,
                     id_doctor : this.props.doctor.id }
         });
    }


    clickScheduleAppointment = (event) => {
        let clinic = this.state.doctor.clinic;
        console.log("klinika:"+clinic);
        const url = 'http://localhost:8081/doctor/getDoctors/'+clinic;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                "Auth-Token": this.context.token
            },
        };

        fetch(url, options)
        .then(responseWrapped => responseWrapped.json())
        .then(response => {
  
        this.setState({
            listDoctors: response,
            allDoctors: response,
            isScheduleAppointment: true,
            isSurgery: false,
            isDetailTerm: false,
            isProfilePatient: false
        });
      });  

    }
    clickScheduleSurgery = (event) => {
        this.setState({
            isScheduleAppointment: true,
            isSurgery: true,
            isDetailTerm: false,
            isProfilePatient: false

        });
    }
    clickIzaberiLekara =(id) => (event)=> {

        this.setState({
            isTermini: true,
            isDetailTerm: false,
            idIzabranogLekara: id
        });
    }
    spisakTermina = (event) => {
        let text = document.getElementById("idDateScheduleAppointment").value;
        let datum = new Date(text); 
        let date = datum.getTime();
        let id = this.state.idIzabranogLekara;
        const url = 'http://localhost:8081/doctor/getTermini/'+id+"/"+date;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                "Auth-Token": this.context.token
            },
        };

        fetch(url, options)
        .then(responseWrapped => responseWrapped.json())
        .then(response => {
  
            this.setState({
                lista_termina: response,
                isTermini: true,
                isDetailTerm: false
            });
        });      
    }

    reserveTerm = (date,start_term) => (event) => {
        event.preventDefault;
        console.log("token:"+this.context.token);
        const url = 'http://localhost:8081/doctor/detailTermin/'+
                            this.state.idIzabranogLekara+"/"+date+"/"+start_term; //dodati da pamti i pacijenta
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                "Auth-Token": this.context.token
            },
        };

        fetch(url, options)
        .then(responseWrapped => responseWrapped.json())
        .then(response => {
            console.log(response);
            this.setState({
                reservationDetail: response,
                isDetailTerm: true
            });
        });
    }
    sendReserveTerm = () => { ////uvek rezervise
        console.log('usao u rezervaciju termina');

        const url = 'http://localhost:8081/doctor/reserveTerm';
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                "Auth-Token": this.context.token
            },
            body: JSON.stringify(this.state.reservationDetail)
        };

        fetch(url, options)
        .then(response => {
            console.log(response);
            if(response){
                // zatvori sve dijaloge
                this.closeTermini();
                this.closeDetailTerm(); 
                alert('Uspesno ste rezervisali termin.');
            }
            else{
                alert('Termin nije rezervisan, neko je pre Vas to uradio.');
            }
        });
    }

    filterDoctors = (allDoctors) => (event) => {
        let tip = document.getElementById("hidden_id").value;
        
        console.log("filter:"+tip);
        const url = 'http://localhost:8081/doctor/filterByType/'+tip;
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
                isScheduleAppointment: true
            });
        });
      
    }

    getTypes = () => {
        const url = 'http://localhost:8081/type/getAll';
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
            if(response!=null){
              this.setState({
                listTypes: response   
              });
            }
    
          
    
          let res = [];
          let listData = this.state.listTypes; //listu iz state preuzmi
          if (listData != null) {
            for (var i = 0; i < listData.length; i++) {
              var name = listData[i].name;
              var ident = listData[i].id;
               res.push(
                 {value:name,id:ident}
               )
            }
          }
          this.setState(
            {list_box:res}
          );
          });
        
      }

    generateTerms() {
        console.log('usao u list terms')
        console.log(this.state.lista_termina);
        let res = [];
        let listTerms = this.state.lista_termina;
        if (listTerms != null) {
            let tableData = listTerms;
            for (var i = 0; i < tableData.length; i++) {
                let date = tableData[i].date;
                let vreme = tableData[i].start_term +'-'+tableData[i].end_term;
                res.push(
                    <tr>
                        <td key={vreme}>{vreme}</td>
                        <td> <button className="btn_pageAdmin_n" onClick={this.reserveTerm(date,tableData[i].start_term)}> Одабери </button></td>
                    </tr>
                )
            }
        }
        return res;
    }

    generateDoctors(listDoctors){
        let res=[];
        let tableData = listDoctors;
        console.log("usao"+tableData.length);
        for(var i =0; i < tableData.length; i++){
            res.push(
              <tr>
            <td key={tableData[i].firstName}>{tableData[i].firstName}</td>
            <td key= {tableData[i].lastName}>{tableData[i].lastName}</td>
            <td key={tableData[i].tip}>{tableData[i].tip}</td>
            <td > <button onClick={this.clickIzaberiLekara(tableData[i].id)} className="btn_pageAdmin_n">Изабери</button></td>
            </tr>
            )
        }
        return res;
      } 

    closeScheduleAppointment = (event) => {
        this.setState({
            isScheduleAppointment: false
        });
    }
    closeTermini = (event) => {
        this.setState({
            isTermini: false
        });
    }
    closeDetailTerm = (event) => {
        this.setState({
            isDetailTerm: false
        });
    }

render() {
    let profilePatient = null;
        if (this.state.isProfilePatient) {
        profilePatient = (
          <PatientProfile
          pat={this.state.patient}
          show = {this.state.isProfilePatient}         
          >
        </PatientProfile>
        );
    }
    let schedule = null;
    if (this.state.isScheduleAppointment) {
    schedule = (
      <ScheduleDoctors
      filterDoctors = {this.filterDoctors(this.state.allDoctors)}
      generateTableData  = {this.generateDoctors(this.state.listDoctors)}
      show = {this.state.isScheduleAppointment}  
      list_box = {this.state.list_box}       
      >
    </ScheduleDoctors>
    );
}

    let showDate = null;
    if(this.state.isTermini){
        showDate = (
            <Window 
                visible={this.state.isTermini}
                width="450"
                height="560"
                effect="fadeInUp"
                onClickAway={() => this.closeTermini()}
            >
                <div className="divModalSale">
                    <h4 className="h4Tittle">Закажи преглед</h4>
                    <table className="formSearchDate">
                        <td>
                        <p >Датум:</p>
                        </td>
                        <td>
                        <input className="dateSale" type="date"
                            min="2019-12-20" max="2020-02-12"
                            id="idDateScheduleAppointment"
                            disableDays=""
                            onChange={this.spisakTermina}></input>
                        </td>
                    </table>

                    <table className="New_sale_list">
                        <thead>
                            <tr >
                                <th>Термин</th>
                                <th>Потврда</th>
                            </tr>
                        </thead>
                        <tbody className="tbody_pageAdmin_n">
                            {this.generateTerms(this.state.lista_termina)}
                        </tbody>
                    </table>
                </div>
            </Window>
        );
    }
    let showDetailTerm = null;
    console.log("prozor"+this.state.isDetailTerm);
        if(this.state.isDetailTerm){
            let doctorFirstLastName = 'др ' + this.state.reservationDetail.firstNameDoctor + ' ' +
               this.state.reservationDetail.lastNameDoctor;
            
            let d = new Date(this.state.reservationDetail.date);
            let dateReservedTerm = d.toDateString();
            
            let satnica = this.state.reservationDetail.start_term + " - " + 
                    this.state.reservationDetail.end_term;

            showDetailTerm = (
                <Window
                    visible={this.state.isDetailTerm}
                    width="400"
                    height="407"
                    effect="fadeInDown"
                    onClickAway={() => this.closeDetailTerm()}
                >
                <div className="headerDetailModal_terms">
                    <h3>Потврда резервације</h3>
                </div>
                
                <div className="bodyDetailModal_terms">
                    <h2>{doctorFirstLastName}</h2>
                    <h3>-{this.state.reservationDetail.type}-</h3>
                    
                    <div id="datum_vreme_reserveTerm">
                        <h3><u>Датум:</u> {dateReservedTerm}</h3>
                        <h3><u>Време:</u> {satnica}</h3>
                    </div>
                    <div id="cena_popust_reserveTerm">
                        <h3 className="inlinePrice_h3_tag">
                            <u>Цена:</u> {this.state.reservationDetail.price} рсд</h3>
                        <h3 className="inlinePrice_h3_tag">
                            <u>Попуст:</u> {this.state.reservationDetail.discount}%</h3>
                    </div>
                </div>

                <div className="footerDetailModal_terms">
                    <button className="detailModal_btn-cancel" 
                      onClick={this.closeDetailTerm}>Одустани</button>
                    <button className="detailModal_btn-continue" onClick = {this.sendReserveTerm}
                        >Резервиши</button>
                </div>
                </Window>
            );
        }
  return (
    <table className="divProfileAdmine">
        <td>
           {profilePatient}
           {showDate}
           {showDetailTerm}
           {schedule}
        </td>


      <td id="marginNavigation"> 
            <table>
                <tr>
                 <button onClick={this.clickPatientProfile} id="btnProfileDoc">Профил</button>
                </tr>
                <tr>
                 <button id="btnProfileDoc">Здравствени картон</button>
                </tr>
                <tr>
                  <button onClick={this.clickStartMedicalExamintaion} id="btnProfileDoc">Започни преглед</button>
                </tr>
                <tr>
                  <button onClick={this.clickScheduleAppointment} id="btnProfileDoc">Закажи нови преглед</button>
                </tr>
               <tr>
                  <button onClick={this.clickScheduleSurgery} id="btnProfileDoc">Закажи операцију</button>
                </tr>
              </table>
        </td>
        
        </table>
        
  );
        }
}

export default Radium(Navigation);