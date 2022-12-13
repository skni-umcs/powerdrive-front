import React from "react";
import Navbar from "../common/navbar/Navbar";
import {Outlet} from "react-router-dom";

const Controller = () => {
    return <div>
        <Navbar />
        <Outlet />
    </div>
}

export default Controller;