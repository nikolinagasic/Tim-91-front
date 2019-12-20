import React, { Component } from 'react'
import DoctorComponent from './DoctorComponent'

class DoctorSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            lista_lekara_original: props.lista_doktora,
            lista_lekara: props.lista_doktora
        }
    }

    generateTableData(listDoctors) {
        let res = [];
        if (listDoctors != null) {
            let tableData = listDoctors;
            for (var i = 0; i < tableData.length; i++) {
                let name = tableData[i].name;
                res.push(
                    <tr>
                        <td key={tableData[i].firstName}>{tableData[i].firstName}</td>
                        <td key={tableData[i].lastName}>{tableData[i].lastName}</td>
                        <td key={tableData[i].rating}>{tableData[i].rating}</td>
                        <td><button className="pogledaj_search_doctor">Погледај</button></td>
                    </tr>
                )
            }
        }
        return res;
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
            ocena = 0;
        }
        

        const url = 'http://localhost:8081/doctor/searchDoctors/'+ime+"/"+prezime+"/"+ocena;
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                "Auth-Token": this.state.token
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

    render(){
        return(
            <div>
                <DoctorComponent
                    generateTable={this.generateTableData(this.state.lista_lekara)}
                    back={this.props.backToClinics}
                    change={this.change}
                />
            </div>
        );
    }
}

export default DoctorSearch;