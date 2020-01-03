import React from 'react';

const DoctorList = (props) => {
    return (
      <div className="divProfileAdmin">
      <form className="formSearch" name="findForm" onSubmit={props.mySubmit}>
        <table>
          <tr>
            <td>
              <p>Име:</p>    
            </td>
            <td>      
              <input id="ime"></input>
            </td>
            <td>
              <p>Презиме:</p>
            </td>
            <td>
              <input id="prezime"></input>
            </td>
          </tr>
        </table>     
        <input type="submit" id="id_submit" value="Пронађи"></input>
        <p/>
      </form>
        <table className="New">
          <thead>
            <tr>
              <th>ИМЕ</th>
              <th>ПРЕЗИМЕ</th>
              <th>ОБЛАСТ</th>
              <th>АДРЕСА Е-ПОШТЕ</th>
            </tr>
          </thead>
          <tbody>
            {props.generateTableData}
          </tbody>
        </table>
      </div>
    );
}

export default DoctorList;