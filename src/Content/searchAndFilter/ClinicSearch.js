import React, { Component } from 'react'
import Radium from 'radium'
import SearchComponent from './SearchComponent'
import DoctorSearch from './DoctorSearch'

class ClinicSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lista_klinika: props.lista_klinika,
            token: props.token,
            lista_tipova: props.lista_tipova,
            showClinics: true,
            showDoctors: false,
            lista_doktora: null
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

        const url = 'http://localhost:8081/clinic/searchClinic/'+datum+"/"+tip+"/"+ocena;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                "Auth-Token": this.state.token
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
        
        const url = 'http://localhost:8081/clinic/getDoctorsByClinic/'+clinicName;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                "Auth-Token": this.state.token
            },
        };

        fetch(url, options)
        .then(responseWrapped => responseWrapped.json())
        .then(response => {
            console.log(response);
            this.setState({
                lista_doktora: response,
                showClinics:false,
                showDoctors:true
            });
        });
    }

    generateTableData(listClinics) {
        let res = [];
        if (listClinics != null) {
            let tableData = listClinics;
            for (var i = 0; i < tableData.length; i++) {
                let name = tableData[i].name;
                res.push(
                    <tr className="tr_clinic_search"
                        id={tableData[i].name}
                        onClick={() => this.clickOnClinic(name)}>
                        <td key={tableData[i].name}>{tableData[i].name}</td>
                        <td key={tableData[i].rating}>{tableData[i].rating}</td>
                        <td key={tableData[i].address}>{tableData[i].address}</td>
                        <td key={tableData[i].price}>{tableData[i].price}</td>
                    </tr>
                )
            }
        }
        return res;
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

    back = () => {
        this.setState({
            showDoctors: false,
            showClinics: true
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
                />
            );
        }
        let doctors = null;
        if(this.state.showDoctors){
            doctors = (
                <DoctorSearch 
                    lista_doktora={this.state.lista_doktora}
                    backToClinics={this.back}
                />
            );
        }

        return(
            <div>
                {clinics}
                {doctors}
            </div>
        );
    }
}

export default Radium(ClinicSearch);