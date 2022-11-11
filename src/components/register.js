import React, { useState } from "react";
import { registerUser } from "../api";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = ({ setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async () => {
        if (password.search(/[A-Z]/) === -1) {
            alert("Need an uppercase");
            return null;
        }
        if (password.length < 8) {
            alert("Password must have at least 8 characters")
            return null;
        }
        if (password !== confirmPassword) {
            console.log("Incorrect password!")
            alert("Passwords do not match.");
            return null;
        }

        const results = await registerUser(username, password);
        console.log("REGISTER JS", results);
        if (results.token) {
            console.log("Token successful!");
            setToken(results.token);
            window.localStorage.setItem("token", results.token);
            navigate("/");
        } else {
            alert("Username already exists!");
            console.log(results.error.message);
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
                required
                title="8 character minimum"
                label="Username"
                onChange={(event) => setUsername(event.target.value)}
            />

            <TextField
                type="password"
                required
                title="8 character minimum"
                label="Password"
                onChange={(event) => setPassword(event.target.value)}
            />

            <TextField
                type="password"
                required
                title="8 character minimum"
                label="Confirm Password"
                onChange={(event) => setConfirmPassword(event.target.value)}
            />

            <Button type="submit">Sign Up</Button>
            </div>
        </form>
    );
};

export default Register;