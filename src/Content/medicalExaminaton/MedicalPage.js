import React, { Component } from 'react';
import './MedicalPage.css'


class MedicalPage extends Component{
   constructor(props) {
       super(props);
       this.state = {
          patient_mail : this.props.location.state.detail,
          isZdravstveniKarton : false,
          isIstorijaBolesti : false,
          isUnosIzvestaja : false,
          isUnosRecepta : false,
          isZakazi : false,

          medical_record : null,
          firstName : "",
          lastName : ""

       };      
   }


   ClickZdravstveniKarton = (event) => {
        console.log("klik na karton");
        document.getElementById("logo_img").style.visibility = "hidden";
        let mail = this.state.patient_mail;
        const url = 'http://localhost:8081/medicalrecord/getRecord/' + mail;
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
           this.setState({
             medical_record: response,
             isZdravstveniKarton : true,
             isIstorijaBolesti : false,
             isUnosIzvestaja : false,
             isUnosRecepta : false,
             isZakazi : false,
          });
          console.log(this.state.medical_record);
        });
       
   }



   clickIstorijaBolesti = (event) => {
      alert("Radi se");
   }
  


   clickUnosIzvestaja = (event) => {
      alert("Radi se");
   }
   


   clickUnosRecepta = (event) => {
      alert("Radi se");
   }



   ClickZakazi = (event) => {
      alert("Radi se");
   }


   
   render(){
      
       return(
          <div className="main_div">
               <ul id="unordered_list" className="ul_list">
                 <li className="li_list"><a
                 id="id_zdravstveniKarton"
                 onClick={this.ClickZdravstveniKarton}> Zdravstveni karton </a></li>
                 <li className="li_list"><a
                 id="id_istorijaBolesti"
                 onClick={this.clickIstorijaBolesti}> Istorija bolesti </a></li>
                 <li className="li_list"><a
                 id="id_unosIzvestaja"
                 onClick={this.clickUnosIzvestaja}> Unos izvestaja </a></li>
                 <li className="li_list"><a
                 id="id_unosRecepta"
                 onClick={this.clickUnosRecepta}> Unos recepta </a></li>
                 <li className="li_list"><a
                 id="id_zakazi"
                 onClick={this.ClickZakazi}> Zakazi </a></li>
               </ul>
          </div>
       );
   }

}

export default MedicalPage;