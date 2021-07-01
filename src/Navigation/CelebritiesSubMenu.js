import React from 'react';
import {Link} from 'react-router-dom';
import './submenu.css';

const CelebritiesSubMenu = ({radioBtns, setRadioBtns, closeMenu, admin}) => {

    const uncheckRadio = () => {
        if(document.getElementById('Celebrities').checked === true && radioBtns.celebrities === false){
            setRadioBtns({movies: false, tvshows: false, celebrities: true, awardevents: false});
        }
        else if(document.getElementById('Celebrities').checked === true && radioBtns.celebrities === true){
            setRadioBtns({movies: false, tvshows: false, celebrities: false, awardevents: false});
            document.getElementById('Celebrities').checked = false;
        }          
    }          
    
    return(
        <div className = 'sub-menu'>
             <input type = 'radio' id = 'Celebrities' name = 'sub-items-list' onClick = {uncheckRadio} className = 'sub-menu-radio'></input>
            <label for = 'Celebrities' className = 'radio-btn-lbl'>
            <div className = 'sub-menu-header'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-fill sub-menu-svg" viewBox="0 0 16 16">
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                </svg>
                <h2 className = 'sub-menu-title'>Celebrities</h2>
            </div>
            </label>
            <ul className = 'submenu-items-list animate__animated animate__fadeInDown animate__faster'>
                <li onClick = {closeMenu} className = 'submenu-list-item'><Link to = {`/filtercelebrities/born`}>Born Today</Link></li>
                <li onClick = {closeMenu} className = 'submenu-list-item'><Link to = {`/filtercelebrities/popularity`}>Most Popular Celebrities</Link></li>
                {admin ? (
                    <li onClick = {closeMenu} className = 'submenu-list-item'><Link to = {`/admin/addcelebrity`}>Add Celebrity</Link></li> 
                ):(null)}
            </ul>

        </div>
    )
}

export default CelebritiesSubMenu;
