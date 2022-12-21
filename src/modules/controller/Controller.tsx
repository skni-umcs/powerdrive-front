import React from "react";
import Navbar from "../common/navbar/Navbar";
import {Outlet} from "react-router-dom";

const Controller = () => {
    return <React.Fragment>
        <Navbar />
        <div className="app__global__container">
            <Outlet />
        </div>
    </React.Fragment>
}

export default Controller;