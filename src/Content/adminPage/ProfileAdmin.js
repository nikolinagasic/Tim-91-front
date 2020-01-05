import React, { Component } from 'react';

const ProfileAdmin = (props) => {
  return (
    <div>
  <div className="divProfileAdmin" style={{
        display: props.show ? 'block' : 'none'
      }}> 
      <table id="tabProfileAdmin">
        <tr>
          <th>Адреса E-поште</th>
          <td onClick={props.clickZabrana.bind(this, 'mail')}>{props.admin.mail}</td>
        </tr>
        <tr>
          <th>Клиника</th>
          <td onClick={props.clickZabrana.bind(this, 'klinika')}>{props.admin.clinic}</td>
        </tr>
        <tr>
          <th>Име</th>
          <td onClick={props.clickIzmena.bind(this, 'ime')}>{props.admin.firstName}</td>
        </tr>
        <tr>
          <th>Презиме</th>
          <td onClick={props.clickIzmena.bind(this, 'prezime')}>{props.admin.lastName}</td>
        </tr>
        <tr>
          <th>Адреса</th>
          <td onClick={props.clickIzmena.bind(this, 'adresa')}>{props.admin.address}</td>
        </tr>
        <tr>
          <th>Град</th>
          <td onClick={props.clickIzmena.bind(this, 'grad')}>{props.admin.city}</td>
        </tr>
        <tr>
          <th>Држава</th>
          <td onClick={props.clickIzmena.bind(this, 'drzava')}>{props.admin.country}</td>
        </tr>
        <tr>
          <th>Телефон</th>
          <td onClick={props.clickIzmena.bind(this, 'telefon')}>{props.admin.telephone}</td>
        </tr>
      </table>
    </div>
    </div>
);
}

export default ProfileAdmin;