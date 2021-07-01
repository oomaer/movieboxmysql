import React from 'react';
import {Link} from 'react-router-dom';
import './submenu.css';

const AESubMenu = ({radioBtns, setRadioBtns, closeMenu, admin}) => {

    const uncheckRadio = () => {
        if(document.getElementById('AwardsEvents').checked === true && radioBtns.awardevents === false){
            setRadioBtns({movies: false, tvshows: false, celebrities: false, awardevents: true});
        }
        else if(document.getElementById('AwardsEvents').checked === true && radioBtns.awardevents === true){
            setRadioBtns({movies: false, tvshows: false, celebrities: false, awardevents: false});
            document.getElementById('AwardsEvents').checked = false;
        }          
    }

    return(
        <div className = 'sub-menu'>
           <input type= 'radio' id = 'AwardsEvents' name = 'sub-items-list' onClick = {uncheckRadio} className = 'sub-menu-radio'></input>
           <label for = 'AwardsEvents' className = 'radio-btn-lbl'>
           <div className = 'sub-menu-header'>
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-fill sub-menu-svg" viewBox="0 0 16 16">
                <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z"/>
                <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
                </svg>
                <h2 className =  'sub-menu-title'>Awards/Events and News</h2>
           </div> 
           </label>
            <ul className = 'submenu-items-list animate__animated animate__fadeInDown animate__faster'>
                <li onClick = {closeMenu} className = 'submenu-list-item'><Link to = {`/news/popular`}>Browse Popular News</Link></li>
                <li onClick = {closeMenu} className = 'submenu-list-item'><Link to = {`/awardsevents/latest`}>Browse Latest Awards</Link></li>
                <li onClick = {closeMenu} className = 'submenu-list-item'><Link to = {`/news/latest`}>Browse Latest News</Link></li> 
                {admin ? (
                    <li onClick = {closeMenu} className = 'submenu-list-item'><Link to = {`/admin/addawardevent`}>Add Awards/Events</Link></li>
                ):(null)}
                {admin ? (
                   <li onClick = {closeMenu} className = 'submenu-list-item'><Link to = {`/admin/addnews`}>Add News</Link></li>
                ):(null)}

            </ul>

        </div>
    )
}

export default AESubMenu;
