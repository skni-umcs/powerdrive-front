import React from 'react';
import {Breadcrumbs} from "@mui/material";
import {BreadcrumbsData} from "../../../../models/ui/BreadcrumbsData";
import {Link} from "react-router-dom";
import DriveHeader from "./components/DriveHeader";

interface DriveContentProps {
    breadcrumbs: BreadcrumbsData[],
    title: string,
}

const DriveContent = ({breadcrumbs, title}: DriveContentProps) => {
    return <div className="app__drive__content">
        <Breadcrumbs>
            {breadcrumbs.map((breadcrumb, idx) => (<Link
                color="inherit"
                key={idx}
                to={breadcrumb.url}
                className={"app__drive__content__breadcrumb"}
            >
                {breadcrumb.label}
            </Link>))}
        </Breadcrumbs>
        <DriveHeader title={title} />
    </div>
}

export default DriveContent;