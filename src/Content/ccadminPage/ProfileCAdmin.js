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
             <td onClick={props.clickZabrana.bind(this, 'mail')}>{props.pat.mail}</td>
         </tr>
         <tr>
             <th> Име </th>
             <td onClick={props.clickIzmena.bind(this, 'ime')}>{props.pat.firstName}</td>
         </tr>
         <tr>
             <th> Презиме </th>
             <td onClick={props.clickIzmena.bind(this, 'prezime')}>{props.pat.lastName}</td>
         </tr>
         </tbody>
        </table>
      </div>
    </div>
 );
}

export default ProfileCAdmin;