import React from "react";
import './Botao.css'

export default props => 
    <button 
    onClick={e => props.click && props.click(props.label)}
    className={`
        botao
        ${props.op ? 'op': ''}
        ${props.double ? 'double': ''}
        ${props.triple ? 'triple': ''}
        ${props.ac ? 'ac': ''}
    `}>
        {props.label}
    </button>