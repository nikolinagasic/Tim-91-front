import React, { Component } from 'react';
import './MedicalHistory.css'


const MedicalHistory= (props) => {
       let medicalReviewId = null; 
      
      //generisemo tabelu izvestaja gde je moguce neki pregledati/neko izmeniti
       let generateTableOfReviews = () => {
          let res = [];
          let tableData = props.list_reviews; 
          if (tableData != null) {
           for (var i = 0; i < tableData.length; i++) {      
             let dozvola = tableData[i].couldChange;
             let dugme;
             medicalReviewId =  tableData[i].reviewId;   
             if(dozvola===true){
                 dozvola = "измена"
                 dugme = <button onClick={props.clickChangeReview}>{dozvola}</button>;
             }else{
                 dozvola = "преглед"
                 dugme = <button onClick={props.clickShowReview}>{dozvola}</button>;
             }
             let d = new Date(tableData[i].date);
             let dateTerm = d.toDateString();                                    
             res.push(
               <tr key={tableData[i].date+1}>
                   <td key={tableData[i].date} >{dateTerm}</td>
                   <td key={tableData[i].firstName+tableData[i].lastName} >{tableData[i].firstName+" "+tableData[i].lastName}</td>
                   <td key={tableData[i].firstName+tableData[i].date}>{dugme}</td>
               </tr>
              )
           }
         } 
         return res;
        }
       

    return( 
        <div>
           <div className="divMedicalHistoryJ" style={{
              display: props.show ? 'block' : 'none'
            }}>
            <h3>Историја пегледа пацијента</h3>
            <form className="bodyMedicalHistoryJ">
                <table id="table_reviewsJ">
                    <thead>
                         <th>Датум прегледа</th>
                         <th>Лекар који је обавио преглед</th>
                         <th>Дозвољено</th>
                    </thead>
                    <tbody>
                         {generateTableOfReviews()}
                    </tbody>
                </table>
           <input type="hidden" id="medicalHistoryReviewJ" name="medicalHistoryReviewJ" value={medicalReviewId}></input>
           </form>
           </div>
        </div>
    );


}

export default MedicalHistory;