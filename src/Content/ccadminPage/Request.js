import React, { Component } from 'react';


const Request = (props) => {
    return (
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
      
    );
}


export default Request;