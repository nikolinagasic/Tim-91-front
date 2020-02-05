import React from 'react'
import './PatientHistory.css';

const PatientHistoryComponent = (props) => {
    return (
        <div id="a_mainDiv_patHistComp">
            <div>
                <h2>Клинике</h2>
                <table id="a_tableClinic_patHistComp">
                    <thead>
                        <tr>
                            <th>Назив</th>
                            <th>Адреса</th>
                            <th>Град</th>
                            <th>Просечна оцена</th>
                            <th>Оцени</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.generateTableKlinike}
                    </tbody>
                </table>
            </div>

            <div>
                <h2>Доктори</h2>
                <table id="a_tableDoctor_patHistComp">
                    <thead>
                        <tr>
                            <th>Име</th>
                            <th>Презиме</th>
                            <th>Тип прегледа</th>
                            <th>Клиника</th>
                            <th>Оцени</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.generateTableDoktori}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PatientHistoryComponent;