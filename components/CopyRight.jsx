import React from "react";
import Box from "@mui/material/Box";
import { useGlobalProvider } from "../context/themeContext"
import { Typography } from "@mui/material";
const CopyRight = ({ dashboard }) => {
    const { colors, isMobile } = useGlobalProvider()
    return <div className="absolute bottom-0 right-[50%]  z-[1] opacity-40 translate-x-[50%]">
        {dashboard ? <Typography sx={{
            fontSize: dashboard ? '9px' : '12px',
            fontWeight: "thin",
            color: dashboard ? "#fff" : "#000"
        }}>   {!isMobile && <> Copyright © 2023 Rightson Tole, All rights reserved. </>} https://rightson1.github.io/portfolio </Typography>
            :
            <Typography sx={{
                fontSize: dashboard ? '9px' : '12px',
                fontWeight: "thin",
                color: dashboard ? "#fff" : "#000"
            }}>    Copyright © 2023 Rightson Tole, All rights reserved</Typography>

        }
    </div>
};

export default CopyRight;
