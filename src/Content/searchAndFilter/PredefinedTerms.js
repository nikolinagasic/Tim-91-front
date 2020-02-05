import React from 'react'
import './ClinicProfile.css';

const PredefinedTerm = (props) => {

    return (
        <div className="a_div_clinic_profile">
            <p className="a_back_to_clinics" onClick={props.back}>Назад на профил клинике</p>

            <h1 id="a_h1_unapredDef">Унапред дефинисани термини</h1>
            <div>
                <table id="a_table_predefinedTerm">
                    <thead>
                        <tr><th>Датум прегледа</th>
                            <th>Сатница</th>
                            <th>Назив сале</th>
                            <th>Лекар</th>
                            <th>Тип прегледа</th>
                            <th>Цена</th>
                            <th>Попуст</th>
                            <th>Резервиши</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.generateTable}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PredefinedTerm;