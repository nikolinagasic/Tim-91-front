import React, { Component } from 'react';
import imgFind from "../Images/filter.png"
import SelectBox from "../SelectBox.js"


const ScheduleDoctors = (props) => {
    return (
      <div className="New_doctor_list_page">
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