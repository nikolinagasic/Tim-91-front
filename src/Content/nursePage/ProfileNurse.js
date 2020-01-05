import React from 'react';


const ProfileNurse = (props) => {
  return (
    <div>
  <div className="divProfileNurse" style={{
        display: props.show ? 'block' : 'none'
      }}> 
      <table id="tabProfileNurse">
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
          <th>Клиника</th>
          <td onClick={props.clickZabrana.bind(this, 'klinika')}>{props.pat.clinic}</td>
        </tr>
        <tr>
          <td colspan="2" id="btnSifraNurseTd">
            <button id="btnSifraNurse" onClick={props.clickSifra}> Промени лозинку </button>
          </td>
        </tr>
      </table>
    </div>
</div>
);
}

export default ProfileNurse;