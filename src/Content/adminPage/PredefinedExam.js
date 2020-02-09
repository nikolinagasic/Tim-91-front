import React from 'react'
import "./PredefinedExam.css" 

const PredefinedExam = (props) => {
    return(
        <div id="a_mainDiv_predefinedExam">
            <h1 id="a_naslov_predefinedExam">Дефинисање прегледа</h1>

            <div id="a_postaviParametre_predefinedExam">
                <form>
                    <table id="a_table_predefinedExam">
                        <tr>
                            <th>Датум прегледа:*</th>
                            <td><input type="date"
                                id="a_date_predefinedExam" /></td>
                        </tr>
                        <tr>
                            <th>Сатница:*</th>
                            <select className="a_select_predefinedExam"
                                 id="a_selectSatnica_predefinedExam"
                                 onClick={props.clickSatnica}>
                                {props.generateSatnica}
                            </select>
                        </tr>
                        <tr>
                            <th>Сала:*</th>
                            <select className="a_select_predefinedExam"
                                 id="a_selectRoom_predefinedExam">
                                {props.generateRooms}
                            </select>
                        </tr>
                        <tr>
                            <th>Тип прегледа:*</th>
                            <select className="a_select_predefinedExam" 
                                id="a_selectType_predefinedExam"
                                onChange={props.changeTip}
                                >
                                {props.generateTypes}
                            </select>
                        </tr>
                        <tr>
                            <th>Лекар:*</th>
                            <select className="a_select_predefinedExam" 
                                id="a_selectDoctors_predefinedExam"
                                onClick={props.changeLekar}
                                >
                                {props.generateDoctors}
                            </select>
                        </tr>
                        <tr>
                            <th>Цена (рсд):*</th>
                            <input type="text"
                                className="a_text_predefinedExam"  
                                onChange = {props.validate}
                                id="a_cena_predefinedExam"/>
                        </tr>
                        <tr>
                            <th>Попуст (%):*</th>
                            <input type="text"
                                className="a_text_predefinedExam"
                                onChange = {props.validate}  
                                id="a_popust_predefinedExam"/>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <input type="submit" value="Пошаљи" onClick={props.send}></input>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
            <div id="a_buttons_predefinedExam">

            </div>
        </div>
    );
}

export default PredefinedExam;