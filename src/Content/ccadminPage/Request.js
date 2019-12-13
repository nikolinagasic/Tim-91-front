import React, { Component } from 'react';

class Request extends Component {
  constructor(props) {
    super(props);
    //console.log('OVDE SAM U ZAHTEVIMA')
    //console.log(this.props.location.state.detail)
    this.state={
      request:this.props.location.state.detail
    };
    
  }

  clickHandler1 = (mail) => {
    console.log("KLIK NA DUGME")
    const url = 'http://localhost:8081/ccadmin/accept/'+mail+'/1';
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
    };

    fetch(url, options)
        .then(response => {
          console.log(response.status);
          console.log(response)
          if(response.ok){
            alert("Pacijentu je odobren zahtev");
          }
          
        });
     }
   

  clickHandler2 = (mail) => {
    const url = 'http://localhost:8081/ccadmin/accept/'+mail+'/2';
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
    };

    fetch(url, options)
        .then(response => {
          console.log(response.status);
          console.log(response)
          if(response.ok){
            alert("Pacijentu je odbijen zahtev");
          }
          
        });
     }

  


  generateTableData(){
    let res=[];
    let tableData = this.state.request;
    for(var i =0; i < tableData.length; i++){
        res.push(
         <tr >
        <td key={tableData[i].firstName}>{tableData[i].firstName}</td>
        <td key= {tableData[i].lastName}>{tableData[i].lastName}</td>
        <td key={tableData[i].email}>{tableData[i].mail}</td>
        <td><button onClick={this.clickHandler1.bind(this, tableData[i].mail)}>Odobri</button></td>
        <td><button onClick={this.clickHandler2.bind(this, tableData[i].mail)}>Odbij</button></td>
        </tr>
        )
    }
    return res;
}

  
  render() {
    return (
      <table border="1">
        <thead>
          <tr>
            <th>IME</th>
            <th>PREZIME</th>
            <th>MAIL</th>
            <th>ODOBRENO</th>
            <th>NIJE_ODOBRENO</th>
          </tr>
        </thead>
        <tbody>
           {this.generateTableData()}
        </tbody>
      </table>
      
    );
  }




}

export default Request;