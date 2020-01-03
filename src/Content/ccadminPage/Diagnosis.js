import React from 'react';

const Diagnosis = (props) => {
 
    return (
      <div>
      <table id="tabRequest">
        <thead>
          <tr>
            <th>ШИФРА ЛЕКА</th>
            <th>НАЗИВ ЛЕКА</th>
            <th>ДИЈАГНОЗА</th>
            <th>НАЗИВ_ДИЈАГНОЗЕ</th>           
          </tr>
        </thead>
        <tbody>
           {props.generateTableData}
           <tr>
              <td colspan="4" align="center">
                <button id="btnAdd" onClick={props.clickAdd}> УНЕСИ НОВУ КОМБИНАЦИЈУ </button>
              </td>
            </tr>
        </tbody>
      </table>
      </div>
    );
  }


export default Diagnosis;