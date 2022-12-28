import React, { useState } from "react";
import { useGlobalProvider } from "../context/themeContext";
import { collection, doc, updateDoc, deleteDoc } from "firebase/firestore";
import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings";
import Modal from '@mui/material/Modal';;
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    Rating,
    TextField,
    IconButton,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Flex from "./Flex"
import axios from "axios";
import Info from "./Info"
import { db } from "../firebase";

const PositionCard = ({ _id, admin, desc, name }) => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [opened, setOpened] = React.useState(false);
    const [values, setValues] = useState(null)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const { colors, mode, dispatch, actionTypes, isMobile, baseUrl } = useGlobalProvider();

    const [isExpanded, setIsExpanded] = useState(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {
            xs: "90%",
            sm: '90%',
            md: '55%'
        },
        height: {
            xs: "40%",
        },
        bgcolor: colors.primary[400],
        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    };
    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })

    }

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        axios.put(`${baseUrl}/positions?id=${_id}`, values).then((res) => {
            const docRef = doc(db, "positions", _id)
            updateDoc(docRef, values).then((res) => {
                setMessage("Position Edited Successfully")
                setOpened(true)
                handleClose()
                setLoading(false)
                setValues('')
            }).catch(() => {
                setLoading(false)
                setMessage('There Was An Error')
                setOpen(true)
            })
        }).catch(() => {
            setLoading(false)
            setMessage('There Was An Error')
            setOpen(true)
        })

    }

    const handleDelete = (e) => {
        setLoading(true)
        e.preventDefault()
        axios.delete(`${baseUrl}/positions?id=${_id}`, values).then((res) => {
            const docRef = doc(db, "positions", _id)
            deleteDoc(docRef).then((res) => {
                setMessage("Position Edited Successfully")
                setOpened(true)
                handleClose()
                setLoading(false)
                setValues('')
            }).catch(() => {
                setLoading(false)
                setMessage('There Was An Error')
                setOpen(true)
            })
        }).catch(() => {
            setLoading(false)
            setMessage('There Was An Error')
            setOpen(true)
        })

    }
    return (

        <Card
            sx={{
                backgroundImage: "none",
                backgroundColor: colors.primary[400],
                borderRadius: ".55rem",

            }}
        >
            <CardContent
            >
                <Box display="flex" justifyContent="space-between" >
                    <Box>
                        <AdminPanelSettings sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />

                    </Box>
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{ color: colors.grey[100] }}
                        >
                            {admin}
                        </Typography>
                    </Box>
                </Box>
                <Box display="flex" justifyContent="start" mt={2}>

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{ color: colors.grey[100] }}
                    >
                        {name}
                    </Typography>
                </Box>


            </CardContent>
            <CardActions display="flex" sx={{
                flexDirection: "column",
                alignItems: "flex-start",
            }} >
                <Flex >
                    <Button
                        variant="primary"
                        size="small"
                        onClick={() => setIsExpanded(!isExpanded)}

                    >See More</Button>
                    <Button
                        variant="primary"
                        size="small"
                        onClick={handleOpen}
                    >Edit</Button>
                </Flex>
                <Collapse
                    in={isExpanded}
                    timeout="auto"
                    unmountOnExit
                    sx={{

                    }}
                >
                    <CardContent>

                        <Typography>Description :{desc}</Typography>

                    </CardContent>

                </Collapse>
            </CardActions>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <form onSubmit={handleSubmit}>
                    <Box sx={style} >
                        <TextField
                            fullWidth
                            variant="filled"
                            name="name"
                            type="text"

                            label="Edit Position Title"
                            sx={{
                                backgroundColor: colors.grey[800],
                            }}
                            onChange={handleChanges}
                        />
                        <textarea
                            type="text"
                            onChange={handleChanges}
                            name="desc"
                            style={{
                                backgroundColor: colors.grey[800],
                                gridColumn: 'span 4',

                            }} className="p-2  outline-none border-b-[1px] border-white" placeholder="Edit position description" />
                        <Box sx={{
                            alignSelf: "flex-end",
                            gap: "1rem",
                            display: "flex",

                        }} >
                            <Button
                                onClick={handleDelete}
                                sx={{
                                    backgroundColor: colors.redAccent[600] + " !important",
                                    color: colors.grey[100] + " !important",
                                    alignSelf: "flex-end",
                                    '&:hover': {
                                        backgroundColor: colors.greenAccent[800] + " !important",
                                    }
                                }}>{loading ? "loading..." : 'Delete Position'}</Button>
                            {loading ? <Button type="submit" sx={{
                                backgroundColor: colors.greenAccent[800] + " !important",
                                color: colors.grey[100] + " !important",
                            }}>Loading...</Button> : <Button type="submit" sx={{
                                backgroundColor: colors.greenAccent[600] + " !important",
                                color: colors.grey[100] + " !important",

                                '&:hover': {
                                    backgroundColor: colors.greenAccent[800] + " !important",
                                }

                            }}>Edit</Button>}
                        </Box>
                    </Box>
                </form>
            </Modal>
            <Info open={opened} setOpen={setOpened} message={message} />
        </Card>
    )
};

export default PositionCard;
