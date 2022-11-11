import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Navbar = ({ logout, token }) => {
    return (
        <header>
            <nav className="Navbar">
                <Link 
                    style={{ textDecoration : "none" }} 
                    to="/">
                        <Button>Home</Button>
                </Link>
                <Link 
                    style={{ textDecoration : "none" }} 
                    to="/activities">
                        <Button>Activities</Button>
                </Link>
                <Link 
                    style={{ textDecoration : "none" }} 
                    to="/routines">
                        <Button>Routines</Button>
                </Link>

            {token ? (
                <>
                <Link 
                    style={{ textDecoration : "none" }}
                    to="/my_routines">
                        <Button>My Routines</Button>
                </Link>
                <Link
                    style={{ textDecoration : "none" }}
                    to="/"
                    onClick={() =>logout()}>
                        <Button>Logout</Button>
                </Link>
                </>
            ) : (
                <Link 
                    style={{textDecoration : "none" }} 
                    to="/login">
                        <Button>Login</Button>
                </Link>
            )}
            </nav>
        </header>
    );
};

export default Navbar;