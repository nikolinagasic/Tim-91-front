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
          <td >{props.pat.mail}</td>
        </tr>
        <tr>
          <th>Клиника</th>
          <td>{props.pat.clinic}</td>
        </tr>
      </table>
    </div>
    </div>
);
}

export default ProfileAdmin;