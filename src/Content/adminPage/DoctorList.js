import React, { Component } from 'react';
import './New.css'
import imgFind from "../Images/find.png"

const DoctorList = (props) => {
    return (
      <div className="divProfileAdmine">
              <button id="btnReg" onClick={props.clickRegister}>Региструј медицинско особље</button>
              <p/>

        <table className="formSearch" name="findForm">
          <tr> 
          <td>
            <img src={imgFind} alt="Пронађи"/>   
            </td>        
            <td>
              <p>Име:</p>    
            </td>
            <td>      
              <input id="doctorFirstName" name="ime" onChange={props.findDoctor}></input>
            </td>
            <td>
              <p>Презиме:</p>
            </td>
            <td>
              <input id="doctorLastName" name="prezime" onChange={props.findDoctor}></input>
            </td>
            
          </tr>
        </table>     
        <p/>

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
      </div>
    );
}

export default DoctorList;