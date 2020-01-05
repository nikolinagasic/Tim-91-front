import React from 'react';
import Radium from 'radium';
import './ClinicSearch.css';
import filterG from '../Images/filterG.png'; 

const SearchComponent = (props) => {
    let showFilter = false;

    let filter_click = () => {
        if(showFilter == true){
            showFilter = false;
            document.getElementById("div_filter_clinic").style.display = 'none';
        }
        else{
            showFilter = true;
            document.getElementById("div_filter_clinic").style.display = 'block';
        }
    }

    return(
        <div>
            <form className="headerSearchClinic">
                <div className="headerSearchDate">
                    <p>Датум прегледа:</p>
                    <input type="date" min="2019-12-20" max="2020-02-12"
                        id="headerSearchClinicDate"></input>
                </div>

                <div className="headerSearchSelect">
                    <p>Тип прегледа:</p>
                    <select id="headerSearchClinicTip">
                        {props.generateOption}
                    </select>
                </div>

                <div className="headerSearchOcena">
                    <p>Оцена</p>
                    <input type="number" min="1" max="10" placeholder="1 - 10"
                        id="headerSearchClinicOcena"></input>
                </div>

                <button id="searchClinic" onClick={props.search}>Претражи</button>
            <img src={filterG} alt="Филтер" 
                className="filter_clinic_img" 
                onClick={filter_click}/>
            </form>
            <div id="div_filter_clinic">
                <h4 className="h4_filter_clinic_doctor">Филтрирање клиника:</h4>
                <form id="filter_options_clinic">
                <div>
                    Цена : 
                    <input type="number" placeholder="Од -"
                        id="filter_clinic_cenaOd"
                        onChange={props.change}></input>
                    <input type="number" placeholder="- До"
                        id="filter_clinic_cenaDo"
                        onChange={props.change}></input>
                
                    Оцена : 
                    <input type="number" placeholder="Од -"
                        id="filter_clinic_ocenaOd"
                        onChange={props.change}></input>
                    <input type="number" placeholder="- До"
                        id="filter_clinic_ocenaDo"
                        onChange={props.change}></input>

                    Назив : 
                    <input type="text" placeholder="Унесите..."
                        id="filter_clinic_naziv"
                        onChange={props.change}></input>
                </div>
            </form>

            </div>
            <form className="bodySearchClinic">
                <table>
                    <thead>
                        <th>Назив клинике</th>
                        <th>Просечна оцена</th>
                        <th>Адреса клинике</th>
                        <th>Цена прегледа</th>    
                    </thead>        
                    <tbody>
                        {props.generateTable}
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default Radium(SearchComponent);