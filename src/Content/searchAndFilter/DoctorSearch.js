import React, { Component } from 'react'
import DoctorComponent from './DoctorComponent'
import Modal from 'react-awesome-modal'
import './DoctorModal.css'
import {UserContext} from '../../UserProvider'

class DoctorSearch extends Component {
    static contextType = UserContext; 

    constructor(props){
        super(props);
        this.state = {
            lista_lekara_original: props.lista_doktora,
            lista_lekara: props.lista_doktora,
            lista_termina: null,
            date: this.props.date,           // datum pregleda
            choosedDoctor: null, 
            idChoosedDoctor: null,
            reservationDetail:null,     // objekat koji ima sve detalje rezervacije (DoctorTermDTO)   
            
            isTermini: false,           // prikaz modalnog sa svim slobodnim terminima
            isDetailTerm: false         // prikaz detalja o terminu   
        }
    }

    generateTableData(listDoctors) {
        let res = [];
        if (listDoctors != null) {
            let tableData = listDoctors;
            for (var i = 0; i < tableData.length; i++) {
                let name = tableData[i].firstName;
                let l_name = tableData[i].lastName;
                let id_doctor = tableData[i].id;
                res.push(
                    <tr>
                        <td key={tableData[i].firstName}>{tableData[i].firstName}</td>
                        <td key={tableData[i].lastName}>{tableData[i].lastName}</td>
                        <td key={tableData[i].rating}>{tableData[i].rating}</td>
                        <td><button className="pogledaj_search_doctor" 
                            onClick={this.clickPogledaj.bind(this, name, l_name, id_doctor)}
                            >Погледај</button></td>
                    </tr>
                )
            }
        }
        return res;
    }

    generateTerms = (listTerms) => {
        console.log('usao u list terms')
        console.log(listTerms);
        let res = [];
        if (listTerms != null) {
            let tableData = listTerms;
            for (var i = 0; i < tableData.length; i++) {
                let date = tableData[i].date;
                let start = tableData[i].start_term;
                let end = tableData[i].end_term;

                let start_end = start + " - " + end;
                res.push(
                    <tr>
                        <td key={start}>{start_end}</td>
                        <td key={end}>
                        <button 
                        onClick={this.reserveTerm.bind(this, this.state.idChoosedDoctor, date, start)}
                        > Одабери </button></td>
                    </tr>
                )
            }
        }
        return res;
    }

    reserveTerm = (id_doctor, date, start_term) => {
        console.log(id_doctor + " " + date + " " + start_term);
        console.log('token: ' + this.context.token);
        
        const url = 'http://localhost:8081/doctor/detailTermin/'+
                            id_doctor+"/"+date+"/"+start_term;
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
            this.closeIsTermini();
            this.setState({
                reservationDetail: response,
                isTermini: false,
                isDetailTerm: true
            });
        });
    }

    clickPogledaj = (ime, prezime, id) => {
        let doctorName = ime + " " + prezime;
        console.log(doctorName + " " + this.state.date);
        
        const url = 'http://localhost:8081/doctor/getTermini/'+id+"/"+this.state.date;
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
                choosedDoctor: doctorName, 
                idChoosedDoctor: id,
                isTermini: true
            });
        });      
    }

    change = () => {
        let ime = document.getElementById("headerSearchDoctorFirstName").value;
        let prezime = document.getElementById("headerSearchDoctorLastName").value;
        let ocena = document.getElementById("headerSearchDoctorOcena").value;
        
        if(ocena){
            if(ocena > 10 || ocena < 1){
                return;
            }
            if(!Number(ocena)){
                return;
            }
        }
        if(!ime){
            ime = "~";
        }
        if(!prezime){
            prezime = "~";
        }
        if(!ocena){
            ocena = -1;
        }
        

        const url = 'http://localhost:8081/doctor/searchDoctors/'+ime+"/"+prezime+"/"+ocena;
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                "Auth-Token": this.context.token
            },
            body: JSON.stringify(this.state.lista_lekara_original)
        };

        fetch(url, options)
        .then(responseWrapped => responseWrapped.json())
        .then(response => {
            this.setState({
                lista_lekara: response
            });
        });        
    }

    changeFilter = () => {
        let ocenaOd = document.getElementById("filter_doctor_ocenaOd").value;
        let ocenaDo = document.getElementById("filter_doctor_ocenaDo").value;
        console.log(ocenaOd + "-" + ocenaDo);

        if(!ocenaOd){
            ocenaOd = "min";
        }if(!ocenaDo){
            ocenaDo = "max";
        }

        const url = 'http://localhost:8081/doctor/getFilterDoctor/'+ocenaOd+"/"+ocenaDo;
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                "Auth-Token": this.context.token
            },
            body: JSON.stringify(this.state.lista_lekara_original)
        };

        fetch(url, options)
        .then(responseWrapped => responseWrapped.json())
        .then(response => {
            this.setState({
                lista_lekara: response
            });
        });
    }

    closeIsTermini = () => {
        this.setState({
            isTermini: false
        });
    }

    closeIsDetailTerm = () => {
        this.setState({
            isTermini: true,
            isDetailTerm: false
        });
    }

    closeAllTermsDialog = () => {
        this.setState({
            isTermini: false,
            isDetailTerm: false
        });
    }

    // slanje rezervacije za termin
    sendReserveTerm = () => {
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
                this.closeAllTermsDialog(); 
                alert('Uspesno ste rezervisali termin.');
            }
            else{
                alert('Termin nije rezervisan, neko je pre Vas to uradio.');
            }
        });
    }

    render(){
        let showTerm = null;
        let d = new Date(this.state.date);
        let datum = d.toDateString();
        if(this.state.isTermini){
            showTerm = (
                <Modal 
                    visible={this.state.isTermini}
                    width="450"
                    height="560"
                    effect="fadeInUp"
                    onClickAway={() => this.closeIsTermini()}
                >
                    <div className="headerModal_terms">
                        <h3><u>Доктор:</u> {this.state.choosedDoctor}</h3> 
                        <h4><u>Датум:</u> {datum}</h4>
                    </div>
                    <div className="bodyModal_terms">
                        <table>
                            <thead>
                                <tr id="theadModal_terms">
                                    <th>Термин</th>
                                    <th>Потврда</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.generateTerms(this.state.lista_termina)}
                            </tbody>
                        </table>
                    </div>
                </Modal>
            );
        }

        let showDetailTerm = null;
        if(this.state.isDetailTerm){
            let doctorFirstLastName = 'др ' + this.state.reservationDetail.firstNameDoctor + ' ' +
               this.state.reservationDetail.lastNameDoctor;
            
            let d = new Date(this.state.reservationDetail.date);
            let dateReservedTerm = d.toDateString();
            
            let satnica = this.state.reservationDetail.start_term + " - " + 
                    this.state.reservationDetail.end_term;

            showDetailTerm = (
                <Modal
                    visible={this.state.isDetailTerm}
                    width="400"
                    height="407"
                    effect="fadeInDown"
                    onClickAway={() => this.closeIsDetailTerm()}
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
                        onClick={this.closeIsDetailTerm}
                        >Одустани</button>
                    <button className="detailModal_btn-continue" 
                        onClick={this.sendReserveTerm}
                        >Резервиши</button>
                </div>
                </Modal>
            );
        }
        
        return(
            <div>
                <DoctorComponent
                    generateTable={this.generateTableData(this.state.lista_lekara)}
                    back={this.props.backToClinics}
                    change={this.change}
                    changeFilter={this.changeFilter}
                />
                {showTerm}
                {showDetailTerm}
            </div>
        );
    }
}

export default DoctorSearch;