import React from 'react'

const AppointmentType = (props) => {
  
    return(
    <div className="divProfileAdmin">
    <table>
      <td>
      <input id="name" type="text"></input>
      </td>
      <td>
      <button id="add" onClick={props.addType}>Додај нови тип</button>
      </td>
    </table>
    <p/>
    <table className="tip">
      <thead>
        <tr>
          <th>ТИП ПРЕГЛЕДА</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.generateTableDataTypes}
      </tbody>
    </table>
    </div>
    );
}
export default AppointmentType;