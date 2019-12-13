import React, { Component } from 'react';
import Modal from "../Modal" 

class Diagnosis extends Component {
  constructor(props) {
    super(props);
    this.state={
        render_list: [{cure_password:'ff',cure_name:'ff',diagnosis_password:'ff',diagnosis_name:'dfd'}],
        modalShowing: false,
        headerText: 'Unos nove kombinacije',
        cure_name: '',
        cure_password: '',
        diagnosis_password:'',
        diagnosis_name:''
    }
  }

  clickAdd = () => {
    this.setState({
        modalShowing: true
    });
   /* let curePassword = document.getElementById("curePassword_input").value;
    let cureName = document.getElementById("cureName_input").value;
    let diagnosisPassword = document.getElementById("diagnosisPassword_input").value;
    let diagnosisName = document.getElementById("diagnosisName_input").value;*/
    let curePassword='DSFFEFEF';
    let cureName='Opkdd';
    let diagnosisPassword='kfkefefe';
    let diagnosisName = 'efefeg';
    let temp={cure_password: curePassword,
             cure_name: cureName,
             diagnosis_password: diagnosisPassword,
             diagnosis_name: diagnosisName
            }
    // kopija prethodne liste i dodavanje novog objekta 
    this.setState({render_list:this.state.render_list.concat(temp)});

  }

  closeModalHandler = () => {
    this.setState({
        modalShowing: false
    });
    this.setState({
      modalPassword: false
    }); 
  }
   

  generateTableData(){
    let res=[];
    let tableData = this.state.render_list; //listu iz state preuzmi
    for(var i =0; i < tableData.length; i++){
        res.push(
         <tr >
        <td key={tableData[i].cure_password}>{tableData[i].cure_password}</td>
        <td key= {tableData[i].cure_name}>{tableData[i].cure_name}</td>
        <td key={tableData[i].diagnosis_password}>{tableData[i].diagnosis_password}</td>
        <td key={tableData[i].diagnosis_name}>{tableData[i].diagnosis_name}</td>
        </tr>
        )
    }
    return res;
}

  
  render() {
    let modalni = null;
    if(this.state.modalShowing){
      modalni = (
        <Modal
          className="modal"
          show={this.state.modalShowing}
          close={(event) => this.closeModalHandler(event)}
          send={this.sendModalHandler} //posalji
          
          >
            <form>
              <p>Sifra leka:</p>
              <input type="text"
                className="input_field" 
                id="curePassword_input"></input>
              <p>Naziv leka:</p>
              <input type="text" 
                className="input_field"
                id="cureName_input"></input>
              <p>Sifra dijagnoze:</p>
              <input type="text" 
                className="input_field"
                id="diagnosisPassword_input"></input>
               <p>Naziv dijagnoze:</p>
               <input type="text" 
                className="input_field"
                id="diagnosisName_input"></input>
            </form>
        </Modal>);
    }

    return (
      <div>
      <table border="1">
        <thead>
          <tr>
            <th>SIFRA LEKA</th>
            <th>NAZIV LEKA</th>
            <th>DIJAGNOZA</th>
            <th>NAZIV_DIJAGNOZE</th>           
          </tr>
        </thead>
        <tbody>
           {this.generateTableData()}
           <tr>
              <td colspan="4" align="center" id="Add">
                <button id="btnAdd" onClick={this.clickAdd}> UNESI NOVU KOMBINACIJU </button>
              </td>
            </tr>
        </tbody>
      </table>
      {modalni}
      </div>
    );
  }

}

export default Diagnosis;