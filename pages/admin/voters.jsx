import { Box, Typography, useTheme } from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Title"
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useGlobalProvider } from "../../context/themeContext"
import { voters } from "../../src/data";
import { useVotersQuery } from "../../util/useVoter";
import { useCandidatesQuery } from "../../util/useCandidate";

const Contacts = () => {
    const { data: voters, isLoading } = useVotersQuery()
    const { data: candidates, isLoading: isCandidateLoading } = useCandidatesQuery()

    const { colors } = useGlobalProvider()
    const columns = [
        { field: "reg", headerName: "Reg No.", flex: 1, minWidth: 150, },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
            minWidth: 150,

        },
        {
            field: "IsCandidate",
            headerName: "IsCandidate",

            renderCell: ({ row: { reg } }) => {
                const isCandidate = candidates?.find(candidate => candidate.reg === reg)
                return (
                    <Box
                        width="100%"
                        m="0 auto"
                        display="flex"
                        justifyContent="center"
                        p="5px"
                        backgroundColor={
                            isCandidate ? colors.primary[400] : colors.primary[200]
                        }
                        borderRadius="5px"
                    >

                        {isCandidate ? <SecurityOutlinedIcon /> : <LockOpenOutlinedIcon />}
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {isCandidate ? 'Yes' : 'No'}
                        </Typography>
                    </Box>

                )
            }

        },
        {
            field: "DELETE",
            headerName: "DELETE",

            renderCell: ({ row: { isCandidate } }) => {
                return (
                    <Box
                        width="100%"
                        m="0 auto"
                        display="flex"
                        justifyContent="center"
                        p="5px"
                        backgroundColor={colors.redAccent[600]}
                        borderRadius="5px"
                    >


                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            DELETE
                        </Typography>
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
            <Header title="VOTERS" subtitle="List Of Contact Voters" />
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
                <DataGrid checkboxSelection rows={voters || []} loading={isLoading} columns={columns} sx={{
                    '@media print': {
                        '.MuiDataGrid-main': { color: 'rgba(0, 0, 0, 0.87)' },
                    },
                }}
                    getRowId={(row) => row._id}
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