import React from 'react';
import './ModalChangePassword.css';

const modal = (props) => {
    return (
        <div>
            <div className="modalPass-wrapper"
                style={{
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                <div className="modalPass-header">
                    <h3>{props.header}</h3>
                </div>
                <div className="modalPass-body">
                    <form>
                        <p>Унесите нову вредност лозинке:</p>
                        <input type="password" 
                        className="input_field"
                        id="firstPassword_input1"></input>
                        <p>Унесите лозинку поново:</p>
                        <input type="password" 
                            className="input_field"
                            id="firstPassword_input2"></input>
                    </form>
                </div>
                <div className="modalPass-footer">
                    <button className="btnPass-continue" onClick={props.send}>Пошаљи</button>
                </div>
            </div>
        </div>
    )
}

export default modal;