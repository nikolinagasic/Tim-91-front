import React from 'react'

const RoomList = (props) => {
  
    return(
    <div className="divProfileAdmin">
    <table id="formSearch"> 
    
      <td>
        <p>Назив сале:</p>    
      </td>
      <td>
      <input type="text" name="name_room" onChange={props.changeHandler}></input>
      </td>
      <td>
        <p>Број сале:</p>    
      </td>
      <td>
      <input type="text" name="number_room" onChange={props.changeHandler}></input>
      </td>
      <td>
      <button id="btnRoom">Пронађи</button>
      </td>
      <td>
      <button onClick={props.addRoom} id="btnRoom">Додај</button>
      </td>
    </table>

    <p/>
    <table className="New_room_list">
      <thead>
        <tr>
          <th>НАЗИВ</th>
          <th>БРОЈ</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody className="tbody_pageAdmin_n">
        {props.generateTableDataRooms}
      </tbody>
    </table>
    </div>
    );
}
export default RoomList;