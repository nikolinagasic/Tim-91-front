import React from 'react'
import DoctorSearch from './DoctorSearch';
import filter from '../Images/filter.png';
import filtered from '../Images/filtered.png'; 
import filterG from '../Images/filterG.png'; 

const DoctorComponent = (props) => {
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
            </form>
            <div>
                <img src={filterG} alt="Филтер" className="filter_doctor_img"/>
            </div>
            <form className="bodySearchDoctor">
                <button id="filterClinic" hidden>Филтрирај</button>
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