import React, { Component } from 'react';


const MedicalReviewEntry = (props) => {
    
    return(

        <div>
             <div className="divMedicalReviewEntryJ" style={{
              display: props.show ? 'block' : 'none'
              }}>
                <h3>Izvestaj lekara</h3>
                <form onSubmit={props.clickSaveEntry}>
                    <table>
                       <tbody>
                           <tr>
                               <td>
                               <td>Datum:</td>
                               <td><input type="text" id="enterDatumJ" name="enterDatumJ" style={{marginLeft : "25px"}}/></td>
                               </td>
                           </tr>
                           <tr>
                              <td>
                               <td>Nalaz:</td>
                               <td><textarea rows="2" id="enterNalazJ" name="enterDatumJ" /></td>
                               </td>
                           </tr>
                           <tr>
                               <td>
                               <td>Dijagnoza:</td>
                               <td><input type="text" id="enterDijagnozaJ" name="enterDijagnozaJ"/></td>
                               <td>Terapija:</td>
                               <td><input type="text" id="enterTerapijaJ" name="enterTerapijaJ"/></td>
                               </td>
                           </tr>
                           <tr>
                               <td><input type="submit" id="enterSubmitJ" value="Sacuvaj"/></td>
                           </tr>
                       </tbody>
                    </table>
                </form>
             </div>
        </div>

    );
}

export default MedicalReviewEntry;