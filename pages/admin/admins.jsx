import { Box, Typography, useTheme } from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Title"
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useGlobalProvider } from "../../context/themeContext"
import { useAdminDelete, useAdminQuery } from "../../util/useAdmin";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useMemo } from "react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import Info from "../../components/Info"
const Contacts = () => {
    const { colors } = useGlobalProvider()
    const { admin } = useAuth()
    const { data, isLoading } = useAdminQuery();
    const { mutate, isLoading: loading, isError, isSuccess, error } = useAdminDelete()
    const [wait, setWait] = useState(false)
    const [message, setMessage] = React.useState("");
    const [id, setId] = useState(null)
    const [opened, setOpened] = React.useState(false);
    const handleDelete = (id) => {
        const confirm = window.confirm('Are you sure you want to delete voter')
        if (!confirm) {
            console.log(confirm)
            return
        } else if (admin.role == "admin") {
            setOpened(true)
            setMessage("You can't delete admin, only super admin can delete admin");
            console.log(admin)
            return

        }
        else {
            setWait(true)
            setId(id)

            updateDoc(doc(db, "admins", id), { isDeleted: true }).then(() => {
                mutate(id)

            }).catch((error) => {
                console.log(error)
                setWait(false)
            })
        }

    }
    useEffect(() => {

        if (isSuccess) {
            setMessage('success🥂')
            setOpened(true)
            setWait(false)

        }
        if (isError) {
            setMessage('Error😢')
            setOpened(true)
        }
    }, [isSuccess, isError])

    const columns = [
        { field: "_id", headerName: "ID", flex: 2, minWidth: 150, },
        {
            field: "email", headerName: "Email",
            flex: 2,
            cellClassName: "name-column--cell",
            minWidth: 200,
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
            field: "DELETE",
            headerName: "DELETE",

            renderCell: ({ row: { _id } }) => {


                return (
                    <Box
                        width="100%"
                        m="0 auto"
                        display="flex"
                        justifyContent="center"
                        p="5px"
                        backgroundColor={colors.redAccent[600]}
                        borderRadius="5px"
                        sx={{
                            cursor: 'pointer'
                        }}
                    >


                        <Box color={colors.grey[100]} sx={{ ml: "5px" }} onClick={() => handleDelete(_id)}>
                            {((wait || loading) && (id === _id)) ? 'Loading' : 'Delete'}
                        </Box>
                    </Box>

                )
            }

        },


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
                    loading={isLoading || !data}
                    disableSelectionOnClick
                    getRowId={(row) => row._id}
                    sx={{
                        '@media print': {
                            '.MuiDataGrid-main': { color: 'rgba(0, 0, 0, 0.87)' },
                        },
                    }}
                    rows={data || []}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />

            </Box>
            <Info setOpen={setOpened} message={message} open={opened} />
        </Box>
    );
};
Contacts.getLayout = (page) => {
    return <>
        {page}
    </>
}
Contacts.admin = true
Contacts.head = "Admins"


export default Contacts;