import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
const CopyRight = ({ dashboard }) => {
    return <div className="absolute bottom-0 right-[50%]  z-[1] opacity-40 translate-x-[50%]">
        <Typography sx={{
            fontSize: dashboard ? '9px' : '12px',
            fontWeight: "thin",
            color: dashboard ? "#fff" : "#000"
        }}>    Copyright © 2023 Rightson Tole, All rights reserved.{dashboard && <span> https://rightson1.github.io/portfolio/</span>}</Typography>
    </div>
};

export default CopyRight;
