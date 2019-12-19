import React, { Component } from 'react'
import Radium from 'radium'
import SearchComponent from './SearchComponent'

class ClinicSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lista_klinika: props.lista_klinika,
            token: props.token
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

    generateTableData(listClinics) {
        console.log("CRTAM");
        console.log(listClinics);
        let res = [];
        if (listClinics != null) {
            let tableData = listClinics;
            for (var i = 0; i < tableData.length; i++) {
                res.push(
                    <tr >
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

    render(){
        return(
            <div>
                <SearchComponent 
                    search={this.searchClinic}
                    generateTable={this.generateTableData(this.state.lista_klinika)}
                />
            </div>
        );
    }
}

export default Radium(ClinicSearch);