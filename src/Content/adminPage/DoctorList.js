import React, { Component } from 'react';
import './New.css'

const DoctorList = (props) => {
    return (
      <div className="divProfileAdmin">
        <table className="formSearch" name="findForm">
          <tr>
            <td>
              <p>Име:</p>    
            </td>
            <td>      
              <input id="firstName" name="ime" onChange={props.changeHandler}></input>
            </td>
            <td>
              <p>Презиме:</p>
            </td>
            <td>
              <input id="lastName" name="prezime" onChange={props.changeHandler}></input>
            </td>
            <td>
            <button onClick={props.findDoctor} id="btnSearch">Пронађи</button>
            </td>
          </tr>
        </table>     
        <p/>
        <table className="New">
          <thead>
            <tr>
              <th>ИМЕ</th>
              <th>ПРЕЗИМЕ</th>
              <th>ТИП ПРЕГЛЕДА</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.generateTableData}
          </tbody>
        </table>
        <p/>
        <p/>
      <button id="btnReg" onClick={props.clickRegister}>Региструј медицинско особље</button>
      </div>
    );
}

export default DoctorList;