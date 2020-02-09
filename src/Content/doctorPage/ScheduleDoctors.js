import React, { Component } from 'react';
import imgFind from "../Images/filter.png"
import SelectBox from "../SelectBox.js"


const ScheduleDoctors = (props) => {
  if (props.examination) {
   var examination = (<h3>Заказивање прегледа</h3>);
  } else {
    var examination = (<h3>Заказивање операција</h3>);
  }

    return (
      <div className="New_doctor_list_page">
        {examination}
          <h4 className="h4Tittle">Изабери лекара</h4>    

        <table className="formSearch" name="findForm">
          <td>
            <img src={imgFind} alt="Пронађи"/>   
            </td>        
            <td>
              <p>Тип прегледа:</p>    
            </td>
            <td >
                <SelectBox
                 name="hidden_id"
                 items={props.list_box}>
                >                 
                </SelectBox>
            </td>
            <td><button id="btnRoom" onClick={props.filterDoctors}>Прикажи</button></td>
            
            
        </table>     
        <p/>

        <table className="New_doctor_list">
          <thead>
            <tr>
              <th>ИМЕ</th>
              <th>ПРЕЗИМЕ</th>
              <th>ТИП ПРЕГЛЕДА</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="tbody_pageAdmin_n">
            {props.generateTableData}
          </tbody>
        </table>
        <p/>
      </div>
    );
}

export default ScheduleDoctors;