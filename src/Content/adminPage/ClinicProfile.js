import React, { Component } from 'react';

const ClinicProfile = (props) => {
  return (
    <div>
  <div className="divProfileAdmine" style={{
        display: props.show ? 'block' : 'none'
      }}> 
            <button id="btnReport">Извештај о пословању</button>
<p/>
      <table id="tabProfileAdmin">
        
        <tr>
          <th>Назив клинике</th>
          <td onClick={props.clickZabrana.bind(this, 'klinika')}>{props.clinic.name}</td>
        </tr>
        <tr>
          <th>Адреса</th>
          <td onClick={props.clickIzmena.bind(this, 'adresa')}>{props.clinic.address}</td>
        </tr>
        <tr>
          <th>Опис</th>
          <td onClick={props.clickIzmena.bind(this, 'opis')}>{props.clinic.description}</td>
        </tr>
        <tr>
          <th>Оцена</th>
          <td onClick={props.clickZabrana.bind(this, 'ocena')}>{props.clinic.rating}</td>
        </tr>
      </table>
    </div>
    </div>
);
}

export default ClinicProfile;