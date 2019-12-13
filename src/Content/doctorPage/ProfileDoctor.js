import React, { Component } from 'react';

const ProfileDoctor = (props) => {
      return (
        <div>
      <div className="divProfileDoctor" style={{
            display: props.show ? 'block' : 'none'
          }}> 
          <table id="tabProfileDoctor">
            <tr>
              <th>Адреса E-поште</th>
              <td onClick={props.clickZabrana.bind(this, 'mail')}>{props.pat.mail}</td>
            </tr>
            <tr>
              <th>Име</th>
              <td onClick={props.clickIzmena.bind(this, 'ime')}>{props.pat.firstName}</td>
            </tr>
            <tr>
              <th>Презиме</th>
              <td onClick={props.clickIzmena.bind(this, 'prezime')}>{props.pat.lastName}</td>
            </tr>
            <tr>
              <th>Област</th>
              <td onClick={props.clickIzmena.bind(this, 'област')}>{props.pat.field}</td>
            </tr>
            <tr>
              <th>Клиника</th>
              <td onClick={props.clickZabrana.bind(this, 'klinika')}>{props.pat.clinic}</td>
            </tr>
            <tr>
              <td colspan="2" id="btnSifraDoctorTd">
                <button id="btnSifraDoctor" onClick={props.clickSifra}> Промени лозинку </button>
              </td>
            </tr>
          </table>
        </div>
    </div>
  );
}

export default ProfileDoctor;