import { Box, Typography, useTheme } from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Title"
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useGlobalProvider } from "../../context/themeContext"
import { voters } from "../../src/data";
const Contacts = () => {
    const { colors } = useGlobalProvider()
    const columns = [
        { field: "AdmNo", headerName: "Admn No.", flex: 1 },
        {
            field: "Name",
            headerName: "Name",
            flex: 1,
            minWidth: 150,

        },
        {
            field: "email", headerName: "Email",
            flex: 2,
            cellClassName: "name-column--cell",
        },


        {
            field: "isCandidate",
            headerName: "isCandidate",

            renderCell: ({ row: { isCandidate } }) => {
                return (
                    <Box
                        width="100%"
                        m="0 auto"
                        display="flex"
                        justifyContent="center"
                        p="5px"
                        backgroundColor={
                            isCandidate === "super-admin" ? colors.greenAccent[600] : colors.greenAccent[200]
                        }
                        borderRadius="5px"
                    >

                        {isCandidate === "true" && <SecurityOutlinedIcon />}
                        {isCandidate === "false" && <LockOpenOutlinedIcon />}
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {isCandidate}
                        </Typography>
                    </Box>

                )
            }

        }



    ];

    return (
        <Box m={{
            xs: '20px 5px',
            sm: '20px 10px ',
            md: '20px'

        }}  >
            <Header title="VOTERS" subtitle="List Of Contact Voters" />
            <Box
                m="40px 0 0 0"
                height="100vh"
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
                <DataGrid checkboxSelection rows={voters} columns={columns} sx={{
                    '@media print': {
                        '.MuiDataGrid-main': { color: 'rgba(0, 0, 0, 0.87)' },
                    },
                }}
                    getRowId={(row) => row.AdmNo}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />

            </Box>
        </Box>
    );
};

export default Contacts;