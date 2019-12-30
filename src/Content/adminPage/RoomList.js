import React from 'react'

const RoomList = (props) => {
  
    return(
    <div className="divProfileAdmin">
    <table id="notTable"> 
    
      <td>
        <p>Број сале:</p>    
      </td>
      <td>
      <input type="text" name="num_room"></input>
      </td>
      <td>
        <p>Назив сале:</p>    
      </td>
      <td>
      <input type="text" name="name_room"></input>
      </td>
      <td>
      <button id="btnTip">Пронађи</button>
      </td>
      <td>
      <button id="btnTip">Додај нову салу</button>
      </td>
    </table>

    <p/>
    <table className="New">
      <thead>
        <tr>
          <th>БРОЈ</th>
          <th>НАЗИВ</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.generateTableDataRooms}
      </tbody>
    </table>
    </div>
    );
}
export default RoomList;