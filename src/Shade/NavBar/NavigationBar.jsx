import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import GetAllWishListData from '../../Component/WishList/GetAllWishListData';

const NavigationBar = () => {
    const [navbarShadow, setNavbarShadow] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setNavbarShadow(true);
            } else {
                setNavbarShadow(false);
            }
        };
    }, []);

    return (
        <Navbar
            bg="light"
            expand="lg"
            fixed="top"
            className={`px-3 ${navbarShadow ? 'shadow-lg' : ''}`}
        >
            <Navbar.Brand as={Link} to="/">Azharul</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {/* Centering the nav items */}
                <Nav className="mx-auto" style={{ width: '100%', justifyContent: 'center' }}>
                    <Nav.Link
                        as={Link}
                        to="/"
                        active={location.pathname === '/'}
                    >
                        Home
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;
