import imgFind from "../Images/find.png"
import React, { Component } from 'react';

const PatientList = (props) => {
  
    return(
    <div className="divProfileAdmine">
    <table> 
    <td>
      <img id ="imgFindType" src={imgFind} alt="Пронађи"/>
      </td>
      <td>
        <p>Име:</p>    
      </td>
      <td>
      <input className="dateSale" id="name_patient" type="text" onChange={props.findPatient}></input>
      </td>
      <td>
        <p>Презиме:</p>    
      </td>
      <td>
      <input className="dateSale" id="lastName_patient" type="text" onChange={props.findPatient}></input>
      </td>
      <td>
        <p>ЛБО:</p>    
      </td>
      <td>
      <input className="dateSale" id="lbo_patient" type="text" onChange={props.findPatient}></input>
      </td>
    </table>

    <p/>
    <table className="New_room_list">
      <thead>
        <tr>
          <th>ИМЕ</th>
          <th>ПРЕЗИМЕ</th>
          <th>ЛБО</th>
        </tr>
      </thead>
      <tbody className="tbody_pageAdmin_n">
        {props.generateTableData}
      </tbody>
    </table>
    </div>
    );
}
export default PatientList;