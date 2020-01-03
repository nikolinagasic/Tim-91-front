import React from 'react';
import './ModalTerms.css';

const ModalTerms = (props) => {
    return (
        <div>
            <div className="modalTerm-wrapper">
                <div className="modalTerm-header">
                    <h3>{props.header}</h3>
                    <span className="close-modalTerm-btn" onClick={props.close}>×</span>
                </div>
                <div className="modalTerm-body">
                    {props.children}
                </div>
                <div className="modalTerm-footer">
                    <button className="btnTerm-continue" 
                        onClick={props.send}>Резервиши</button>
                    <button className="btnTerm-cancel" onClick={props.close}>Назад</button>
                </div>
            </div>
        </div>
    )
}

export default ModalTerms;