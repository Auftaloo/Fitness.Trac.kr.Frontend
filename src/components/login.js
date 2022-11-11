import React, { useState } from "react";
import { loginUser } from "../api";
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import "./register";

const Login = ({ setToken, navigate }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async () => {
        const results = await loginUser(username, password);
        console.log(results);
        if (results.token) {
            setToken(results.token);
            window.localStorage.setItem("token", results.token);
            navigate("/");
        } else {
            alert("Incorrect username and/or password.");
            console.log("Error occurred", results);
        }
    };

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
            }}>
                <div className="loginTemplate">
                    <TextField
                        type="text"
                        label="Enter Username"
                        onChange={(event) => setUsername(event.target.value)}
                    />

                    <TextField
                        type="password"
                        label="Enter Password"
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <Button type="submit">Login</Button>

                    <Link 
                        style={{ textDecoration : "none" }}
                        to="/register">Register</Link>
                </div>
            </form>
    );
};

export default Login;