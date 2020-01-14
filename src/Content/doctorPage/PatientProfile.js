import React from 'react';
import {UserContext} from '../../UserProvider'

const PatientProfile = (props) => {
  return (
    <div>
      <div style={{
            display: props.show ? 'block' : 'none'
          }}> 
              <table id="tabProfileDoc">
                <tr>
                  <th>E-пошта</th>
                  <td>{props.pat.mail}</td>
                </tr>
                <tr>
                  <th>Име</th>
                  <td>{props.pat.firstName}</td>
                </tr>
                <tr>
                  <th>Презиме</th>
                  <td>{props.pat.lastName}</td>
                </tr>
                <tr>
                  <th>Адреса</th>
                  <td>{props.pat.address}</td>
                </tr>
                <tr>
                  <th>Град</th>
                  <td>{props.pat.city}</td>
                </tr>
                <tr>
                  <th>Држава</th>
                  <td>{props.pat.country}</td>
                </tr>
                <tr>
                  <th>ЛБО</th>
                  <td>{props.pat.lbo}</td>
                </tr>
                <tr>
                  <th>Телефон</th>
                  <td>{props.pat.telephone}</td>
                </tr>          
              </table>
            
        </div>
    </div>
  );
}

export default PatientProfile;