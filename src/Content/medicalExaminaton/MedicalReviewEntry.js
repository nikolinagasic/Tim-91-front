import React, { Component } from 'react';


const MedicalReviewEntry = (props) => {
    
    return(

        <div>
             <div className="divMedicalReviewEntryJ" style={{
              display: props.show ? 'block' : 'none'
              }}>
                <h3>Извештај лекара</h3>
                <form onSubmit={props.clickSaveEntry}>
                    <table>
                       <tbody>
                           <tr>
                               <td>Датум:</td>
                               <td><input type="date" id="enterDatumJ" name="enterDatumJ" /></td>
                           </tr>
                           <tr>
                               <td>Налаз:</td>
                               <td><textarea rows="2" id="enterNalazJ" name="enterNalazJ" /></td>
                           </tr>
                           <tr>
                               <td>Дијагноза:</td>
                               <td onClick={props.clickDiagnosisEntry}><input type="text" id="enterDiagnosisJ" name="enterDiagnosisJ"/></td>
                           </tr>
                           <tr>
                               <td>Tерапија:</td>
                               <td onClick={props.clickCuresEntry}><textarea rows="2" id="enterTerapijaJ" name="enterTerapijaJ"/></td>
                           </tr>
                           <tr>
                               <td><input type="submit" id="enterSubmitJ" value="Сачувај"/></td>
                           </tr>
                       </tbody>
                    </table>
                </form>
             </div>
        </div>

    );
}

export default MedicalReviewEntry;