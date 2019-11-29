import React, { Component } from 'react';

class ProfilePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: this.props.location.state.detail.mail,
      firstName: this.props.location.state.detail.firstName,
      lastName: this.props.location.state.detail.lastName,
      address: this.props.location.state.detail.address,
      city: this.props.location.state.detail.city,
      country: this.props.location.state.detail.country,
      lbo: this.props.location.state.detail.lbo,
      telephone: this.props.location.state.detail.telephone
    };
  }

    render() {
      return (
        <div>
            <table border="1">
              <tr><td>Email</td>
                <td>{this.state.mail}</td>
              </tr>
              <tr><td>Ime</td>
                <td>{this.state.firstName}</td>
              </tr>
              <tr><td>Prezime</td>
                <td>{this.state.lastName}</td>
              </tr>
              <tr><td>Adresa</td>
                <td>{this.state.address}</td>
              </tr>
              <tr><td>Grad</td>
                <td>{this.state.city}</td>
              </tr>
              <tr><td>Drzava</td>
                <td>{this.state.country}</td>
              </tr>
              <tr><td>LBO</td>
                <td>{this.state.lbo}</td>
              </tr>
              <tr><td>Telefon</td>
                <td>{this.state.telephone}</td>
              </tr>
            </table>
        </div>
      );
    }
}

export default ProfilePatient;