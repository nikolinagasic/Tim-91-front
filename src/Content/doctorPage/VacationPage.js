import React from 'react';
import {UserContext} from '../../UserProvider'


const VacationPage = (props) => {
    
  return (
    <div>
      <div className="divProfileDoctor"> 
                <h4 className="h4Tittle">
                 Пошаљи захтев за годишњи одмор
                </h4> 
                <table > 
                <tr>
                <td>Од:</td>
                <td><input className="dateSale" id="datefield" type="date" ></input></td>
                <td>До:</td>
                <td><input className="dateSale" id="datefield1" type="date"></input></td>
                <tr><button id="btnRoom" onClick={props.sendVacation}>Пошаљи</button></tr>
                    </tr>        
              </table>
              
        </div>
    </div>
  );
  
}

export default VacationPage;