import React from 'react';
import './ModalChange.css';

const ModalChange = (props) => {
    return (
        <div className="mainDiv-modalChange">
            <div className="modalPass-wrapper"
                style={{
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                <div className="modalPass-header">
                    <h3>{props.header}</h3>
                </div>
                <div className="modalPass-body">
                    {props.children}
                </div>
                <div className="modalPass-footer">
                    <button className="btnPass-continue" 
                        onClick={props.send}>
                            Пошаљи
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalChange;