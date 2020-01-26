import React from 'react'
import {UserContext} from '../../UserProvider'
import Modal from 'react-awesome-modal'
import './PatientRate.css'

class PatientRate extends React.Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            lista_pregleda_original : props.lista_pregleda,
            lista_pregleda : props.lista_pregleda,
            options: props.options
        };
    }

    generateTableData = (list) => {
        let res = [];
        if (list != null) {
            let tableData = list;
            for (var i = 0; i < tableData.length; i++) {
                let d = new Date(tableData[i].date);
                let date = d.toDateString();
                let doctor = tableData[i].firstNameDoctor + " " + tableData[i].lastNameDoctor;
                let vrsta = 'Операција';
                if(tableData[i].examination){
                    vrsta = 'Преглед';
                }
                res.push(
                    <tr>
                        <td key={date}> {date} </td>
                        <td key={doctor}> {doctor} </td>
                        <td key={tableData[i].type}> {tableData[i].type} </td>
                        <td key={vrsta}> {vrsta} </td>
                    </tr>
                )
            }
        }
        return res;
    }

    generateOptions(listOptions) {
        console.log(listOptions);
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

    sort = () => {
        let date = document.getElementById("a_date_table_of_examination").value;
        let tip = document.getElementById("a_select_table_of_examination").value;
        let vrsta = document.getElementById("a_selectVrsta_table_of_examination").value;
        
        if(!date){
            date = -1;
        }else{
            let dat = new Date(date);
            date = dat.getTime();
        }

        fetch('http://localhost:8081/patient/sortTerms/'+date+'/'+tip+'/'+vrsta, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            "Auth-Token": this.context.token
          },
          body: JSON.stringify(this.state.lista_pregleda_original),
        })
        .then(responseWrapped => responseWrapped.json())
        .then(response => {
          console.log(response);
          this.setState({
            lista_pregleda: response
          });
        });
    }

    render(){
        return (
            <div id="a_rating_main_div">
                <div id="a_sort_table_of_examination">
                    <div className="a_date_examination_inline">
                        <p>Датум прегледа:</p>
                        <input type="date"
                            min="2019-12-20" max="2020-02-12"
                            id="a_date_table_of_examination"
                            onChange={this.sort}></input>
                    </div>
                    <div className="a_date_examination_inline">
                        <p>Тип прегледа:</p>
                        <select className="a_select_examination" 
                            id="a_select_table_of_examination"
                            onChange={this.sort}>
                            {this.generateOptions(this.state.options)}
                        </select>
                    </div>
                    <div className="a_date_examination_inline">
                        <p>Врста термина:</p>
                        <select className="a_select_examination" 
                            id="a_selectVrsta_table_of_examination"
                            onChange={this.sort}>
                            <option>Прегледи и операције</option>
                            <option>Преглед</option>
                            <option>Операција</option>
                        </select>
                    </div>
                </div>
        
                <table className="a_rating_table_of_examinations">
                    <thead>
                        <tr>
                            <th>Датум</th>
                            <th>Доктор</th>
                            <th>Тип прегледа</th>
                            <th>Врста термина</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.generateTableData(this.state.lista_pregleda)}
                    </tbody>
                </table>
            </div>       
        );
    }
}

export default PatientRate;