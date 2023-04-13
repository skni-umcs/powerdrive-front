import React, { Component } from 'react'
import "../../../styles/settings.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { bind } from 'react-rxjs';
import { language$ } from 'services/LanguageService';

const [useLanguage] = bind(language$);

const Settings = () =>{

    const LANGUAGE = useLanguage();

    return (
        <div
            className='app__settings__main' 
        >
            <div className='app__settings__subsection app__set__header'>
                <div style={{
                    padding:"auto"
                }}>
                    <ArrowBackIcon style={{fontSize:"2rem", paddingRight:"0.75rem"}}/>   
                </div>
                {LANGUAGE.SETTINGS.SETTINGS}
                
            </div>

            <div className='app__settings__account__reset'>
                <div className='app__settings__subsection__half'>
                    {LANGUAGE.SETTINGS.ACCOUNT_SETTINGS}
                </div>
                <div className='app__settings__subsection__half'>
                    {LANGUAGE.SETTINGS.PASSWORD_RESET}
                </div>
            </div>

            <div className='app__settings__subsection'>
                {LANGUAGE.SETTINGS.DRIVE_SETTINGS}
            </div>

            <div className='app__settings__subsection'>
                {LANGUAGE.SETTINGS.CALENDAR_SETTINGS}
            </div>

            <div className='app__settings__subsection'>
                {LANGUAGE.SETTINGS.NOTES_SETTINGS}
            </div>
        </div>
    )
}
export default Settings;