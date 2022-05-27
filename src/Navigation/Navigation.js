import React, {useState} from "react";
import { 
    ExtendedContainer, 
    LeftContainer, 
    Logo, 
    MenuButton, 
    NavBarContainer, 
    NavBarLink, 
    LogOut,
    LogOutExtended, 
    NavBarLinkExtended,
    NavBarLinkContainer, 
    ReducedContainer, 
    RightContainer ,
} from "./Navigation.style";
import { useAuth } from '../Contexts/AuthContext';
import {useNavigate} from 'react-router-dom';
import LogoImage from "./logo-image.png";


const Navigation = () => {

    const [extendNavbar, setExtendNavbar] = useState(false);
    const [error, setError] = useState('');
    const { logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        setError('');
        try{
            await logout();
            navigate('/login');
        } catch {
            setError('Failed to Log Out');
        }
    }

    return(
        <div>
            <NavBarContainer extendNavbar={extendNavbar}>
                <ReducedContainer>
                    <LeftContainer>
                        <Logo src={LogoImage}></Logo>
                    </LeftContainer>
                    <RightContainer>
                        <NavBarLinkContainer>
                            <NavBarLink to={"/home"}> Home </NavBarLink>
                            <NavBarLink to={"/search-stocks"}> Search Stocks </NavBarLink>
                            <NavBarLink to={"/mystocks"}> My Stocks </NavBarLink>
                            <NavBarLink to={"/profile"}> Profile </NavBarLink>
                            <LogOut onClick={handleLogout}>Log Out</LogOut>
                            <MenuButton onClick={() => {
                                setExtendNavbar((current) => !current);
                            }} >
                                {extendNavbar ? <>&#10005;</> : <>&#8801;</> }  
                            </MenuButton>
                        </NavBarLinkContainer>
                    </RightContainer>
                </ReducedContainer>

                {
                    extendNavbar && (
                        <ExtendedContainer>
                            <NavBarLinkExtended to={"/home"} > Home </NavBarLinkExtended>
                            <NavBarLinkExtended to={"/search-stocks"} > Search Stocks </NavBarLinkExtended>
                            <NavBarLinkExtended to={"/mystocks"} > My Stocks </NavBarLinkExtended>
                            <NavBarLinkExtended to={"/profile"} > Profile </NavBarLinkExtended>
                            <LogOutExtended onClick={handleLogout}> Log Out </LogOutExtended>
                        </ExtendedContainer>
                    )
                }
            </NavBarContainer>
            {error && <div className='tc ma3 pa3 br2 cust-error'>{ error }</div>}
        </div>
    );
}

export default Navigation;