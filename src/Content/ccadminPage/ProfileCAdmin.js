import React, { Component } from 'react';

class ProfileCAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: this.props.location.state.detail.mail,
    };
  }

  render() {
    return (
      <div>
          <table border="1">
            <tr><td>Email</td>
              <td>{this.state.mail}</td>
            </tr>
          </table>
      </div>
    );
  }

}

export default ProfileCAdmin;