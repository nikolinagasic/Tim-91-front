import React from 'react'

const ReserveList = (props) => {
  
    return(
    <div className="divProfileAdmin">
        <table>
            <td>
                <button onClick={props.clickRooms}>САЛЕ</button>
            </td>
        </table>
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
        {}
      </tbody>
    </table>
    </div>
    );
}
export default ReserveList;