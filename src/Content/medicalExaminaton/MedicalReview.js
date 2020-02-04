import React, { Component } from 'react';


const MedicalReview = (props) => {
    return(
        <div>
             <div className="divMedicalReviewJ" style={{
              display: props.show ? 'block' : 'none'
              }}>
                <h3>Извештај лекара</h3>
                <table id="tableMedicalReviewJ">
                    <tbody>
                           <tr>
                               <td>
                               <td>Датум:</td>
                               <td><input type="text" disabled="true" id="enterDatumRJ" name="enterDatumRJ" value={props.dateForm} style={{marginLeft : "25px"}  }/></td>
                               </td>
                           </tr>
                           <tr>
                              <td>
                               <td>Налаз:</td>
                               <td><textarea rows="2" disabled="true" id="enterNalazRJ" name="enterNalazRJ" value={props.reviewData.medicalResults} /></td>
                               </td>
                           </tr>
                           <tr>
                               <td>
                               <td>Дијагноза:</td>
                               <td><input type="text" disabled="true" id="enterDiagnosisRJ" name="enterDiagnosisRJ" value={props.reviewData.diagnosis}/></td>
                               </td>
                           </tr>
                           <tr>
                               <td>
                               <td>Tерапија:</td>
                               <td><textarea rows="2" disabled="true" id="enterTerapijaRJ" name="enterTerapijaRJ" value={props.reviewData.therapy}/></td>
                               </td>
                           </tr>
                    </tbody>
                </table> 
             </div>
        </div>

    );
}

export default MedicalReview;