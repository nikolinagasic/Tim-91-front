import React, { Component } from 'react';

class DoctorList extends Component {
    constructor(props) {
        super(props);
       
        this.state={
          s:this.props.location.state.detail
        };
        
      }
      mySubmitHandler = (event) => {
        event.preventDefault();
        let ime = this.state.firstName;
        let prezime = this.state.lastName;
        let obj = {
          "firstName" : this.state.firstName,
          "lastName" : this.state.lastName
        }
        
        const url = 'http://localhost:8081/clinicAdministrator/find/'+ime+"/"+prezime;
        const options = {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify(obj)
        };
  
        fetch(url, options)
        .then(responseWrapped => responseWrapped.json())
        .then(response => {
          
          if (response.ok == false) {
            alert("Тражени лекар не постоји.");
          } else {
            alert(ime+" "+prezime+" пронађен.");
          }
        })
       
      }

      generateTableData(){
        let res=[];
        let tableData = this.state.s;
        for(var i =0; i < tableData.length; i++){
            res.push(
             <tr>
            <td key={tableData[i].firstName}>{tableData[i].firstName}</td>
            <td key= {tableData[i].lastName}>{tableData[i].lastName}</td>
            <td key={tableData[i].field}>{tableData[i].field}</td>
            <td key={tableData[i].mail}>{tableData[i].mail}</td>
            </tr>
            )
        }
        return res;
    }
    
      
      render() {
        return (
          <div>
          <form name="findForm" onSubmit={this.mySubmitHandler}>
            <p>Име:</p>
            <input id="ime"></input>
            <p>Презиме:</p>
            <input id="prezime"></input>
            <input type="submit" id="id_submit" value="Пронађи"></input>
          </form>
            <table border="1">
              <thead>
                <tr>
                  <th>ИМЕ</th>
                  <th>ПРЕЗИМЕ</th>
                  <th>ОБЛАСТ</th>
                  <th>АДРЕСА Е-ПОШТЕ</th>
                </tr>
              </thead>
              <tbody>
                {this.generateTableData()}
              </tbody>
            </table>
          </div>
        );
      }

}

export default DoctorList;