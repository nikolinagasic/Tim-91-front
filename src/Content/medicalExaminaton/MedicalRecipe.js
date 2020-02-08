import React, { Component } from 'react';

class MedicalRecipe extends Component{

    constructor(props){
        super(props);
        this.state = {
            doctorInfo : ""
        };
        this.doctorName();
    }



   doctorName = () => {
     var doctor_id = this.props.doctor_id;
     const url = 'http://localhost:8081/doctor/getDoctorById/' + doctor_id;
     const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
     };
      fetch(url, options)
     .then(responseWrapped => responseWrapped.json())
     .then(response => {
        console.log("RESPONSE");
        console.log(response);
        let temp = response;
        let info = temp.firstName + " " + temp.lastName;
        this.setState({
             doctorInfo: info
        });
     });

   }

   clickSaveRecipe = (event) =>{
        event.preventDefault();
        let temp1 = document.getElementById("sifraDijagnozeInputJ").value;
        let temp2 = document.getElementById("sifraLekaInputJ").value;
        let temp3 = document.getElementById("nazivLekaInputJ").value;
        let temp4 = document.getElementById("selectInputJ").value;
        let temp5 = document.getElementById("nameDoctorInputJ").value;
        let temp = {
            sifraDijagnoze : temp1,
            sifraLeka : temp2,
            nazivLeka : temp3,
            nacinKoriscenja : temp4,
            overen : false,
            doctor_name : temp5
        }
        const url = 'http://localhost:8081/medicalrecipe/save_recipe';
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
                alert("Рецепт је сачуван!")
           } else {
                alert("Грешка при чувању!");
          }
        });



   }


  render(){
    console.log("usao sam u render");
    return(
       
         <div>
            <div className="divMedicalRecipeEntryJ" style={{
             display: this.props.show ? 'block' : 'none'
             }}>
             <h3>Рецепт за лек</h3>
             <form onSubmit={this.clickSaveRecipe}>
                <table>
                    <tbody>
                       <tr>
                           <td>Шифра лека:</td>
                           <td><input type="text" id="sifraLekaInputJ" name="sifraLekaInputJ" defaultValue={this.props.sifraLeka} disabled="true"/></td>
                       </tr>
                       <tr>
                           <td>Шифра дијагнозе:</td>
                           <td><input type="text" id="sifraDijagnozeInputJ" name="sifraDijagnozeInputJ" defaultValue={this.props.sifraDijagnoze} disabled="true"/></td>
                       </tr>
                       <tr>
                           <td>Рп:</td>
                           <td><input type="text" id="nazivLekaInputJ" name="nazivLekaInputJ" defaultValue={this.props.nazivLeka} disabled="true"/></td>
                       </tr>
                       <tr>
                           <td>С:</td>
                           <td>
                               <select id="selectInputJ" name="selectInputJ" >
                                  <option value="2x1">2x1</option>
                                  <option value="3x1">3x1</option>
                                  <option value="1x1">1x1</option>
                                  <option value="1x1/4">1x1/4</option>
                                  <option value="1x1/2">1x1/2</option>
                               </select>
                           </td>
                       </tr>
                       <tr></tr>
                       <tr>
                           <td></td>
                           <td></td>
                           <td>Име и презиме лекара:</td>
                       </tr>
                       <tr>
                           <td></td>
                           <td></td>
                           <td><input type="text" id="nameDoctorInputJ" name="nameDoctorInputJ" defaultValue={this.state.doctorInfo} disabled="true"/></td>
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
}

export default MedicalRecipe;