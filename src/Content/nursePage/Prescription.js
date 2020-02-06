import React, { Component } from 'react';

class Prescription extends Component{

    constructor(props){
        super(props);
    }


    clickOveri = (recept) => {
       // event.preventDefault();
        console.log("klik na overu");
        console.log(recept);
        let recipe_id = recept;
        let tableData = this.props.list_cures; 
        let temp = {
            id : tableData[recipe_id].id,
            sifraDijagnoze : tableData[recipe_id].sifraDijagnoze,
            sifraLeka : tableData[recipe_id].sifraLeka,
            nazivLeka : tableData[recipe_id].nazivLeka,
            nacinKoriscenja : tableData[recipe_id].nacinKoriscenja,
            overen : true,
            doctor_name : tableData[recipe_id].doctor_name,
            id_nurse : this.props.id_nurse
        }
        console.log(temp);
        const url = 'http://localhost:8081/medicalrecipe/overi';
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
                alert("Рецепт је оверен!")
                this.props.osveziStranicu();
           } else {
                alert("Грешка при чувању!");
          }
        });

    }


    generateTableOfCures = () => {
        let res = [];
        let tableData = this.props.list_cures; 
        if (tableData != null) {
         for (var i = 0; i < tableData.length; i++) {                                    
           res.push(
             <tr key={tableData[i].sifraLeka+1}>
                 <td key={tableData[i].sifraLeka} >{tableData[i].sifraLeka}</td>
                 <td key={tableData[i].nazivLeka} >{tableData[i].nazivLeka}</td>
                 <td key={tableData[i].nacinKoriscenja}>{tableData[i].nacinKoriscenja}</td>
                 <td key={tableData[i].doctor_name}>{tableData[i].doctor_name}</td>
                 <td><button id = "button" onClick={this.clickOveri.bind(this,i)}>Overi</button></td>
             </tr>
            )
         }
       } 
       return res;
      }



    render(){
        return(
            
            <div>
                <div className="divPrescriptionJ" style={{
                display: this.props.show ? 'block' : 'none'
                }}>
                <h3>Overavanje recepata</h3>
                   <form className="bodyMedicalHistoryJ">
                      <table id="table_reviewsJ">
                        <thead>
                           <th>Sifra leka</th>
                           <th>Naziv leka</th>
                           <th>Nacin koriscenja</th>
                           <th>Propisao lekar</th>
                           <th></th>
                        </thead>
                        <tbody>
                           {this.generateTableOfCures()}
                        </tbody>
                      </table>
                     </form>
                </div>
            </div>

        );
    }
}

export default Prescription;