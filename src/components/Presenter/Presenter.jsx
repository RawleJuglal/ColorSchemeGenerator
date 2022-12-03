import React from 'react'
import './Presenter.css'

export default function Presenter(props){
    return(
        <div className='--presenter-presenter-container'>
            <div className="--presenter-presenter-swatch" style={{backgroundColor:props.info.hex.value}}>
                
            </div>
            <div className='--presenter-presenter-info'>
                <h3 className='--presenter-presenter-value'>{props.info.hex.value}</h3>
            </div>
        </div>
        
    )
}