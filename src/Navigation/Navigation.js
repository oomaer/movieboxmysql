import React from 'react';
import './navigation.css';
import MenuButton from './MenuButton';
import DropDownMenu from './DropDownMenu';
import SignInButton from './SignInButton';
import {Link} from 'react-router-dom';
import ProfileDetailsMenu from './ProfileDetailsMenu';
import NavSearchBar from './NavSearchBar';
const Navigation = ({user}) => {

    const closeMenu = () => {
      document.getElementById('dropdown-checkbox').checked = false;
    }
    return(
        <header className = 'nav-bar'>
        <div className = 'nav-content'>
            <div className = 'nav-justify-left'>
                <Link to = '/home'>
                <h1 className = 'logo' id = 'nav-logo'>Movie Box</h1>
                </Link>
                <input type = 'checkbox' id = 'dropdown-checkbox' className = 'menubtn-checkbox'></input>
                <label for = 'dropdown-checkbox' >
                <MenuButton className = 'menu-btn' />
                </label>
                <DropDownMenu className = 'drop-down-menu' closeMenu = {closeMenu} admin = {user.admin}/>
            </div>
            <div className = 'nav-justify-center'>
                <NavSearchBar />
            </div>
            <div className = 'nav-justify-right'>
                <div className = 'user-account-btns'>
                    {user.email !== '' ?
                    (
                        <ProfileDetailsMenu user = {user}/>
                    )
                    :(
                        <SignInButton />
                    )}
                    
                    
                </div>
            </div>
        </div>
        </header>
    )
}

export default Navigation