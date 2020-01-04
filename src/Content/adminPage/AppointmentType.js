import React from 'react'

const AppointmentType = (props) => {
  
    return(
    <div className="divProfileAdmin">
    <table id="notTable"> 
    
      <td>
        <p>Назив типа:</p>    
      </td>
      <td>
      <input type="text" name="name_type" onChange={props.changeTypeHandler}></input>
      </td>
      <td>
      <button id="btnTip">Пронађи</button>
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