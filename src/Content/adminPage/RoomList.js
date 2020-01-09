import React from 'react'
import imgFind from "../Images/find.png"

const RoomList = (props) => {
  
    return(
    <div className="divModalSale">
     
       <h4 className="h4Tittle">Списак сала</h4>
       <table className="formSearchDate">
         <td></td>
        <td>
          <p >Датум:</p>
        </td>
        <td>
          <input className="dateSale" type="date" min="2019-12-20" max="2020-02-12"></input>    
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