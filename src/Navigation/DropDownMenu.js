import React, {useRef, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './dropdownmenu.css';
import MovieSubMenu from './MovieSubMenu';
import CloseButton from './CloseButton';
import CelebritiesSubMenu from './CelebritiesSubMenu'
import AESubMenu from './AESubMenu';
import TVShowSubMenu from './TVShowSubMenu';

/**
 * Hook that alerts clicks outside of the passed ref
 */
 function useOutsideAlerter(ref, closeMenu) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                closeMenu();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref]);
}

const DropDownMenu = ({closeMenu, admin}) => {
    //we will make a radio button for each submenu and assign a common radio group to them. For mobile display 
    //there is only one submenu displayed at a time, radio btns will be used for that. We will use state to check uncheck radio
    //buttons on mouse click
    const [radioBtns, setRadioBtns] = useState({movies: false, tvshows: false, celebrities: false, awardevents: false})
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, closeMenu);
    return(
        <div className = 'drop-down-menu' ref = {wrapperRef}>
            <div className = 'logo-closebtn'>
                <Link to = '/home'><h1 onClick = {closeMenu} className = 'dropdown-logo logo'>Movie Box</h1></Link> 
                <CloseButton closeMenu = {closeMenu} /> 
            </div>

           <div className = 'sub-menus'>
            <MovieSubMenu radioBtns = {radioBtns} setRadioBtns = {setRadioBtns} closeMenu = {closeMenu} admin = {admin}/>
            <TVShowSubMenu radioBtns = {radioBtns} setRadioBtns = {setRadioBtns} closeMenu = {closeMenu} admin = {admin}/>
            <AESubMenu radioBtns = {radioBtns} setRadioBtns = {setRadioBtns} closeMenu = {closeMenu} admin = {admin}/>
            <CelebritiesSubMenu radioBtns = {radioBtns} setRadioBtns = {setRadioBtns} closeMenu = {closeMenu} admin = {admin}/>
            </div>

        </div>
    )
}
export default DropDownMenu;