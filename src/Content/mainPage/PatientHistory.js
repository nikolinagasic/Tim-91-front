import React from 'react'
import {UserContext} from '../../UserProvider'
import PatientHistoryComponent from './PatientHistoryComponent'
import Modal from 'react-awesome-modal'
import './PatientHistory.css'

class PatientHistory extends React.Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            lista_klinika: this.props.klinike,
            lista_doktora: this.props.doktori,

            isOceniDoktor: false,
            isOceniKliniku: false,
            oceni_clinic: null,
            oceni_doctor: null
        };
    }

    // TODO po 4 celije u svaki red
    generateTable = (listObjects, type) => {
        let res = [];
        if (listObjects != null) {
            let tableData = listObjects;
            let rowData = [];
            for (var i = 0; i < tableData.length; i++) {
                if(type === 'kl'){
                    let clinic = tableData[i];
                    let rating = tableData[i].rating;
                    rating = this.roundToTwo(rating);
                    res.push(
                        <tr>
                            <td key={tableData[i].name}>{tableData[i].name}</td>
                            <td key={tableData[i].address}>{tableData[i].address}</td>
                            <td key={tableData[i].location}>{tableData[i].location}</td>
                            <td key={tableData[i].rating}>{rating}</td>
                            <td key={tableData[i].id}>
                                <button  className="a_rezervisi_unapredDef"  
                                    onClick={this.clickOceni.bind(this, clinic)}>Оцени</button>
                            </td>
                        </tr>
                    )
                }
                
                else if(type === 'dr'){
                    let doctor = tableData[i];
                    res.push(
                        <tr>
                            <td key={tableData[i].firstName}>{tableData[i].firstName}</td>
                            <td key={tableData[i].lastName}>{tableData[i].lastName}</td>
                            <td key={tableData[i].tip}>{tableData[i].tip}</td>
                            <td key={tableData[i].clinic}>{tableData[i].clinic}</td>
                            <td key={tableData[i].id}>
                                <button  className="a_rezervisi_unapredDef"  
                                    onClick={this.clickOceniLekar.bind(this, doctor)}>Оцени</button>
                            </td>
                        </tr>
                    )
                }
            }
        }
        return res;
    }

    roundToTwo(num) {    
        return +(Math.round(num + "e+2")  + "e-2");
    }

    clickOceni = (clinic) => {
        console.log(clinic);

        this.setState({
            isOceniKliniku: true,
            isOceniDoktor: false,
            oceni_clinic: clinic
        });
    }

    clickOceniLekar = (doctor) => {
        console.log(doctor);

        this.setState({
            isOceniKliniku: false,
            isOceniDoktor: true,
            oceni_doctor: doctor
        });
    }

    closeModal = () => {
        this.setState({
            isOceniKliniku: false,
            isOceniDoktor: false
        });   
    }

    send = (type) => {
        let url = '';
        let check;
        let ocena;
        if(type === 'kl'){
            check = this.checkOcena('kl');
            ocena = document.getElementById("a_clinic_checkOcena").value;
            url = 'http://localhost:8081/clinic/oceniKliniku/' + this.state.oceni_clinic.id +"/"+ ocena;
        }
        else if(type === 'dr'){
            check = this.checkOcena('dr');
            ocena = document.getElementById("a_doctor_checkOcena").value;
            url = 'http://localhost:8081/doctor/oceniDoktora/' + this.state.oceni_doctor.id +"/"+ ocena;
        }
        
        if(check){
            fetch(url, {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                "Auth-Token": this.context.token
                },
            })
                .then(responseWrapped => responseWrapped.json())
                .then(response => {
                console.log(response);
                if(response){
                    this.closeModal();
                    alert('Хвала Вам на указаном поверењу!');
                    this.refresh();
                }
                else{
                    this.closeModal();
                    alert('Дошло је до грешке приликом рецензирања.');
                }
            });
        }
        else{
            return;
        }
    }
    
    checkOcena = (type) => {
        let ocena;
        if(type === 'kl'){
            ocena = document.getElementById("a_clinic_checkOcena").value;
        }
        else if(type === 'dr'){
            ocena = document.getElementById("a_doctor_checkOcena").value;
        }

        if(!ocena){
            alert('Морате унети оцену.');
            return false;
        }
        if(!Number(ocena)){
            alert('Оцена мора бити број од 1 до 10.'); 
            return false;
        } 
        if(ocena > 10 || ocena < 1){
            alert('Оцена мора бити у распону од 1 до 10.'); 
            return false;
        }

        return true;
    }

    changeOcena = (type) => {
        let ocena;
        if(type === 'kl'){
            ocena = document.getElementById("a_clinic_checkOcena").value;
        }
        else if(type === 'dr'){
            ocena = document.getElementById("a_doctor_checkOcena").value;
        }

        if(!Number(ocena) && ocena){
            alert('Оцена мора бити број.'); 
        }
        if((ocena > 10 || ocena < 1) && ocena){
            alert('Оцена мора бити у распону од 1 до 10.');
        }
    }

    refresh = () => {
        fetch('http://localhost:8081/clinic/getPatientHistoryClinics', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            "Auth-Token": this.context.token
        },
        })
        .then(responseWrapped => responseWrapped.json())
        .then(response => {
            this.setState({
                lista_klinika: response
            });

            fetch('http://localhost:8081/doctor/getPatientHistoryDoctors', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                "Auth-Token": this.context.token
            },
            })
            .then(responseWrapped => responseWrapped.json())
            .then(response1 => {
            this.setState({
                lista_doktora: response1
            });
            });
        });
    }

    render() {
        let showClinic = null;
        if(this.state.isOceniKliniku){
            showClinic = (
                <Modal
                    visible={this.state.isOceniKliniku}
                    width="400"
                    height="250"
                    effect="fadeInDown"
                    onClickAway={() => this.closeModal()}
                >
                    <div className="a_modal_patientHistory">
                        <h1>{this.state.oceni_clinic.name}</h1>
                        <p>Молимо Вас да оцените услуге наше клинике:</p> 
                        <form>
                            <input type="text" className="a_input_modal_patHistory" 
                                id="a_clinic_checkOcena" onChange={this.changeOcena.bind(this, 'kl')}>
                            </input>   
                        </form>
                        <button className="a_rateClinicDoctor_modal_patHistory" 
                            onClick={this.send.bind(this, 'kl')}>Пошаљи</button>
                    </div>
                </Modal>
            );
        }

        let showDoctor = null;
        let ime_prezime;
        if(this.state.oceni_doctor != null){
            ime_prezime = this.state.oceni_doctor.firstName + " " + this.state.oceni_doctor.lastName;
        }
        if(this.state.isOceniDoktor){
            showClinic = (
                <Modal
                    visible={this.state.isOceniDoktor}
                    width="400"
                    height="250"
                    effect="fadeInDown"
                    onClickAway={() => this.closeModal()}
                >
                    <div className="a_modal_patientHistory">
                        <h1>др {ime_prezime}</h1>
                        <p className="a_imePrz_modal_patHistory">Молимо Вас да оцените услуге доктора:</p> 
                        <form>
                            <input type="text" className="a_input_modal_patHistory" 
                                id="a_doctor_checkOcena" onChange={this.changeOcena.bind(this, 'dr')}>
                            </input>
                        </form>
                        <button className="a_rateClinicDoctor_modal_patHistory"
                             onClick={this.send.bind(this, 'dr')}>Пошаљи</button>    
                    </div>
                </Modal>
            );
        }

        return (
            <div>
                <PatientHistoryComponent 
                    generateTableKlinike = {this.generateTable(this.state.lista_klinika, 'kl')}
                    generateTableDoktori = {this.generateTable(this.state.lista_doktora, 'dr')}
                />

                {showClinic}
                {showDoctor}
            </div>
        );
    }
}

export default PatientHistory;