import React from 'react';

const Diagnosis = (props) => {
 
    return (
      <div className="divDiagnosis">
      <table id="tabRequest">
        <thead>
          <tr>
            <th>ШИФРА ЛЕКА</th>
            <th>НАЗИВ ЛЕКА</th>
            <th>ШИФРА_ДИЈАГНОЗЕ</th>
            <th>НАЗИВ_ДИЈАГНОЗЕ</th>           
          </tr>
        </thead>
        <tbody>
           {props.generateTableData}
           <tr>
              <td colspan="4" align="center">
                <button id="btnAddDiagnosisJ" onClick={props.clickAdd}> УНЕСИ НОВУ КОМБИНАЦИЈУ </button>
              </td>
            </tr>
        </tbody>
      </table>
      </div>
    );
  }


export default Diagnosis;