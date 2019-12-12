import React from 'react';

const ProfilePatient = (props) => {
  return (
    <div>
      <div className="divProfilePatient" style={{
            display: props.show ? 'block' : 'none'
          }}> 
          <table id="tabProfilePatient">
            <tr>
              <th>E-пошта</th>
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
              <th>Адреса</th>
              <td onClick={props.clickIzmena.bind(this, 'adresa')}>{props.pat.address}</td>
            </tr>
            <tr>
              <th>Град</th>
              <td onClick={props.clickIzmena.bind(this, 'grad')}>{props.pat.city}</td>
            </tr>
            <tr>
              <th>Држава</th>
              <td onClick={props.clickIzmena.bind(this, 'drzava')}>{props.pat.country}</td>
            </tr>
            <tr>
              <th>ЛБО</th>
              <td onClick={props.clickZabrana.bind(this, 'lbo')}>{props.pat.lbo}</td>
            </tr>
            <tr>
              <th>Телефон</th>
              <td onClick={props.clickIzmena.bind(this, 'telefon')}>{props.pat.telephone}</td>
            </tr>
            <tr>
              <td colspan="2" id="btnSifraPatientTd">
                <button id="btnSifraPatient" onClick={props.clickSifra}> Промени лозинку </button>
              </td>
            </tr>
          </table>
        </div>
    </div>
  );
}

export default ProfilePatient;