import React, { Component } from 'react';

const DoctorList = (props) => {
    return (
      <div>
      <form name="findForm" onSubmit={props.mySubmit}>
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
            {props.generateTableData}
          </tbody>
        </table>
      </div>
    );
}

export default DoctorList;