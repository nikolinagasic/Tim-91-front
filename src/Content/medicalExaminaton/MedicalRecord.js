import React, { Component } from 'react';

const MedicalRecord = (props) => {
  return (
    <div>
      <div className="divMedicalRecord" style={{
         display: props.show ? 'block' : 'none'
         }}> 
        <table id="tabMedicalRecord">
         <tbody>
         <tr>
             <th> Адреса E-поште</th>
             <td onClick={props.clickZabrana.bind(this, 'mail')}>{props.pat.patientMail}</td>
         </tr>
         <tr>
             <th> Име </th>
             <td onClick={props.clickZabrana.bind(this, 'firstName')}>{props.firstName}</td>
         </tr>
         <tr>
             <th> Презиме </th>
             <td onClick={props.clickZabrana.bind(this, 'lastName')}>{props.lastName}</td>
         </tr>
         <tr>
             <th> Висина </th>
             <td onClick={props.clickIzmena.bind(this, 'height')}>{props.pat.height}</td>
         </tr>
         <tr>
             <th> Тежина </th>
             <td onClick={props.clickIzmena.bind(this, 'weight')}>{props.pat.weight}</td>
         </tr>
         <tr>
             <th> Диоптрија-десно око </th>
             <td onClick={props.clickIzmena.bind(this, 'dioptreRightEye')}>{props.pat.dioptreRightEye}</td>
         </tr>
         <tr>
             <th> Диоптрија-лево око </th>
             <td onClick={props.clickIzmena.bind(this, 'dioptreLeftEye')}>{props.pat.dioptreLeftEye}</td>
         </tr>
         <tr>
             <th> Крвна група </th>
             <td onClick={props.clickIzmena.bind(this, 'bloodGroup')}>{props.pat.bloodGroup}</td>
         </tr>
         <tr>
             <th> Aлергије </th>
             <td onClick={props.clickIzmena.bind(this, 'allergy')}>{props.pat.allergy}</td>
         </tr>
         </tbody>
        </table>
      </div>
    </div>
 );
}

export default MedicalRecord;