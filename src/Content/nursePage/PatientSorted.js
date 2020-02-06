import React, { Component } from 'react';

class PatientSorted extends Component{

    constructor(props){
        super(props);
    }


    generateTable = () => {
        let res = [];
        let tableData = this.props.list_patients; 
        if (tableData != null) {
         for (var i = 0; i < tableData.length; i++) {                                    
           res.push(
             <tr key={tableData[i].date+1}>
                 <td key={tableData[i].firstName} >{tableData[i].firstName}</td>
                 <td key={tableData[i].lastName} >{tableData[i].lastName}</td>
                 <td key={tableData[i].address}>{tableData[i].address}</td>
                 <td key={tableData[i].telephone}>{tableData[i].telephone}</td>
                 <td key={tableData[i].mail}>{tableData[i].mail}</td>
             </tr>
            )
         }
       } 
       return res;     
    }


    render(){
      return(
           
        <div>
            <div className="divPrescriptionJ" style={{
            display: this.props.show ? 'block' : 'none'
            }}>
            <h3>Листа пацијената</h3>
               <form className="bodyMedicalHistoryJ">
                  <table id="table_reviewsJ">
                    <thead>
                       <th>име</th>
                       <th>презиме</th>
                       <th>адреса</th>
                       <th>број телефона</th>
                       <th>е-маил</th>
                    </thead>
                    <tbody>
                       {this.generateTable()}
                    </tbody>
                  </table>
                 </form>
            </div>
        </div>     

      );
    }
}

export default PatientSorted;