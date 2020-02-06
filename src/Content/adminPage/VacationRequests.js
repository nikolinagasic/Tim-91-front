import React from 'react'

const VacationRequests = (props) => {
  
    return(
    <div className="divProfileAdmine">
      
    <h4 className="h4Tittle">Захтеви за годишњи одмор</h4>  
   
    <table className="New_room_list">
      <thead>
        <tr>
          <th>ИМЕ</th>
          <th>ПРЕЗИМЕ</th>
          <th>ПОЧЕТАК</th>
          <th>КРАЈ</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="tbody_pageAdmin_n">
        {props.generateVacation}
      </tbody>
    </table>
    </div>
    );
}
export default VacationRequests;