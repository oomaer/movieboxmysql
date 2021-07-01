import React from 'react';
import {Link} from 'react-router-dom';
import './submenu.css';
import 'animate.css/animate.css';

const MovieSubMenu = ({radioBtns, setRadioBtns, closeMenu, admin}) => {
    
    const uncheckRadio = () => {
        if(document.getElementById('Movies').checked === true && radioBtns.movies === false){
            setRadioBtns({movies: true, tvshows: false, celebrities: false, awardevents: false});
        }
        else if(document.getElementById('Movies').checked === true && radioBtns.movies === true){
            setRadioBtns({movies: false, tvshows: false, celebrities: false, awardevents: false});
            document.getElementById('Movies').checked = false;
        }          
    }

    return(
        <div className = 'sub-menu'>
            {//we have to make a label to trigger our radio buttons
            }
             <input type= 'radio' id = 'Movies' name = 'sub-items-list' onClick = {uncheckRadio} className = 'sub-menu-radio'></input>
            <label for = 'Movies' className = 'radio-btn-lbl'>
            <div className = 'sub-menu-header'> 
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi sub-menu-svg" viewBox="0 0 16 16">
                <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/>
                </svg>
                <h2 className = 'sub-menu-title'>Movies</h2>
               
            </div>
            </label>
            <ul className = 'submenu-items-list animate__animated animate__fadeInDown animate__faster'>
                <li onClick = {closeMenu} className = 'submenu-list-item'><Link to = {`/filtermovies/releasedate`}>Browse Latest Movies</Link></li>
                <li onClick = {closeMenu} className = 'submenu-list-item'><Link to = {`/filtermovies/popularity`}>Most Popular Movies</Link></li>
                <li onClick = {closeMenu} className = 'submenu-list-item'><Link to = {`/filtermovies/rating`}>Browse Highest Rated Movies</Link></li>
                <li onClick = {closeMenu} className = 'submenu-list-item'><Link to = {`/filtermovies/boxoffice`}>Top Box Office</Link></li>
                <li onClick = {closeMenu} className = 'submenu-list-item'><Link to = {`/news/movie`}>Movie News</Link></li>            
                {admin ? (
                    <li onClick = {closeMenu} className = 'submenu-list-item'><Link to = {`/admin/addcontent`}>Add Movie</Link></li> 
                ):(null)}
                
            </ul>
        </div>
    )
}

export default MovieSubMenu;
