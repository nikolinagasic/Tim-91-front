import React from 'react';
import Radium from 'radium' 
import './ClinicSearch.css' 

const SearchComponent = (props) => {
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
                        <option>Сви типови</option>
                        <option>Стоматологија</option>
                    </select>
                </div>

                <div className="headerSearchOcena">
                    <p>Оцена</p>
                    <input type="number" min="1" max="10" placeholder="1 - 10"
                        id="headerSearchClinicOcena"></input>
                </div>

                <button id="searchClinic" onClick={props.search}>Претражи</button>
            </form>
            <form className="bodySearchClinic">
                <button id="filterClinic" hidden>Филтрирај</button>
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