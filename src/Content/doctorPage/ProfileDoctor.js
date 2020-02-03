import React from 'react';

const ProfileDoctor = (props) => {
  let workShift = props.pat.workShift;
  let smena;
  if (workShift == 1) {
    smena = "Пре подне";
  } else {
    smena = "После подне";
  }
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
              <th>Тип прегледа</th>
              <td onClick={props.clickZabrana.bind(this, 'tip')}>{props.pat.tip}</td>
            </tr>
            <tr>
              <th>Клиника</th>
              <td onClick={props.clickZabrana.bind(this, 'klinika')}>{props.pat.clinic}</td>
            </tr>
            <tr>
              <th>Оцена</th>
              <td onClick={props.clickZabrana.bind(this, 'ocena')}>{props.pat.rating}</td>
            </tr>
            <tr>
              <th>Смена</th>
              <td onClick={props.clickZabrana.bind(this, 'smena')}>{smena}</td>
            </tr>
            <tr>
            <td colspan="2" id="btnSifraDoctorTd">
                <button id="btnChangePassword" onClick={props.clickSifra}> Промени лозинку </button>
              </td>
            </tr>
          </table>
        </div>
    </div>
  );
}

export default ProfileDoctor;