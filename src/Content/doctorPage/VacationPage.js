import React from 'react';
import {UserContext} from '../../UserProvider'


const VacationPage = (props) => {
  var today = new Date(new Date() + 1);
  var day = ("0" + today.getDate()).slice(-2);
  var month = ("0" + (today.getMonth() + 1)).slice(-2);
  var today = today.getFullYear()+"-"+(month)+"-"+(day) ;
  return (
    <div>
      <div className="divProfileDoctor"> 
                <h4 className="h4Tittle">
                 Пошаљи захтев за годишњи одмор
                </h4> 
                <table > 
                <tr>
                <td>Од:</td>
                <td><input className="dateSale" id="datefield" type="date" min={today} ></input></td>
                <td>До:</td>
                <td><input className="dateSale" id="datefield1" type="date" min={today}></input></td>
                <tr><button id="btnRoom" onClick={props.sendVacation}>Пошаљи</button></tr>
                    </tr>        
              </table>
              
        </div>
    </div>
  );
  
}

export default VacationPage;