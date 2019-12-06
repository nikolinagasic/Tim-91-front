import React, { Component } from 'react';

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: this.props.location.state.detail.mail,
      firstName: this.props.location.state.detail.firstName,
      lastName: this.props.location.state.detail.lastName,
      field: this.props.location.state.detail.field,
      role: this.props.location.state.detail.role,
      clinic: this.props.location.state.detail.clinic,
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
              <tr><td>Field</td>
                <td>{this.state.address}</td>
              </tr>
              <tr><td>Role</td>
                <td>{this.state.role}</td>
              </tr>
              <tr><td>Clinic</td>
                <td>{this.state.clinic}</td>
              </tr>
            </table>
        </div>
      );
    }
}

export default ProfileDoctor;