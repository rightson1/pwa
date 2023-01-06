import { Box, Typography, useTheme } from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "./Title"
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useGlobalProvider } from "../context/themeContext"
import { candidates } from "../src/data";
import { useCandidatesQuery } from "../util/useCandidate";
import { useAuth } from "../context/authContext";
import Link from "next/link";

const Candidates = ({ isDashboard }) => {
    const { data, isLoading } = useCandidatesQuery()
    const { admin } = useAuth()
    const { colors } = useGlobalProvider()
    const columns = [
        { field: "reg", headerName: "reg", flex: 2, minWidth: 100, hide: false },
        {
            field: "name",
            headerName: "Username",
            flex: 2,
            minWidth: 150,
            cellClassName: "name-column--cell",


        },
        {
            field: "positionName", headerName: "Position",
            flex: 2,
            cellClassName: "name-column--cell",
            minWidth: 150
        },
        {
            field: "View",
            headerName: "View",

            renderCell: ({ row: { positionId } }) => {
                return (
                    <Box
                        width="100%"
                        m="0 auto"
                        display="flex"
                        justifyContent="center"
                        p="5px"
                        backgroundColor={colors.redAccent[400]}
                        borderRadius="5px"
                    >

                        <LockOpenOutlinedIcon />
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            <Link href={`/${admin ? 'admin' : 'voter'}/p-candidates/${positionId}`}>
                                View
                            </Link>
                        </Typography>
                    </Box>

                )
            }

        }
    ];
    return <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
            "& .MuiDataGrid-root": {
                border: "none",
                minWidth: "100%"
            },
            "& .MuiDataGrid-cell": {
                borderBottom: "none",
            },
            "& .name-column--cell": {
                color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],

            },
            "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: ` ${colors.grey[100]} !important`,
            }
        }
        }
    >
        <DataGrid checkboxSelection rows={data || []}
            disableSelectionOnClick
            loading={isLoading}
            columns={columns} sx={{
                '@media print': {
                    '.MuiDataGrid-main': { color: 'rgba(0, 0, 0, 0.87)' },
                },
            }}
            getRowId={(row) => row.reg}
            components={{
                Toolbar: GridToolbar,
            }}
        />

    </Box>
};

export default Candidates;
