import React, { Component } from 'react';
import './New.css'

const PriceList = (props) => {
    return (
      <div className="divProfileAdmine">
              <h4 className="h4Tittle">Ценовник</h4>

        <table className="New_room_list">
          <thead>
            <tr>
              <th>ИМЕ</th>
              <th>ПРЕЗИМЕ</th>
              <th>ТИП ПРЕГЛЕДА</th>
              <th>ЦЕНА</th>
              <th>ОЦЕНА</th>
            </tr>
          </thead>
          <tbody className="tbody_pageAdmin_n">
            {props.generatePriceList}
          </tbody>
        </table>
        <p/>
      </div>
    );
}

export default PriceList;