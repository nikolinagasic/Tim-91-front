import React, { Component } from 'react';
import ProfileCAdmin from './ProfileCAdmin'
import './PageCAdmin.css'
import Request from "./Request"
import RegisterAdmin from "../RegisterAdmin"
import Clinic from "../Clinic"
import Modal from "../Modal"
import Diagnosis from './Diagnosis';



class PageCAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ccadmin: this.props.location.state.detail,
      isProfile: false,
      isRegisterAdmin: false,
      isRegisterClinic: false,
      isRequest: false,
      isDiagnosis: false,
      ispostDiagnosis:false,
      

      modalShowing: false,
      modalIzmena: false,
      modalDeny: false,
      staraVrednost: '',
      changedValue: '',
      headerText: '',
      rejectionReason: '',
      email: '',
      listRequest: null,
      render_list: [],
      post_list:[],

    };
  }

  clickProfile = (event) => {
    //console.log("Klik na profil");
    document.getElementById("logo_img").style.visibility = "hidden";
    this.setState({
      isRegisterAdmin: false
    });
    this.setState({
      isRegisterClinic: false
    });
    this.setState({
      isProfile: true
    });
    this.setState({
      isRequest: false
    });
    this.setState({
      isDiagnosis: false
    });
  }

    clickZabrana = (polje) => {
      console.log(polje);
      if(polje === 'mail'){
        alert('Није могуће мењати вредност поља е-поште.');
      }
    }

    clickIzmena = (naziv, staraVr) => {
      console.log(naziv);
      this.setState({
          modalIzmena: true
      });
      this.setState({changedValue: naziv});
  
      if(naziv === 'ime'){
        this.setState({headerText: "Измена имена"});
        this.setState({staraVrednost: this.state.ccadmin.firstName});
      }
      else if(naziv === 'prezime'){
        this.setState({headerText: "Измена презимена"});
        this.setState({staraVrednost: this.state.ccadmin.lastName});
      }
      else{
        console.log('greska izmena');
      }
   }

  clickRegisterAdmin = (event) => {
    document.getElementById("logo_img").style.visibility = "hidden";
    this.setState({
      isRegisterAdmin: true
    });
    this.setState({
      isRegisterClinic: false
    });
    this.setState({
      isProfile: false
    });
    this.setState({
      isRequest: false
    });
    this.setState({
      isDiagnosis: false
    });
  }

  clickRegisterClinic = (event) => {
    document.getElementById("logo_img").style.visibility = "hidden";
    this.setState({
      isRegisterAdmin: false
    });
    this.setState({
      isRegisterClinic: true
    });
    this.setState({
      isProfile: false
    });
    this.setState({
      isRequest: false
    });
    this.setState({
      isDiagnosis: false
    });
  }

  clickRequest = (event) => {
    event.preventDefault();
    document.getElementById("logo_img").style.visibility = "hidden";
    //preuzimam iz baze listu svih zahteva za registraciju
    console.log('click zahtevi');
    const url = 'http://localhost:8081/ccadmin/requests';
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
        // console.log("RESPONSE");
        // console.log(response);
        this.setState({
          listRequest: response
        });

        this.setState({
          isRegisterAdmin: false
        });
        this.setState({
          isRegisterClinic: false
        });
        this.setState({
          isProfile: false
        });
        this.setState({
          isRequest: true
        });
        this.setState({
          isDiagnosis: false
        });
      });

  }


  //kada se klikne na dugme odobri zahtev za registraciju
  clickHandler1 = (mail) => {
    console.log("KLIK NA DUGME")
    const url = 'http://localhost:8081/ccadmin/accept/' + mail + '/1' +"/nista";
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
    };

    fetch(url, options)
      .then(response => {
        console.log(response.status);
        console.log(response)

        if (response.ok) {
          alert("Pacijentu je odobren zahtev");
          // window.location.reload();
          const url = 'http://localhost:8081/ccadmin/requests';
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
              //console.log("RESPONSE");
              //console.log(response);
              this.setState({
                listRequest: response
              });
            });

        }
      });
  }

  //preuzima iz modalnog razlog odbijanja
  sendRejectionReason = () => {
    this.setState({
      modalDeny: false
    });
    let reason = document.getElementById("reasonValue_input").value;
    this.requestDenied(reason);
  }

  //kada se klikne na odbij zahtev
  clickHandler2 = (mail) => {
    this.setState({
      modalDeny: true
    });
    this.setState({
      email:mail
    });
  }
 
  requestDenied = (reason) => {
    console.log("usao u denied");
    console.log(reason);
    const mail = this.state.email;
    const url = 'http://localhost:8081/ccadmin/accept/' + mail + '/2' +'/' +reason;
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
    };

    fetch(url, options)
      .then(response => {
        console.log(response.status);
        console.log(response)
        if (response.ok) {
          alert("Pacijentu je odbijen zahtev");
          const url = 'http://localhost:8081/ccadmin/requests';
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
              this.setState({
                listRequest: response
              });
            });
        }
      });
  }

  generateTableData(listRequest) {
    //console.log("CRTAM");
    // console.log(listRequest);
    let res = [];
    if (listRequest != null) {
      let tableData = listRequest;
      for (var i = 0; i < tableData.length; i++) {
        res.push(
          <tr >
            <td key={tableData[i].firstName}>{tableData[i].firstName}</td>
            <td key={tableData[i].lastName}>{tableData[i].lastName}</td>
            <td key={tableData[i].email}>{tableData[i].mail}</td>
            <td><button id="button" onClick={this.clickHandler1.bind(this, tableData[i].mail)}>Одобри</button></td>
            <td><button id="button" onClick={this.clickHandler2.bind(this, tableData[i].mail)}>Oдбиј</button></td>
          </tr>
        )
      }
    }
    return res;
  }


  clickAdd = () => {
    this.setState({
      modalShowing: true
    });
  }


  closeModalHandler = () => {
    this.setState({
      modalShowing: false
    });
    this.setState({
      modalIzmena: false
    });
    this.setState({
      modalDeny: false
    });
  }

  sendChangeHandler = () => { //izmena info na profilu
    this.setState({
      modalIzmena: false
    });
    let newValue = document.getElementById("newValue_input").value;
    let changedName = this.state.changedValue;

    const sve_ok = this.promenaState(changedName, newValue);
    if(!sve_ok){
      return;
    }

    let email = this.state.ccadmin.mail;
    //saljemo azuriranog admina na back da te promene sacuvamo u bazi
    const url = 'http://localhost:8081/ccadmin/changeAttribute/'+changedName+"/"+newValue+"/"+email;
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
    };
    fetch(url, options)
    .then(response => {
      console.log(response.ok);
      console.log(response)
      if(response.ok === true){
        alert("Успешно сте изменили поље '" + changedName+"'.");
      }
      else {
        alert("Дошло је до грешке приликом измене поља '" + changedName + "'.");
      }
    });

  }

  promenaState = (nazivAtributa, novaVrednost) => {
    console.log("promena stanja");
     //kopija admina
     const ccadmin = {
       ...this.state.ccadmin
     };
     if(nazivAtributa === 'ime'){
      ccadmin.firstName = novaVrednost;
    }else if(nazivAtributa === "prezime"){
      ccadmin.lastName = novaVrednost;
    }
     // update-uj state
    this.setState({ccadmin : ccadmin});
    return true;
  }

  //generisanje tabele za sifarnik
  generateTableData2() {
    let res = [];
    let tableData = this.state.render_list; //listu iz state preuzmi
    if (tableData != null) {
      for (var i = 0; i < tableData.length; i++) {
        res.push(
          <tr >
            <td key={tableData[i].cure_password}>{tableData[i].cure_password}</td>
            <td key={tableData[i].cure_name}>{tableData[i].cure_name}</td>
            <td key={tableData[i].diagnosis_password}>{tableData[i].diagnosis_password}</td>
            <td key={tableData[i].diagnosis_name}>{tableData[i].diagnosis_name}</td>
          </tr>
        )
      }
    }
    return res;
  }


  clickDiagnosis = () => {
    console.log("dijagnoza");
    //event.preventDefault();
    document.getElementById("logo_img").style.visibility = "hidden";
    //preuzimam iz baze listu svih sifara
    const url = 'http://localhost:8081/ccadmin/diagnosis';
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
        if(response.length>0){
          this.setState({
            render_list: response   
          });
        }
        this.setState({
          isRegisterAdmin: false
        });
        this.setState({
          isRegisterClinic: false
        });
        this.setState({
          isProfile: false
        });
        this.setState({
          isRequest: false
        });
        this.setState({
          isDiagnosis: true
        });
      });
  }

  sendModalHandler = () => {
    console.log("OVDEEEEEEEE");
    this.state.ispostDiagnosis=true; //menjali smo listu sifara pa cemo je morati ubaciti u bazu
    this.setState({
      modalShowing: false
    });
    //preuzimam podatke iz dijaloga i pravim objekat koji ubacujem u listu sifara
    let curePassword = document.getElementById("curePassword_input").value;
    let cureName = document.getElementById("cureName_input").value;
    let diagnosisPassword = document.getElementById("diagnosisPassword_input").value;
    let diagnosisName = document.getElementById("diagnosisName_input").value;
    let temp = {
      cure_password: curePassword,
      cure_name: cureName,
      diagnosis_password: diagnosisPassword,
      diagnosis_name: diagnosisName
    }
    this.postDiagnosis(temp);
    
  }

  //saljem novu dijagnozu i lek na back
  postDiagnosis(temp){
    console.log("U POST");
    const url = 'http://localhost:8081/ccadmin/savediagnosis';
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
          if(response.status==201){
            this.state.ispostDiagnosis=false;
            this.setState({post_list:{}});
          }else{
            alert("Vec postoji ta kombinacija");
          }
          this.clickDiagnosis();
        });
  }


  render() {
    let modalni = null;
    let modalniIzmena = null;
    let modalniDeny = null;
    if (this.state.modalShowing) {  //modalni dijalog za kreiranje kombinacije dijagnoze i leka
      modalni = (
        <Modal
          className="modal"
          show={this.state.modalShowing}
          close={(event) => this.closeModalHandler(event)}
          send={this.sendModalHandler} //posalji    
          header={"Sifarnik dijagnoza i lekova"}     
        >
          <form>
            <p>Sifra leka:</p>
            <input type="text"
              className="input_field"
              id="curePassword_input"></input>
            <p>Naziv leka:</p>
            <input type="text"
              className="input_field"
              id="cureName_input"></input>
            <p>Sifra dijagnoze:</p>
            <input type="text"
              className="input_field"
              id="diagnosisPassword_input"></input>
            <p>Naziv dijagnoze:</p>
            <input type="text"
              className="input_field"
              id="diagnosisName_input"></input>
          </form>
        </Modal>);
    }
    if (this.state.modalIzmena) {  //modalni dijalog za izmenu info o ccadminu 
      modalniIzmena = (
        <Modal
          className="modal"
          show={this.state.modalIzmena}
          close={(event) => this.closeModalHandler(event)}
          send={this.sendChangeHandler}
          header={this.state.headerText}
        >
          <form>
            <p>Стара вредност:</p>
            <input type="text"
              className="input_field"
              value={this.state.staraVrednost}
              disabled></input>
            <p>Нова вредност:</p>
            <input type="text"
              className="input_field"
              id="newValue_input"></input>
          </form>
        </Modal>);

    }

    if(this.state.modalDeny) { //modalni dijalog za unos informacija o odbijanju zahteva za registraciju
      modalniDeny = (
        <Modal
           className="modal"
           show={this.state.modalDeny}
           close={(event) => this.closeModalHandler(event)}
           send={this.sendRejectionReason}
           header="Razlog odbijanja zahteva"
        >
        <form>
          <p>Unesi razlog:</p>
          <input type="text"
             className="input_field"
             id="reasonValue_input"></input>
        </form>
        </Modal>
      );

    }


    let componentRequest = null;
    if (this.state.isRequest) {
      componentRequest = (
        <Request
          generateTableData={this.generateTableData(this.state.listRequest)}
        >
        </Request>
      );
    }

    let registerAdmin = null;
    if (this.state.isRegisterAdmin) {
      registerAdmin = (
        <RegisterAdmin
          pat={this.state.ccadmin}>
        </RegisterAdmin>
      );
    }

    let registerClinic = null;
    if (this.state.isRegisterClinic) {
      registerClinic = (
        <Clinic
          pat={this.state.ccadmin}>
        </Clinic>
      );
    }

    let componentDiagnosis = null;
    if (this.state.isDiagnosis) {
      componentDiagnosis = (
        <Diagnosis
          generateTableData={this.generateTableData2(this.state.render_list)}
          clickAdd={this.clickAdd}
        >
        </Diagnosis>
      );
    }

    return (
      <div className="main_div">
        <ul id="unordered_list" className="ul_list">
          <li className="li_list"><a
            id="profile"
            onClick={this.clickProfile}> Профил корисника </a></li>
          <li className="li_list"><a
            id="register_admin"
            onClick={this.clickRegisterAdmin}> Регистрација администратора </a></li>
          <li className="li_list"><a
            id="register_clinic"
            onClick={this.clickRegisterClinic}> Регистрација клиника </a></li>
          <li className="li_list"><a
            id="request"
            onClick={this.clickRequest}> Захтеви за регистрацију </a></li>
          <li className="li_list"><a
            id="diagnosis"
            onClick={this.clickDiagnosis}> Шифарник дијагноза и лекова </a></li>
        </ul>

        <ProfileCAdmin
          pat={this.state.ccadmin}
          show={this.state.isProfile}
          clickIzmena={this.clickIzmena}
          clickZabrana={this.clickZabrana}>
        </ProfileCAdmin>

        {registerAdmin}
        {registerClinic}
        {componentRequest}
        {componentDiagnosis}
        {modalni}
        {modalniIzmena}
        {modalniDeny}
      </div>
    );
  }
}


export default PageCAdmin;