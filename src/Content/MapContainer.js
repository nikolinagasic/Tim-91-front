import React, { Component } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

const position = [51.505, -0.09]

class MapContainer extends Component {
    render() {
        return (
            <LeafletMap
        center={[45.261920, 19.836100]}
        zoom={15}
        maxZoom={25}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.25}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={[45.262920,19.835100]}>
          <Popup>
            Моја клиника, Булевар Ослобођења 50
          </Popup>
        </Marker>
      </LeafletMap>
        );
    }
}

export default MapContainer;