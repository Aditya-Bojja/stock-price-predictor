import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavBarContainer = styled.nav`
    width: 100%;
    height: ${(props) => props.extendNavbar ? "100vh" : "65px"}; //cp1
    background-color: black;
    display: flex;
    flex-direction: column;

    @media (min-width: 700px){
        height: 65px; //cp2
    }
`;

export const ReducedContainer = styled.div`
    width: 100%;
    height: 65px; //cp3
    display: flex;
`;

export const LeftContainer = styled.div`
    display: flex;
    flex: 30%;
    justify-content: flex-start;
    /* align-items: center; */
    padding-left: 1%;
`;

export const RightContainer = styled.div`
    display: flex;
    flex: 70%;
    justify-content: flex-end;
    align-items: center;
    padding-right: 2%;
`;

export const NavBarLinkContainer = styled.div`
    display: flex;
`;

export const NavBarLink = styled(Link)`
    color: white;
    font-size: x-large;
    font-family: 'KoHo', Arial, Helvetica, sans-serif;
    text-decoration: none;
    margin: 10px;

    &:hover {
        color: #007bff;
    }

    @media (max-width: 700px) {
        display: none;
    }
`;

export const LogOut = styled.button`
    color: #dc3545;
    background-color: transparent;
    border: 2px solid #dc3545;
    font-size: 1.3em;
    font-weight: 400;
    padding: 0.2rem 0.9rem;
    border-radius: 0.25rem;

    &:hover {
        color: white;
        background-color: #dc3545;
    }
    
    @media (max-width: 700px) {
        display: none;
    }
`;

export const LogOutExtended = styled.button`
    color: #dc3545;
    background-color: transparent;
    border: 2px solid #dc3545;
    font-size: 1.3em;
    font-weight: 400;
    padding: 0.3rem 0.9rem;
    border-radius: 0.25rem;
    
    &:hover {
        color: white;
        background-color: #dc3545;
    }
`;

export const NavBarLinkExtended = styled(Link)`
    color: white;
    font-size: x-large;
    font-family: 'KoHo', Arial, Helvetica, sans-serif;
    text-decoration: none;
    margin: 10px;

    &:hover {
        color: #007bff;
    }
`;

export const Logo = styled.img`
    margin: 10px;
    max-width: 180px;
    height: auto;
`;

export const MenuButton = styled.button`
    width: 70px;
    height: 50px;
    background: none;
    border: none;
    color: white;
    font-size: 45px;
    cursor: pointer;

    @media (min-width: 700px) {
        display: none;
    }
`;

export const ExtendedContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 700px) {
        display: none;
    }
`;