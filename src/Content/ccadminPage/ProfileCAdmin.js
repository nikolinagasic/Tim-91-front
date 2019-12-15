import React, { Component } from 'react';

const ProfileCAdmin = (props) => {
 // console.log("U PROFILU"+props.pat.mail)
  return (
    <div>
      <div className="divProfileCAdmin" style={{
         display: props.show ? 'block' : 'none'
         }}> 
        <table id="tabProfileCAdmin">
         <tbody>
         <tr>
             <th> Адреса E-поште</th>
             <td>{props.pat.mail}</td>
         </tr>
         </tbody>
        </table>
      </div>
    </div>
 );
}

export default ProfileCAdmin;