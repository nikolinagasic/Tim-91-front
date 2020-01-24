import React from 'react'
import ClinicProfileComponent from './ClinicProfileComponent'
import Modal from 'react-awesome-modal'
import {UserContext} from '../../UserProvider'

class ClinicProfile extends React.Component{
    static contextType = UserContext;

    constructor(props){
        super(props);
        this.state = {
            lista_doktora: this.props.lista_doktora,
            lista_doktora_original: this.props.lista_doktora,
            clinic: this.props.clinic,
            lista_tipova: this.props.lista_tipova,
            
            date: null,                      // datum pregleda
            choosedDoctor: null, 
            idChoosedDoctor: null,
            isTermini: false,           // prikaz modalnog sa svim slobodnim terminima
            isDetailTerm: false         // prikaz detalja o terminu  
        }
    }

    generateTableDoctor(listDoctors) {
        let res = [];
        if (listDoctors != null) {
            let tableData = listDoctors;
            for (var i = 0; i < tableData.length; i++) {
                let name = tableData[i].firstName;
                let last_name = tableData[i].lastName;
                let id_doctor = tableData[i].id;
                let rating = tableData[i].rating;
                rating = this.roundToTwo(rating);
                res.push(
                    <tr>
                        <td key={tableData[i].firstName}>{tableData[i].firstName}</td>
                        <td key={tableData[i].lastName}>{tableData[i].lastName}</td>
                        <td key={tableData[i].rating}>{rating}</td>
                        <td><button className="pogledaj_search_doctor" 
                            onClick={this.clickPogledaj.bind(this, name, last_name, id_doctor)}
                            >Погледај</button></td>
                    </tr>
                )
            }
        }
        return res;
    }

    roundToTwo(num) {    
        return +(Math.round(num + "e+2")  + "e-2");
    }

    generateOption(listOptions) {
        let res = [];
        if (listOptions != null) {
            let tableData = listOptions;
            res.push(<option key="Сви типови">Сви типови</option>);
            for (var i = 0; i < tableData.length; i++) {
                res.push(
                    <option key={tableData[i].name}>{tableData[i].name}</option>
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
        
        let date = document.getElementById("a_date_doctor_clinicProfile").value;
        if(!date){
            alert('Обавезан је унос поља датум.');
            return;
        }
        let dat = new Date(date);
        date = dat.getTime();

        
        console.log(doctorName + " " + date);
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
                date: date,
                lista_termina: response,
                choosedDoctor: doctorName, 
                idChoosedDoctor: id,
                isTermini: true
            });
        });
    }

    changeClinicProfile = () => {
        let ime = document.getElementById("a_name_doctor_clinicProfile").value;
        let prezime = document.getElementById("a_lastName_doctor_clinicProfile").value;
        let ocena = document.getElementById("a_ocena_doctor_clinicProfile").value;
        let date = document.getElementById("a_date_doctor_clinicProfile").value;
        let select = document.getElementById("a_select_doctor_clinicProfile").value;
        
        if(!ime){
            ime = '~';
        }if(!prezime){
            prezime = '~';
        }if(!ocena){
            ocena = -1;
        }
        if(!date){
            date = -1;
        }else{
            let dat = new Date(date);
            date = dat.getTime();
        }

        const url = 'http://localhost:8081/doctor/expandedSearchDoctor/'+
                    ime+"/"+prezime+"/"+ocena+"/"+date+"/"+select;
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                "Auth-Token": this.context.token
            },
            body: JSON.stringify(this.state.lista_doktora_original)
        };

        fetch(url, options)
        .then(responseWrapped => responseWrapped.json())
        .then(response => {
            this.setState({
                lista_doktora: response,
            });
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
            if(response.ok){
                // zatvori sve dijaloge
                this.closeAllTermsDialog(); 
                alert('Захтев успешно послат. О детаљима прегледа бићете обавештени путем адресе е-поште.');
            }
            else{
                this.closeAllTermsDialog();
                alert('Захтев није успешно послат. Покушајте поново');
            }
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
                <ClinicProfileComponent
                    // clinic attributes
                    name={this.state.clinic.name}
                    description={this.state.clinic.description}
                    price={this.state.clinic.price}
                    rating={this.state.clinic.rating}
                    address={this.state.clinic.address}
                    location={this.state.clinic.location}
                    // props
                    back={this.props.back}
                    lista_doktora={this.state.lista_doktora}
                    predefinedTerm={this.props.predefinedTerm}
                    // generate
                    generateOption = {this.generateOption(this.state.lista_tipova)}
                    generateTable={this.generateTableDoctor(this.state.lista_doktora)}
                    changeClinicProfile={this.changeClinicProfile}
                />

                {showTerm}
                {showDetailTerm}
            </div>
        );
    }
}

export default ClinicProfile;