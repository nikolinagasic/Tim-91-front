import React, { Component } from 'react';
import './New.css'

const DoctorList = (props) => {
    return (
      <div className="divProfileAdmin">
      <form className="formSearch" name="findForm" onSubmit={props.mySubmit}>
        <table>
          <tr>
            <td>
              <p>Име:</p>    
            </td>
            <td>      
              <input id="ime"></input>
            </td>
            <td>
              <p>Презиме:</p>
            </td>
            <td>
              <input id="prezime"></input>
            </td>
            <td>
            <input type="submit" id="btnSearch" value="Пронађи"></input>
            </td>
          </tr>
        </table>     
        <p/>
      </form>
        <table className="New_room_list">
          <thead>
            <tr>
              <th>ИМЕ</th>
              <th>ПРЕЗИМЕ</th>
              <th>ТИП ПРЕГЛЕДА</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="tbody_pageAdmin_n">
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