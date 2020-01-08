import React from 'react'
import './ClinicProfile.css';

const ClinicProfile = (props) => {
        
    return(
        <div className="a_div_clinic_profile">
            <p id="a_back_to_clinics" onClick={props.back}>Прикажи клинике</p>
            
            <h1>"{props.name}"</h1>            
            <h3>Просечна оцена: <em>{props.rating}</em></h3>
            
            <h2 className="a_grad_opstina_inline">Адреса: <em>{props.address}</em></h2>
            <h2 className="a_grad_opstina_inline">Град/општина: <em>{props.location}</em></h2>

            <p></p>
            <div id="a_div_opis_clinicProfile">
                <h2 className="a_opis_clinicProfile_inline">Опис:</h2>
                <textarea className="a_opis_clinicProfile_inline"
                    rows="7" cols="70">{props.description}</textarea>
            </div>

            <div id="a_div_pretraga_clinicProfile">
                <form className="headerSearchDoctor">
                    <div className="headerSearchDate">
                        <p>Име лекара:</p>
                        <input type="text"
                            onChange={props.changeClinicProfile}
                            id="a_name_doctor_clinicProfile"
                            placeholder="Унесите..."></input>
                    </div>

                    <div className="headerSearchSelect">
                        <p>Презиме лекара:</p>
                        <input type="text"
                            onChange={props.changeClinicProfile}
                            id="a_lastName_doctor_clinicProfile"
                            placeholder="Унесите..."></input>
                    </div>

                    <div className="headerSearchOcena">
                        <p>Просечна оцена</p>
                        <input type="number"
                            onChange={props.changeClinicProfile}
                            min="1" max="10" placeholder="1 - 10"
                            id="a_ocena_doctor_clinicProfile"></input>
                    </div>

                    <div className="headerSearchDate">
                        <p>Датум прегледа:</p>
                        <input type="date"
                            onChange={props.changeClinicProfile}
                            min="2019-12-20" max="2020-02-12"
                            id="a_date_doctor_clinicProfile"></input>
                    </div>

                    <div className="headerSearchSelect" id="aa_headerSearchSelect">
                        <p>Тип прегледа:</p>
                        <select id="a_select_doctor_clinicProfile"
                                onChange={props.changeClinicProfile}>
                            {props.generateOption}
                        </select>
                    </div>

                    <form className="bodySearchDoctor" id="aa_bodySearchDoctor">
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
                </form>
            </div>
        </div>
    );
}

export default ClinicProfile;