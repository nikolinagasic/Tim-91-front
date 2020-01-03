import React, { Component } from 'react'
import DoctorComponent from './DoctorComponent'
import Modal from 'react-awesome-modal'
import './DoctorModal.css'

class DoctorSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            lista_lekara_original: props.lista_doktora,
            lista_lekara: props.lista_doktora,
            lista_termina: null,
            isTermini: false,
            date: this.props.date,           // datum pregleda
            choosedDoctor: null, 
            idChoosedDoctor: null
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
                        onClick={this.reserveTerm.bind(this, this.state.idChoosedDoctor, date, start)}>
                        Резервиши</button></td>
                    </tr>
                )
            }
        }
        return res;
    }

    reserveTerm = (id_doctor, date, start_term) => {
        console.log(id_doctor + " " + date + " " + start_term);
        alert('Termin uspesno rezervisan');


        this.closeIsTermini();
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
                        <h3>Доктор: {this.state.choosedDoctor}</h3> 
                        <h4>Датум: {datum}</h4>
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

        return(
            <div>
                <DoctorComponent
                    generateTable={this.generateTableData(this.state.lista_lekara)}
                    back={this.props.backToClinics}
                    change={this.change}
                    changeFilter={this.changeFilter}
                />
                {showTerm}
            </div>
        );
    }
}

export default DoctorSearch;