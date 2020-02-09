import React, { Component } from 'react';


const MedicalReview = (props) => {
    return(
        <div>
             <div className="divMedicalReviewJ" style={{
              display: props.show ? 'block' : 'none'
              }}>
                <h3>Извештај лекара</h3>
                <table>
                    <tbody>
                           <tr>
                               <td>Датум:</td>
                               <td><input type="text" disabled="true" id="enterDatumRJ" name="enterDatumRJ" value={props.dateForm} /></td>
                           </tr>
                           <tr>
                               <td>Налаз:</td>
                               <td><textarea rows="2" disabled="true" id="enterNalazRJ" name="enterNalazRJ" value={props.reviewData.medicalResults} /></td>
                           </tr>
                           <tr>
                               <td>Дијагноза:</td>
                               <td><input type="text" disabled="true" id="enterDiagnosisRJ" name="enterDiagnosisRJ" value={props.reviewData.diagnosis}/></td>
                           </tr>
                           <tr>
                               <td>Tерапија:</td>
                               <td><textarea rows="2" disabled="true" id="enterTerapijaRJ" name="enterTerapijaRJ" value={props.reviewData.therapy}/></td>
                           </tr>
                    </tbody>
                </table> 
             </div>
        </div>

    );
}

export default MedicalReview;