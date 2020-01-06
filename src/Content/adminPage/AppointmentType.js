import React from 'react'
import imgFind from "../Images/find.png"

const AppointmentType = (props) => {
  
    return(
    <div className="divProfileAdmine">
    <table id="notTable"> 
    <td>
      <img id ="imgFindType" src={imgFind} alt="Пронађи"/>
      </td>
      <td>
        <p>Назив типа:</p>    
      </td>
      <td>
      <input className="dateSale" id="name_type" type="text" name="name_type" onChange={props.findType}></input>
      </td>
      
      <td>
      <button onClick={props.addType} id="btnTip">Додај нови тип</button>
      </td>
    </table>

    <p/>
    <table className="tip">
      <thead>
        <tr>
          <th>ТИП ПРЕГЛЕДА</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody className="tbody_pageAdmin_n">
        {props.generateTableDataTypes}
      </tbody>
    </table>
    </div>
    );
}
export default AppointmentType;