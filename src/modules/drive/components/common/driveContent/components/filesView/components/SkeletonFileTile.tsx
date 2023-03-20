import React from "react";
import { Skeleton } from "@mui/material";

const SkeletonFileTile = () => {
  return (
    <div className="app__drive__file__tile--skeleton">
      <div className="app__drive__file__tile__icon__container">
        <Skeleton
          animation="wave"
          variant="rectangular"
          sx={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="app__drive__file__tile__filename">
        <Skeleton animation="wave" variant="text" />
      </div>
    </div>
  );
};

export default SkeletonFileTile;
