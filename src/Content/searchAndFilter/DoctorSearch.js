import React, { Component } from 'react'
import DoctorComponent from './DoctorComponent'

class DoctorSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            lista_lekara_original: props.lista_doktora,
            lista_lekara: props.lista_doktora,
            lista_termina: null,
            isTermini: false
        }
    }

    generateTableData(listDoctors) {
        let res = [];
        if (listDoctors != null) {
            let tableData = listDoctors;
            for (var i = 0; i < tableData.length; i++) {
                let name = tableData[i].firstName;
                let l_name = tableData[i].lastName;
                res.push(
                    <tr>
                        <td key={tableData[i].firstName}>{tableData[i].firstName}</td>
                        <td key={tableData[i].lastName}>{tableData[i].lastName}</td>
                        <td key={tableData[i].rating}>{tableData[i].rating}</td>
                        <td><button className="pogledaj_search_doctor" 
                            onClick={this.clickPogledaj.bind(this, name, l_name)}>Погледај</button></td>
                    </tr>
                )
            }
        }
        return res;
    }

    clickPogledaj = (ime, prezime) => {
        //console.log(ime + " " + prezime);
        
        const url = 'http://localhost:8081/doctor/getTermini/'+ime+"/"+prezime;
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
            ocena = 0;
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

    render(){
        return(
            <div>
                <DoctorComponent
                    generateTable={this.generateTableData(this.state.lista_lekara)}
                    back={this.props.backToClinics}
                    change={this.change}
                    changeFilter={this.changeFilter}
                />
            </div>
        );
    }
}

export default DoctorSearch;