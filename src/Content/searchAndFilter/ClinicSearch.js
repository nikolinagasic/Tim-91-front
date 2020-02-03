import React from 'react'
import Radium from 'radium'
import SearchComponent from './SearchComponent'
import DoctorSearch from './DoctorSearch'
import ClinicProfile from './ClinicProfile'
import {UserContext} from '../../UserProvider'
import PredefinedTerm from './PredefinedTerms'

class ClinicSearch extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            lista_klinika_original: props.lista_klinika,
            lista_klinika: props.lista_klinika,
            lista_tipova: props.lista_tipova,
            lista_doktora: null,
            lista_doktora_original: null,
            clinic: null,
            lista_predefinisanih_termina: null,
            
            clinicNameOrder: 'a',
            clinicAddressOrder: 'a',

            showClinics: true,
            showDoctors: false,
            isClinicProfile: false,
            isPredefinedTerm: false
        }
    }

    searchClinic = () => {
        // sakrij logo
        document.getElementById("logo_img").style.visibility = "hidden";
        
        let index = document.getElementById("headerSearchClinicTip").selectedIndex;
        let datum1 = document.getElementById("headerSearchClinicDate").value;
        let dat = new Date(datum1);
        let datum = dat.getTime();
        let tip = document.getElementById("headerSearchClinicTip").value;
        let ocena = document.getElementById("headerSearchClinicOcena").value;
        console.log(datum + " " + tip + " " + ocena + " " + index);

        if(!datum){
            alert('Обавезан је унос датума прегледа.');
            return;
        }
        if(!ocena){
            ocena = -1;
        }

        const url = 'http://localhost:8081/clinic/searchClinic/'+datum+"/"+tip+"/"+ocena;
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
            if(response !== null){
                console.log("dobro si vratio sa back-a");
                this.setState({
                    lista_klinika: response
                });
            }
            else {
                if(response.status === 401){
                    alert("Немате права за приступ датој опцији. (401 Unauthorized)");
                }else{
                    alert("Дошло је до грешке приликом излиставања клиника.");
                }
            }
        });
    }

    clickOnClinic = (clinicName) => {
        console.log(clinicName);
        let datum1 = document.getElementById("headerSearchClinicDate").value;
        if(!datum1){
            alert('Обавезан је унос датума прегледа.');
            return;
        }
        
        let dat = new Date(datum1);
        let datum = dat.getTime();
        this.setState({
            date: datum
        });
        
        const url = 'http://localhost:8081/clinic/getDoctorsByClinic/'+clinicName+"/"+datum;
        console.log('url: ' + url);
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
                lista_doktora: response,
                showClinics:false,
                showDoctors:true,
                isClinicProfile:false
            });
        });
    }

    generateTableData(listClinics) {
        let res = [];
        if (listClinics != null) {
            let tableData = listClinics;
            for (var i = 0; i < tableData.length; i++) {

                let name = tableData[i].name;
                let id = tableData[i].id;
                let rating = tableData[i].rating;
                rating = this.roundToTwo(rating);
                res.push(
                    <tr className="tr_clinic_search"
                        id={tableData[i].name}>
                        <td id="a_tr_clinic_search_prikazi"
                            key={tableData[i].id}
                            onClick={() => this.clickOnPrikaziClinic(id)}>
                            Прикажи
                        </td>
                        <td onClick={() => this.clickOnClinic(name)}
                         key={tableData[i].name}>{tableData[i].name}</td>
                        <td onClick={() => this.clickOnClinic(name)}
                         key={tableData[i].rating}>{rating}</td>
                        <td onClick={() => this.clickOnClinic(name)}
                         key={tableData[i].address}>{tableData[i].address}</td>
                        <td onClick={() => this.clickOnClinic(name)}
                         key={tableData[i].price}>{tableData[i].price} рсд</td>
                    </tr>
                )
            }
        }
        return res;
    }

    roundToTwo(num) {    
        return +(Math.round(num + "e+2")  + "e-2");
    }

    generatePredefinedTerm = (list) => {
        let res = [];
        if (list != null) {
            let tableData = list;
            for (var i = 0; i < tableData.length; i++) {
                console.log(tableData[i]);
                let d = new Date(tableData[i].date);
                let date = d.toDateString();
                let satnica = tableData[i].start_term + " - " + tableData[i].end_term;
                let doctor = tableData[i].firstNameDoctor + " " + tableData[i].lastNameDoctor;
                let id = tableData[i].id;
                console.log(id);
                res.push(
                    <tr>
                        <td key={date}
                            >{date}</td>
                        <td key={satnica}
                            >{satnica}</td>
                        <td key={tableData[i].room}
                            >{tableData[i].room}</td>
                        <td key={doctor}
                            >{doctor}</td>
                        <td key={tableData[i].type}
                            >{tableData[i].type}</td>
                        <td key={tableData[i].price}
                            >{tableData[i].price} рсд</td>
                        <td key={tableData[i].discount}
                            >{tableData[i].discount}%</td>
                        <td key={tableData[i].id}>
                            <button className="a_rezervisi_unapredDef" 
                                onClick={() => this.clickRezUnapreDef(id)}>
                                Резервиши
                            </button></td>
                    </tr>
                )
            }
        }
        return res;
    }

    clickRezUnapreDef = (id) => {
        console.log('click na predefined id: ' + id);

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                "Auth-Token": this.context.token,
            }
        };
      
        fetch('http://localhost:8081/clinic/reservePredefinedTerm/'+id, options)
        .then(responseWrapped => responseWrapped.json())
        .then(response => {
            console.log(response);
            if(response){
                alert('Термин успешно резервисан.');
                this.refreshRezTerm();
            }
            else{
                alert('Неко је пре Вас резервисао овај термин. Покушајте поново.');
            }
        });
    }

    refreshRezTerm = () => {
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                "Auth-Token": this.context.token,
            },
            body: JSON.stringify(this.state.clinic)
        };
      
        fetch('http://localhost:8081/clinic/getPredefinedTerms', options)
        .then(responseWrapped => responseWrapped.json())
        .then(response => {
            console.log(response);
            this.setState({
                lista_predefinisanih_termina: response
            });
        });
    }

    // PRIKAZ PROFILA KLINIKE
    clickOnPrikaziClinic = (id) => {
        console.log('prikazi kliniku: ' + id);

        const url = 'http://localhost:8081/clinic/getClinicByName/'+id;
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
            if(response != null){
                console.log('uspesno dobavljena klinika: ' + response.name);
                
                const url1 = 'http://localhost:8081/clinic/getDoctors/'+response.name;
                fetch(url1, options)
                .then(responseWrapped1 => responseWrapped1.json())
                .then(response1 => {
                    console.log(response1)
                    this.setState({
                        isClinicProfile: true,
                        showClinics: false,
                        showDoctors: false,
                        clinic: response,
                        lista_doktora: response1,
                        lista_doktora_original: response1
                    });
                });
            }
            else{
                console.log('greska kod dobavljanja klinike');
            }
        });

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

    changedInput = () => {
        let cenaOd = document.getElementById("filter_clinic_cenaOd").value;
        let cenaDo = document.getElementById("filter_clinic_cenaDo").value;
        let ocenaOd = document.getElementById("filter_clinic_ocenaOd").value;
        let ocenaDo = document.getElementById("filter_clinic_ocenaDo").value;
        let naziv = document.getElementById("filter_clinic_naziv").value;
        
        if(!cenaOd){
            cenaOd = "min";
        }if(!ocenaOd){
            ocenaOd = "min";
        }if(!cenaDo){
            cenaDo = "max";
        }if(!ocenaDo){
            ocenaDo = "max";
        }if(!naziv){
            naziv = "~";
        }
        //console.log(cenaOd + " " +cenaDo + " " +ocenaOd + " " +ocenaDo + " " +naziv);

        const url = 'http://localhost:8081/clinic/getFilterClinic/'+cenaOd+"/"+cenaDo+"/"+ocenaOd+"/"+ocenaDo+"/"
                     + naziv;
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                "Auth-Token": this.context.token
            },
            body: JSON.stringify(this.state.lista_klinika_original)
        };

        fetch(url, options)
        .then(responseWrapped => responseWrapped.json())
        .then(response => {
            this.setState({
                lista_klinika: response
            });
        });
       
    }

    back = () => {
        this.setState({
            showDoctors: false,
            isClinicProfile: false,
            showClinics: true,
            isPredefinedTerm:false
        });
    }

    clickPredefinedTerm = () => {
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                "Auth-Token": this.context.token,
            },
            body: JSON.stringify(this.state.clinic)
        };
      
        fetch('http://localhost:8081/clinic/getPredefinedTerms', options)
        .then(responseWrapped => responseWrapped.json())
        .then(response => {
            console.log(response);
            this.setState({
                lista_predefinisanih_termina: response,
                showDoctors: false,
                isClinicProfile: false,
                showClinics: false,
                isPredefinedTerm: true
            });
        });
    }

    backToClinic = () => {
        this.setState({
            showDoctors: false,
            isClinicProfile: true,
            showClinics: false,
            isPredefinedTerm: false
        });
    }

    sortClinicName = () => {
        console.log('sortiram');
        if(this.state.clinicNameOrder === 'a'){
            this.setState({
                clinicNameOrder: 'd'
            })
        }
        else{
            this.setState({
                clinicNameOrder: 'a'
            })
        }

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                "Auth-Token": this.context.token,
            },
            body: JSON.stringify(this.state.lista_klinika)
        };

        fetch('http://localhost:8081/clinic/sortClinicByName/'+this.state.clinicNameOrder, options)
        .then(responseWrapped => responseWrapped.json())
        .then(response => {
            console.log(response);
            this.setState({
                lista_klinika : response
            });
        });
    }

    sortClinicAddress = () => {
        if(this.state.clinicAddressOrder === 'a'){
            this.setState({
                clinicAddressOrder: 'd'
            })
        }
        else{
            this.setState({
                clinicAddressOrder: 'a'
            })
        }

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                "Auth-Token": this.context.token,
            },
            body: JSON.stringify(this.state.lista_klinika)
        };

        fetch('http://localhost:8081/clinic/sortClinicByAddress/'+this.state.clinicAddressOrder, options)
        .then(responseWrapped => responseWrapped.json())
        .then(response => {
            console.log(response);
            this.setState({
                lista_klinika : response
            });
        });
    }

    render(){
        let clinics = null;
        if(this.state.showClinics){
            clinics = (
                <SearchComponent 
                    search={this.searchClinic}
                    generateTable={this.generateTableData(this.state.lista_klinika)}
                    generateOption = {this.generateOption(this.state.lista_tipova)}
                    change={this.changedInput}
                    sortClinicName={this.sortClinicName}
                    sortClinicAddress={this.sortClinicAddress}
                />
            );
        }
        let doctors = null;
        if(this.state.showDoctors){
            doctors = (
                <DoctorSearch 
                    lista_doktora={this.state.lista_doktora}
                    backToClinics={this.back}
                    date={this.state.date}
                />
            );
        }
        let clinicProfile = null;
        if(this.state.isClinicProfile){
            clinicProfile = (
                <ClinicProfile
                    clinic={this.state.clinic}
                    back={this.back}
                    lista_doktora={this.state.lista_doktora}
                    lista_tipova={this.state.lista_tipova}
                    predefinedTerm={this.clickPredefinedTerm}
                />
            );
        }
        let predTerm = null;
        if(this.state.isPredefinedTerm){
            predTerm = (
                <PredefinedTerm
                    back={this.backToClinic}
                    generateTable={this.generatePredefinedTerm(this.state.lista_predefinisanih_termina)}
                />
            );
        }
        
        return(
            <div>
                {clinics}
                {doctors}
                {clinicProfile}
                {predTerm}
            </div>
        );
    }
}

export default Radium(ClinicSearch);