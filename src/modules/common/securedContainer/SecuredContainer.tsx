import React, {useEffect} from "react";
import {PropsBase} from "../../../models/api/PropsBase";
import {useNavigate} from "react-router-dom";
import {bind} from "react-rxjs";
import {loggedUser$} from "../../../services/AuthService";
import {PathEnum} from "../../../enums/PathEnum";

const [useLoggedUsed] = bind(loggedUser$);

const SecuredContainer = ({children}: PropsBase) => {
    const navigate = useNavigate();
    const loggedUser = useLoggedUsed();
    useEffect(() => {
        if (!loggedUser) navigate(PathEnum.LOGIN);
    }, [])

    return {children}
}

export default SecuredContainer;