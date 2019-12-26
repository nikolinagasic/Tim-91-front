import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { UserContext, UserProvider } from "./UserProvider";

ReactDOM.render(
    <UserProvider>
        <UserContext.Consumer>
            {state => <App data={state} />}
        </UserContext.Consumer>
    </UserProvider>
    , document.getElementById('root'));
registerServiceWorker();
