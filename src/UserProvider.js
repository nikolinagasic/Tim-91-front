import React, { Component, Context } from 'react'
import { render } from 'react-dom';

export const UserContext = React.createContext();

export class UserProvider extends Component {
    state = {
        token: null,
        user: {}
    }

    render(){
        return(
            <UserContext.Provider value={{ 
                ... this.state
            }}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}