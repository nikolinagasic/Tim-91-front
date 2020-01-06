import React from 'react'

const RoomList = (props) => {
  
    return(
    <div className="divModalSale">
     
       <h4 className="h4Tittle">Списак сала</h4>
      
    <table className="formSearch">
      
      <tr>
        <td></td>
        <td>
          <p className="glupiBroj">Датум:</p>
        </td>
        <td>
          <input className="dateSale" type="date" min="2019-12-20" max="2020-02-12"></input>    
        </td>
        <td></td>
      </tr>
      <tr>
      <td>
        <p>Назив:</p>    
      </td>
      <td>
      <input className="dateSale" id="name_room" type="text" onChange={props.findRoom}></input>
      </td>
      <td>
        <p className="glupiBroj">Број:</p>    
      </td>
      <td>
      <input className="dateSale" id="number_room" type="text" onChange={props.findRoom}></input>
      </td>
      <td>
      </td>
      <td>
      <button onClick={props.addRoom} id="btnRoom">Додај</button>
      </td>
      </tr>
    </table>

    <p/>
    <table className="New_sale_list">
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