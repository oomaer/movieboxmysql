import React from 'react';
import {Link} from 'react-router-dom';
import './submenu.css';

const TVShowSubMenu = ({radioBtns, setRadioBtns, closeMenu, admin}) => {
   
    const uncheckRadio = () => {
        if(document.getElementById('TVShows').checked === true && radioBtns.tvshows === false){
            setRadioBtns({movies: false, tvshows: true, celebrities: false, awardevents: false});
        }
        else if(document.getElementById('TVShows').checked === true && radioBtns.tvshows === true){
            setRadioBtns({movies: false, tvshows: false, celebrities: false, awardevents: false});
            document.getElementById('TVShows').checked = false;
        }          
    }

    return(
        <div className = 'sub-menu'>
            <input type= 'radio' id = 'TVShows' name = 'sub-items-list' onClick = {uncheckRadio} className = 'sub-menu-radio'></input>
            <label for = 'TVShows' className = 'radio-btn-lbl'>
            <div className = 'sub-menu-header'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" fill="currentColor" class="bi bi-fill sub-menu-svg" viewBox="0 0 16 16">
                <path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM2 2h12s2 0 2 2v6s0 2-2 2H2s-2 0-2-2V4s0-2 2-2z"/>
                </svg>
                <h2 className =  'sub-menu-title'>TV Shows</h2>
            </div>
            </label>
            <ul className = 'submenu-items-list animate__animated animate__fadeInDown animate__faster'>
                <li onClick = {closeMenu} className = 'submenu-list-item'><Link to = {`/filtertvshows/releasedate`}>Browse Latest TV Shows</Link></li>
                <li onClick = {closeMenu} className = 'submenu-list-item'><Link to = {`/filtertvshows/popularity`}>Most Popular TV Shows</Link></li>
                <li onClick = {closeMenu} className = 'submenu-list-item'><Link to = {`/filtertvshows/rating`}>Browse Highest Rated</Link></li>
                <li onClick = {closeMenu} className = 'submenu-list-item'><Link to = {`/news/tvshow`}>TV News</Link></li> 
                {admin ? (
                    <li onClick = {closeMenu} className = 'submenu-list-item'><Link to = {`/admin/addcontent`}>Add TV Series</Link></li> 
                ):(null)}
            </ul>

        </div>
    )
}

export default TVShowSubMenu;
