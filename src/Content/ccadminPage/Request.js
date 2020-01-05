import React, { Component } from 'react';


const Request = (props) => {
    return (
      <div className="divDiagnosis">
      <table  id="tabRequest">
        <thead>
          <tr>
            <th>ИМЕ</th>
            <th>ПРЕЗИМЕ</th>
            <th>Е-МАИЛ</th>
            <th>ОДОБРЕНО</th>
            <th id="last_column">НИЈЕ_ОДОБРЕНО</th>
          </tr>
        </thead>
        <tbody>
           {props.generateTableData}
        </tbody>
      </table>
      </div>
    );
}


export default Request;