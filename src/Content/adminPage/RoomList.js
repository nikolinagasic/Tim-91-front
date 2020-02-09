import React from 'react'
import imgFind from "../Images/find.png"

const RoomList = (props) => {
  var today = new Date(new Date() + 1);
  var day = ("0" + today.getDate()).slice(-2);
  var month = ("0" + (today.getMonth() + 1)).slice(-2);
  var today = today.getFullYear()+"-"+(month)+"-"+(day) ;
    return(
    <div className="divModalSale">
     
       <h4 className="h4Tittle">Списак сала</h4>
       <table className="formSearchDate">
         <td></td>
        <td>
          <p >Датум:</p>
        </td>
        <td>
          <input id="date_room" className="dateSale" type="date" min={today}></input>    
        </td>
        <td></td>
      </table>
    <table className="formSearchSale">
    <td>
            <img id="imgFindType" src={imgFind} alt="Пронађи"/>   
            </td>
      <td>
        <p>Назив:</p>    
      </td>
      <td>
      <input className="dateSale" id="name_room" type="text" onChange={props.findRoom}></input>
      </td>
      <td>
        <p>Број:</p>    
      </td>
      <td>
      <input className="dateSale" id="number_room" type="text" onChange={props.findRoom}></input>
      </td>
      
      <td>
      <button onClick={props.addRoom} id="btnRoom">Додај салу</button>
      </td>
    </table>

    <p/>
    <table className="New_sale_list">
      <thead>
        <tr>
          <th>ИД</th>
          <th>НАЗИВ</th>
          <th>ПРВИ СЛОБОДАН ДАТУМ</th>
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