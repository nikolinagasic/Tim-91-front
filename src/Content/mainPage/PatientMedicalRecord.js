import React from 'react';

const PatientMedicalRecord = (props) => {
    return (
      <div>
        <div className="divProfilePatient" style={{
              display: props.show ? 'block' : 'none'
            }}> 
            <table id="tabProfilePatient">
              <tr>
                <th>Visina:</th>
                <td>{props.pat.height}</td>
              </tr>
              <tr>
                <th>Tezina:</th>
                <td>{props.pat.weight}</td>
              </tr>
              <tr>
                <th>Dioptrija-desno oko:</th>
                <td>{props.pat.dioptreRightEye}</td>
              </tr>
              <tr>
                <th>Dioptrija-levo oko:</th>
                <td>{props.pat.dioptreLeftEye}</td>
              </tr>
              <tr>
                <th>Krvna grupa:</th>
                <td>{props.pat.bloodGroup}</td>
              </tr>
              <tr>
                <th>Alergija:</th>
                <td>{props.pat.allergy}</td>
              </tr>
            </table>
          </div>
      </div>
    );
  }
  
  export default PatientMedicalRecord;