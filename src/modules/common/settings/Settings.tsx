import React, { Component } from 'react'
import "../../../styles/settings.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const Settings = () =>{
    return (
        <div
            className='app__settings__main' 
        >
            <div className='app__set__header'>
                <div style={{
                    padding:"auto"
                }}>
                    <ArrowBackIcon style={{fontSize:"2rem", paddingRight:"0.75rem"}}/>   
                </div>
                Ustawienia
                
            </div>
            <div className='app__settings__account'>
                <div>
                    Ustawienia konta
                </div>
                <div>
                    Zmiana hasla
                </div>
            </div>
            <div>
                Ustawienia dysku
            </div>
            <div>
                Ustawienia Kalendarza
            </div>
            <div>
                Ustawienia Notatek
            </div>
        </div>
    )
}
export default Settings;