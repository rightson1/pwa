import { Box, Typography, useTheme } from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Title"
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useGlobalProvider } from "../../context/themeContext"
// import { admins } from "../../src/data";
import { useAdminQuery } from "../../util/useAdmin";
import { useMemo } from "react";
const Contacts = () => {
    const { colors } = useGlobalProvider()
    const { data, isLoading } = useAdminQuery();
    const admins = useMemo(() => {
        if (!data) return;
        const admins = data.map(({ id, admin }) => ({ id, ...admin }))
        return admins
    }, [data])


    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        {
            field: "email", headerName: "Email",
            flex: 2,
            cellClassName: "name-column--cell",
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            minWidth: 150,

        },

        {
            field: "role",
            headerName: "Role",

            renderCell: ({ row: { role } }) => {
                return (
                    <Box
                        width="100%"
                        m="0 auto"
                        display="flex"
                        justifyContent="center"
                        p="5px"
                        color={colors.grey[800]}
                        backgroundColor={
                            role === "s.admin" ? colors.greenAccent[600] : colors.greenAccent[200]
                        }
                        borderRadius="5px"
                    >
                        {role === "admin" && <AdminPanelSettingsOutlinedIcon />
                        }

                        <Typography color={colors.grey[800]} sx={{ ml: "5px" }}>
                            {role}
                        </Typography>
                    </Box>

                )
            }

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
            <Header title="ADMINISTORS" subtitle="List Of Adminstrators" />
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
                <DataGrid checkboxSelection columns={columns}
                    loading={isLoading || !admins}
                    getRowId={(row) => row.id}
                    sx={{
                        '@media print': {
                            '.MuiDataGrid-main': { color: 'rgba(0, 0, 0, 0.87)' },
                        },
                    }}
                    rows={admins || []}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />

            </Box>
        </Box>
    );
};
Contacts.getLayout = (page) => {
    return <>
        {page}
    </>
}
Contacts.admin = true


export default Contacts;