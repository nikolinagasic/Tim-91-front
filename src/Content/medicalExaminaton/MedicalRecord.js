import React, { Component } from 'react';

const MedicalRecord = (props) => {
 // console.log("U PROFILU"+props.pat.mail)
  return (
    <div>
      <div className="divMedicalRecord" style={{
         display: props.show ? 'block' : 'none'
         }}> 
        <table id="ttabMedicalRecord">
         <tbody>
         <tr>
             <th> Адреса E-поште</th>
             <td onClick={props.clickZabrana.bind(this, 'mail')}>{props.pat.mail}</td>
         </tr>
         <tr>
             <th> Ime </th>
             <td onClick={props.clickZabrana.bind(this, 'firstName')}>{props.pat.firstName}</td>
         </tr>
         <tr>
             <th> Prezime </th>
             <td onClick={props.clickIzmena.bind(this, 'lastName')}>{props.pat.lastName}</td>
         </tr>
         <tr>
             <th> Visina </th>
             <td onClick={props.clickIzmena.bind(this, 'height')}>{props.pat.height}</td>
         </tr>
         <tr>
             <th> Tezina </th>
             <td onClick={props.clickIzmena.bind(this, 'weight')}>{props.pat.weight}</td>
         </tr>
         <tr>
             <th> Dioptrija-desno oko </th>
             <td onClick={props.clickIzmena.bind(this, 'dioptreRightEye')}>{props.pat.dioptreRightEye}</td>
         </tr>
         <tr>
             <th> Dioptrija-levo oko </th>
             <td onClick={props.clickIzmena.bind(this, 'dioptreLeftEye')}>{props.pat.dioptreLeftEye}</td>
         </tr>
         <tr>
             <th> Krvna grupa </th>
             <td onClick={props.clickIzmena.bind(this, 'bloodGroup')}>{props.pat.bloodGroup}</td>
         </tr>
         <tr>
             <th> Alergije </th>
             <td onClick={props.clickIzmena.bind(this, 'allergy')}>{props.pat.allergy}</td>
         </tr>
         </tbody>
        </table>
      </div>
    </div>
 );
}

export default MedicalRecord;