import React from 'react'

const ReserveList = (props) => {
  
    return(
    <div className="divProfileAdmine">
      <table>
        <td>
    <h4 className="h4Tittle">Захтеви за прегледе</h4>  
    </td>
    <td>
      <button id="btnPrikaziZahteve">Прикажи захтеве за операције</button>
    </td>
    </table>
    <table className="New_room_list">
      <thead>
        <tr>
          <th>ДАТУМ</th>
          <th>ВРЕМЕ</th>
          <th>ДОКТОР</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="tbody_pageAdmin_n">
        {props.generateTableDataTerms}
      </tbody>
    </table>
    </div>
    );
}
export default ReserveList;