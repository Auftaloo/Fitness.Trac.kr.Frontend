import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import App from "./app";
import { BrowserRouter } from "react-router-dom";

const container = document.querySelector("#container");
const root = ReactDOM.createRoot(container);
root.render(
    <BrowserRouter>
    <React.Fragment>
        <App/>
    </React.Fragment>
    </BrowserRouter>
);