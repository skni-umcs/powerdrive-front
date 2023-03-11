import React from "react";
import DriveActions from "./DriveActions";

interface DriveHeaderProps {
    title: string
}

const DriveHeader = ({title}: DriveHeaderProps) => {
    return <div className="app__drive__content__header">
        <div className="app__drive__content__header__title">{title}</div>
        <DriveActions />

    </div>
}

export default DriveHeader;