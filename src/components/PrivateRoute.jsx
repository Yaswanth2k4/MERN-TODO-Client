import React from "react";
import {Outlet,Navigate } from "react-router-dom";
import { isLoggedIn } from "../auth";

function PrivateRoute()
{
    if(isLoggedIn())
    {
        return <Outlet />
    }
    else
    {
        return <Navigate to={"/"} />
    }
}

export default PrivateRoute;