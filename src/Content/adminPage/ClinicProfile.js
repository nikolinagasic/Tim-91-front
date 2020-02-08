import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


const ClinicProfile = (props) => {
  const renderMarkers = (map, maps) => {
    let marker = new maps.Marker({
    position: { lat: props.lat, lng: props.lng },
    map,
    title: props.clinic.name
    });
    return marker;
   };

  return (
    <div>
  <div className="divProfileAdmine" style={{
        display: props.show ? 'block' : 'none'
      }}> 
      <table>
        <td>
          <button onClick={props.report} id="btnReport">Извештај о пословању</button>
        </td>
        <td>
          <button onClick={props.priceList} id="btnCenovnik">Ценовник</button>
        </td>
      </table>
<p/>
      <table id="tabProfileAdmin">
        
        <tr>
          <th>Назив клинике</th>
          <td onClick={props.clickZabrana.bind(this, 'klinika')}>{props.clinic.name}</td>
        </tr>
        <tr>
          <th>Адреса</th>
          <td onClick={props.clickIzmena.bind(this, 'adresa')}>{props.clinic.address}</td>
        </tr>
        <tr>
          <th>Опис</th>
          <td onClick={props.clickIzmena.bind(this, 'opis')}>{props.clinic.description}</td>
        </tr>
        <tr>
          <th>Оцена</th>
          <td onClick={props.clickZabrana.bind(this, 'ocena')}>{props.clinic.rating}</td>
        </tr>
      </table>
      <div style={{ width: "40vw", height: "30vh" }}>
      <GoogleMapReact
      bootstrapURLKeys={{
        key: "AIzaSyC_QzFcCy6guhPDfHhEohbYHXBndMIJ8FU", 
        language: 'en'
     }}
        defaultCenter={{lat: props.lat, lng: props.lng}}
        center={{lat: props.lat, lng: props.lng}}
        defaultZoom= {15}
        onChildMouseEnter={this.onChildMouseEnter}
        onChildMouseLeave={this.onChildMouseLeave}
        onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
      >
         </GoogleMapReact> 
      </div>
    </div>
    </div>
);
}

export default ClinicProfile;