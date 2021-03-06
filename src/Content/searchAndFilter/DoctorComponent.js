import React from 'react'
import filterG from '../Images/filterG.png'; 

const DoctorComponent = (props) => {
    let showFilter = false;

    let filter_click = () => {
        if(showFilter == true){
            showFilter = false;
            document.getElementById("div_filter_doctor").style.display = 'none';
        }
        else{
            showFilter = true;
            document.getElementById("div_filter_doctor").style.display = 'block';
        }
    }

    return(
        <div>
            <p id="back_to_clinics" onClick={props.back}>Прикажи клинике</p>
            
            <form className="headerSearchDoctor">
                <div className="headerSearchDate">
                    <p>Име лекара:</p>
                    <input type="text"
                        onChange={props.change}
                        id="headerSearchDoctorFirstName"
                        placeholder="Унесите..."></input>
                </div>

                <div className="headerSearchSelect">
                    <p>Презиме лекара:</p>
                    <input type="text"
                    onChange={props.change}
                        id="headerSearchDoctorLastName"
                        placeholder="Унесите..."></input>
                </div>

                <div className="headerSearchOcena">
                    <p>Просечна оцена</p>
                    <input type="number"
                        onChange={props.change}
                        min="1" max="10" placeholder="1 - 10"
                        id="headerSearchDoctorOcena"></input>
                </div>
                <img src={filterG} alt="Филтер" 
                    className="filter_doctor_img" 
                    onClick={filter_click}/>
            </form>
            <div id="div_filter_doctor">
                <h4 className="h4_filter_clinic_doctor">Филтрирање доктора:</h4>
                <form id="filter_options_doctor">
                    <div>
                    Оцена : 
                    <input type="number" placeholder="Од -"
                        id="filter_doctor_ocenaOd"
                        onChange={props.changeFilter}></input>
                    <input type="number" placeholder="- До"
                        id="filter_doctor_ocenaDo"
                        onChange={props.changeFilter}></input>
                    </div>
                </form>
            </div>
            <form className="bodySearchDoctor">
                <table>
                    <thead>
                        <th>Име</th>
                        <th>Презиме</th>
                        <th>Просечна оцена</th>
                        <th>Листа термина</th>    
                    </thead>        
                    <tbody>
                        {props.generateTable}
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default DoctorComponent;