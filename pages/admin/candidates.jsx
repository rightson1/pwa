import { Box, Typography, useTheme } from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Title"
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useGlobalProvider } from "../../context/themeContext"
import { candidates } from "../../src/data";
const Contacts = () => {
    const { colors } = useGlobalProvider()
    const columns = [
        { field: "id", headerName: "ADM NO.", flex: 0.5 },
        {
            field: "username",
            headerName: "Username",
            flex: 1,
            minWidth: 150,
            cellClassName: "name-column--cell",

        },
        {
            field: "email", headerName: "Email",
            flex: 2,
            cellClassName: "name-column--cell",
        }, {
            field: "bio",
            headerName: "Bio",
            flex: 1,

        }, {
            field: "position",
            headerName: "Position",
            flex: 1,
        },
        {
            field: "View",
            headerName: "View",

            renderCell: () => {
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
                            View
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
            <Header title="Candidates" subtitle="List Of Candidates" />
            <Box
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
                <DataGrid checkboxSelection rows={candidates} columns={columns} sx={{
                    '@media print': {
                        '.MuiDataGrid-main': { color: 'rgba(0, 0, 0, 0.87)' },
                    },
                }}
                    getRowId={(row) => row.id}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />

            </Box>
        </Box>
    );
};

export default Contacts;