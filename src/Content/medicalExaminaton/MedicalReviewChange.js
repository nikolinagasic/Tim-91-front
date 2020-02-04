import React, { Component } from 'react';
import ModalAwesome from 'react-awesome-modal';


class MedicalReviewChange extends Component{
    constructor(props){
        super(props);
    }

     
    clickZabrana = (polje) => {
        console.log(polje);
        if(polje === 'date'){
          alert('Није могуће мењати вредност поља датума.');
        }
    }


  
    clickSaveChangeEntry = (event) => {
        event.preventDefault();
        let temp1 = document.getElementById("enterNalazChangeJ").value;
        let temp2 = document.getElementById("enterDiagnosisChangeJ").value;
        let temp3 = document.getElementById("enterTerapijaChangeJ").value;
        //pravim objekat sa novim podacima i saljem na beck
        let temp = {  //objekat koji saljemo na beck
            id : this.props.reviewData.id,
            date: this.props.reviewData.date,
            medicalResults: temp1,
            diagnosis: temp2,
            therapy: temp3,
            patient_mail: this.props.reviewData.patient_mail,
            doctor_id: this.props.reviewData.doctor_id
        }
        console.log(temp); 
        const url = 'http://localhost:8081/medicalreview/changeReview';
        const options = {
           method: 'POST',
           headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(temp)
        };
        fetch(url, options)
        .then(response => {
           console.log(response.status);
           if (response.status == 201) {
                alert("Извештај је сачуван!")
           } else {
                alert("Грешка при чувању!");
          }
        });


    }
 
 
 
 
    render(){

      return(

        <div>
             <div className="divMedicalReviewJ" style={{
              display: this.props.show ? 'block' : 'none'
              }}>
                <h3>Извештај лекара</h3>
                <form onSubmit={this.clickSaveChangeEntry}>
                    <table>
                       <tbody>
                           <tr>
                               <td>Датум:</td>
                               <td onClick={this.clickZabrana.bind(this, 'date')}><input type="text" id="enterDatumChangeJ" name="enterDatumChangeJ" value={this.props.dateForm}/></td>
                           </tr>
                           <tr>                            
                               <td>Налаз:</td>
                               <td><textarea rows="2" id="enterNalazChangeJ" name="enterNalazChangeJ" defaultValue={this.props.reviewData.medicalResults}/></td>                             
                           </tr>
                           <tr>                     
                               <td>Дијагноза:</td>
                               <td onClick={this.props.clickDiagnosisEntry}><input type="text" id="enterDiagnosisChangeJ" name="enterDiagnosisChangeJ" defaultValue={this.props.reviewData.diagnosis}/></td>                            
                           </tr>
                           <tr>                               
                               <td>Терапија:</td>
                               <td onClick={this.props.clickCuresEntry}><textarea rows="2" id="enterTerapijaChangeJ" name="enterTerapijaChangeJ" defaultValue={this.props.reviewData.therapy}/></td>                               
                           </tr>
                           <tr>
                               <td><input type="submit" id="enterSubmitChangeJ" value="Сачувај измене" /></td>
                           </tr>
                       </tbody>
                    </table>
                </form>
             </div>
             
        </div>
     );
   }
}                          

export default MedicalReviewChange;