import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import moment from 'moment';



const Report = (props) => {
     
    let current =  moment();
    let before = moment(current).subtract(1, 'week');
    let daniPrihod = [{name:before.format('dddd'), uv: props.reportDetail.daniPrihod[0], amt: 1},
    {name: (before.add(1,'day')).format('dddd'), uv: props.reportDetail.daniPrihod[1], amt: 2},
    {name: (before.add(1,'day')).format('dddd'), uv: props.reportDetail.daniPrihod[2], amt: 3},
    {name: (before.add(1,'day')).format('dddd'), uv: props.reportDetail.daniPrihod[3], amt: 4},
    {name: (before.add(1,'day')).format('dddd'), uv: props.reportDetail.daniPrihod[4], amt: 5},
    {name: (before.add(1,'day')).format('dddd'), uv: props.reportDetail.daniPrihod[5], amt: 6},
    {name: (before.add(1,'day')).format('dddd'), uv: props.reportDetail.daniPrihod[6], amt: 7}];
    const  renderDaniPrihod = (
        <LineChart width={600} height={300} data={daniPrihod}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
      </LineChart>
    );
   
    let currentDate =  moment();
    let beforeWeek = moment(currentDate).subtract(1, 'month');
    let mesecPrihod = [{name: '', uv:  props.reportDetail.mesecPrihod[0], amt: 1},
    {name: '', uv: props.reportDetail.mesecPrihod[1], amt: 2},
    {name: '', uv: props.reportDetail.mesecPrihod[2], amt: 3},
    {name: '', uv: props.reportDetail.mesecPrihod[3], amt: 4},
    {name: '', uv: props.reportDetail.mesecPrihod[4], amt: 5},
    {name: '', uv: props.reportDetail.mesecPrihod[5], amt: 6},
    {name: '', uv: props.reportDetail.mesecPrihod[6], amt: 7},
    {name: '', uv: props.reportDetail.mesecPrihod[7], amt: 8},
    {name: '', uv: props.reportDetail.mesecPrihod[8], amt: 9},
    {name: '', uv: props.reportDetail.mesecPrihod[9], amt: 10},
    {name: '', uv: props.reportDetail.mesecPrihod[10], amt: 11},
    {name: '', uv: props.reportDetail.mesecPrihod[11], amt: 12},
    {name: '', uv: props.reportDetail.mesecPrihod[12], amt: 13},
    {name: '', uv: props.reportDetail.mesecPrihod[13], amt: 14},
    {name: '', uv: props.reportDetail.mesecPrihod[14], amt: 15},
    {name: '', uv: props.reportDetail.mesecPrihod[15], amt: 16},
    {name: '', uv: props.reportDetail.mesecPrihod[16], amt: 17},
    {name: '', uv: props.reportDetail.mesecPrihod[17], amt: 18},
    {name: '', uv: props.reportDetail.mesecPrihod[18], amt: 19},
    {name: '', uv: props.reportDetail.mesecPrihod[19], amt: 20},
    {name: '', uv: props.reportDetail.mesecPrihod[20], amt: 21},
    {name: '', uv: props.reportDetail.mesecPrihod[21], amt: 22},
    {name: '', uv: props.reportDetail.mesecPrihod[22], amt: 23},
    {name: '', uv: props.reportDetail.mesecPrihod[23], amt: 24},
    {name: '', uv: props.reportDetail.mesecPrihod[24], amt: 25},
    {name: '', uv: props.reportDetail.mesecPrihod[25], amt: 26},
    {name: '', uv: props.reportDetail.mesecPrihod[26], amt: 27},
    {name: '', uv: props.reportDetail.mesecPrihod[27], amt: 28},
    {name: '', uv: props.reportDetail.mesecPrihod[28], amt: 29},
    {name: '', uv: props.reportDetail.mesecPrihod[29], amt: 30}];

    const  renderMesecPrihod = (
        <LineChart width={600} height={300} data={mesecPrihod}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
      </LineChart>
    );
   
    let currentMonth =  moment();
    let beforeMonth = moment(currentMonth).subtract(1, 'year');
    let godinaPrihod = [{name: '', uv: props.reportDetail.godinaPrihod[0], amt: 1},
    {name: '', uv: props.reportDetail.godinaPrihod[1], amt: 2},
    {name: '', uv: props.reportDetail.godinaPrihod[2], amt: 3},
    {name: '', uv: props.reportDetail.godinaPrihod[3], amt: 4},
    {name: '', uv: props.reportDetail.godinaPrihod[4], amt: 5},
    {name: '', uv: props.reportDetail.godinaPrihod[5], amt: 6},
    {name: '', uv: props.reportDetail.godinaPrihod[6], amt: 7},
    {name: '', uv: props.reportDetail.godinaPrihod[7], amt: 8},
    {name: '', uv: props.reportDetail.godinaPrihod[8], amt: 9},
    {name: '', uv: props.reportDetail.godinaPrihod[9], amt: 10},
    {name: '', uv: props.reportDetail.godinaPrihod[10], amt: 11},
    {name: '', uv: props.reportDetail.godinaPrihod[11], amt: 12}];
    const  renderGodinaPrihod = (
        <LineChart width={600} height={300} data={godinaPrihod}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
      </LineChart>
    ); ///////////////////////////////////////////////////////////////////////
    current =  moment();
    before = moment(current).subtract(1, 'week');
    let daniPregledi = [{name:before.format('dddd'), uv: props.reportDetail.daniPregledi[0], amt: 1},
    {name: (before.add(1,'day')).format('dddd'), uv: props.reportDetail.daniPregledi[1], amt: 2},
    {name: (before.add(1,'day')).format('dddd'), uv: props.reportDetail.daniPregledi[2], amt: 3},
    {name: (before.add(1,'day')).format('dddd'), uv: props.reportDetail.daniPregledi[3], amt: 4},
    {name: (before.add(1,'day')).format('dddd'), uv: props.reportDetail.daniPregledi[4], amt: 5},
    {name: (before.add(1,'day')).format('dddd'), uv: props.reportDetail.daniPregledi[5], amt: 6},
    {name: (before.add(1,'day')).format('dddd'), uv: props.reportDetail.daniPregledi[6], amt: 7}];
    const  renderDaniPregledi = (
        <LineChart width={600} height={300} data={daniPregledi}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
      </LineChart>
    );
   
    currentDate =  moment();
    beforeWeek = moment(currentDate).subtract(1, 'month');
    let mesecPregledi = [{name: '', uv:  props.reportDetail.mesecPregledi[0], amt: 1},
    {name: '', uv: props.reportDetail.mesecPregledi[1], amt: 2},
    {name: '', uv: props.reportDetail.mesecPregledi[2], amt: 3},
    {name: '', uv: props.reportDetail.mesecPregledi[3], amt: 4},
    {name: '', uv: props.reportDetail.mesecPregledi[4], amt: 5},
    {name: '', uv: props.reportDetail.mesecPregledi[5], amt: 6},
    {name: '', uv: props.reportDetail.mesecPregledi[6], amt: 7},
    {name: '', uv: props.reportDetail.mesecPregledi[7], amt: 8},
    {name: '', uv: props.reportDetail.mesecPregledi[8], amt: 9},
    {name: '', uv: props.reportDetail.mesecPregledi[9], amt: 10},
    {name: '', uv: props.reportDetail.mesecPregledi[10], amt: 11},
    {name: '', uv: props.reportDetail.mesecPregledi[11], amt: 12},
    {name: '', uv: props.reportDetail.mesecPregledi[12], amt: 13},
    {name: '', uv: props.reportDetail.mesecPregledi[13], amt: 14},
    {name: '', uv: props.reportDetail.mesecPregledi[14], amt: 15},
    {name: '', uv: props.reportDetail.mesecPregledi[15], amt: 16},
    {name: '', uv: props.reportDetail.mesecPregledi[16], amt: 17},
    {name: '', uv: props.reportDetail.mesecPregledi[17], amt: 18},
    {name: '', uv: props.reportDetail.mesecPregledi[18], amt: 19},
    {name: '', uv: props.reportDetail.mesecPregledi[19], amt: 20},
    {name: '', uv: props.reportDetail.mesecPregledi[20], amt: 21},
    {name: '', uv: props.reportDetail.mesecPregledi[21], amt: 22},
    {name: '', uv: props.reportDetail.mesecPregledi[22], amt: 23},
    {name: '', uv: props.reportDetail.mesecPregledi[23], amt: 24},
    {name: '', uv: props.reportDetail.mesecPregledi[24], amt: 25},
    {name: '', uv: props.reportDetail.mesecPregledi[25], amt: 26},
    {name: '', uv: props.reportDetail.mesecPregledi[26], amt: 27},
    {name: '', uv: props.reportDetail.mesecPregledi[27], amt: 28},
    {name: '', uv: props.reportDetail.mesecPregledi[28], amt: 29},
    {name: '', uv: props.reportDetail.mesecPregledi[29], amt: 30}];

    const  renderMesecPregledi = (
        <LineChart width={600} height={300} data={mesecPregledi}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
      </LineChart>
    );
   
    currentMonth =  moment();
    beforeMonth = moment(currentMonth).subtract(1, 'year');
    let godinaPregledi =[{name: '', uv: props.reportDetail.godinaPregledi[0], amt: 1},
    {name: '', uv: props.reportDetail.godinaPregledi[1], amt: 2},
    {name: '', uv: props.reportDetail.godinaPregledi[2], amt: 3},
    {name: '', uv: props.reportDetail.godinaPregledi[3], amt: 4},
    {name: '', uv: props.reportDetail.godinaPregledi[4], amt: 5},
    {name: '', uv: props.reportDetail.godinaPregledi[5], amt: 6},
    {name: '', uv: props.reportDetail.godinaPregledi[6], amt: 7},
    {name: '', uv: props.reportDetail.godinaPregledi[7], amt: 8},
    {name: '', uv: props.reportDetail.godinaPregledi[8], amt: 9},
    {name: '', uv: props.reportDetail.godinaPregledi[9], amt: 10},
    {name: '', uv: props.reportDetail.godinaPregledi[10], amt: 11},
    {name: '', uv: props.reportDetail.godinaPregledi[11], amt: 12}];
    const  renderGodinaPregledi = (
        <LineChart width={600} height={300} data={godinaPregledi}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
      </LineChart>
    );
    return (
      <div className="divProfileAdmine">
            
        <table>
          <tr>
    <td> <h4 >Просечна оцена лекара:</h4></td>
            <td>{Math.round((props.ratingDoctor + Number.EPSILON) * 100) / 100}</td>
          </tr>
          <tr>
    <td> <h4>Просечна оцена клинике:</h4></td>
            <td>{Math.round((props.ratingClinic + Number.EPSILON) * 100) / 100}</td>
          </tr>
        </table>
        <p/>
        <h4 className="h4Tittle">График прихода на дневном, месечном и годишњем нивоу</h4>
        {renderDaniPrihod}
        {renderMesecPrihod}
        {renderGodinaPrihod}
        <h4 className="h4Tittle">График прегледа на дневном, месечном и годишњем нивоу</h4>
        {renderDaniPregledi}
        {renderMesecPregledi}
        {renderGodinaPregledi}
      </div>
    );
}

export default Report;